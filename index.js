import {
  Client,
  GatewayIntentBits,
  SlashCommandBuilder,
  REST,
  Routes,
  PermissionsBitField,
  ActivityType,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder
} from "discord.js";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

/* ================= CONFIG ================= */
const TOKEN       = process.env.TOKEN;
const CLIENT_ID   = process.env.CLIENT_ID;
const GUILD_ID    = process.env.GUILD_ID;
const ADMIN_ROLE_ID   = process.env.ADMIN_ROLE_ID   || "123456789012345678";
const OWNER_USER_ID   = process.env.OWNER_USER_ID   || "1444578804189102221"; // <-- Điền ID của bạn vào đây hoặc .env

const WARN_FILE      = "./warns.json";
const ALLOWED_FILE   = "./allowed_guilds.json";

/* ================= CLIENT ================= */
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.DirectMessages
  ],
  partials: ["CHANNEL"] // Cần thiết để nhận DM
});

/* ================= FILE I/O ================= */
const loadJSON = (file) => {
  if (!fs.existsSync(file)) fs.writeFileSync(file, "{}");
  try {
    return JSON.parse(fs.readFileSync(file, "utf-8"));
  } catch {
    return {};
  }
};

const saveJSON = (file, data) =>
  fs.writeFileSync(file, JSON.stringify(data, null, 2));

/* ================= HELPER: SAFE REPLY ================= */
const safeReply = async (interaction, options) => {
  try {
    if (interaction.replied || interaction.deferred) {
      return await interaction.editReply(options);
    }
    return await interaction.reply(options);
  } catch (err) {
    console.error("safeReply error:", err.message);
  }
};

/* ================= 2FA ANTI-RAID: guildCreate ================= */
client.on("guildCreate", async (guild) => {
  const allowedGuilds = loadJSON(ALLOWED_FILE);

  // Nếu guild đã được duyệt → bình thường
  if (allowedGuilds[guild.id]) {
    console.log(`[ANTI-RAID] Guild đã được duyệt: ${guild.name} (${guild.id})`);
    return;
  }

  console.log(`[ANTI-RAID] Bot được thêm vào guild mới: ${guild.name} (${guild.id})`);

  // Lấy người thêm bot (audit log)
  let invitedBy = "Không rõ";
  try {
    const auditLogs = await guild.fetchAuditLogs({ type: 28, limit: 1 }); // BOT_ADD = 28
    const entry = auditLogs.entries.first();
    if (entry && entry.target?.id === CLIENT_ID) {
      invitedBy = `${entry.executor.tag} (${entry.executor.id})`;
    }
  } catch {
    console.warn("[ANTI-RAID] Không lấy được audit log.");
  }

  // Tạo embed thông báo
  const embed = new EmbedBuilder()
    .setColor(0xFF6600)
    .setTitle("⚠️ Bot được mời vào Server Mới!")
    .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 256 }))
    .addFields(
      { name: "🤖 Tên Bot",   value: `${client.user.tag}`,   inline: true },
      { name: "🆔 ID Bot",    value: `${client.user.id}`,    inline: true },
      { name: "\u200B",       value: "\u200B",               inline: false },
      { name: "🏠 Server",    value: `${guild.name}`,        inline: true },
      { name: "🆔 Server ID", value: `${guild.id}`,          inline: true },
      { name: "👥 Thành viên",value: `${guild.memberCount}`, inline: true },
      { name: "📨 Thêm bởi",  value: invitedBy,              inline: false }
    )
    .setFooter({ text: "Chọn bên dưới để duyệt hoặc từ chối." })
    .setTimestamp();

  // Tạo 2 button
  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId(`approve_${guild.id}`)
      .setLabel("✅ Đồng Ý")
      .setStyle(ButtonStyle.Success),
    new ButtonBuilder()
      .setCustomId(`reject_${guild.id}`)
      .setLabel("❌ Không")
      .setStyle(ButtonStyle.Danger)
  );

  // Gửi DM cho owner
  try {
    const owner = await client.users.fetch(OWNER_USER_ID);
    await owner.send({ embeds: [embed], components: [row] });
    console.log(`[ANTI-RAID] Đã gửi DM yêu cầu duyệt tới owner.`);
  } catch (err) {
    console.error("[ANTI-RAID] Không thể gửi DM cho owner:", err.message);
    // Nếu không gửi được DM → kick khỏi server cho an toàn
    await safeLeaveGuild(guild, "Không thể liên hệ owner để xác minh.");
    return;
  }

  // Đặt timeout 5 phút - nếu không phản hồi thì tự rời
  const timeout = setTimeout(async () => {
    const allowed = loadJSON(ALLOWED_FILE);
    if (!allowed[guild.id]) {
      console.log(`[ANTI-RAID] Timeout - Tự rời guild: ${guild.name}`);
      await safeLeaveGuild(guild, "Không có phản hồi sau 5 phút.");
    }
  }, 5 * 60 * 1000);

  // Lưu timeout reference để hủy nếu cần (dùng biến global tạm)
  pendingGuilds.set(guild.id, timeout);
});

// Map lưu timeout đang chờ
const pendingGuilds = new Map();

/* ================= HELPER: LEAVE GUILD ================= */
const safeLeaveGuild = async (guild, reason = "") => {
  try {
    await guild.leave();
    console.log(`[ANTI-RAID] Đã rời guild: ${guild.name}. Lý do: ${reason}`);
  } catch (err) {
    console.error(`[ANTI-RAID] Không thể rời guild ${guild.name}:`, err.message);
  }
};

/* ================= INTERACTION HANDLER (Button + Commands) ================= */
client.on("interactionCreate", async (interaction) => {

  /* ---------- BUTTON INTERACTIONS ---------- */
  if (interaction.isButton()) {
    const [action, guildId] = interaction.customId.split("_");

    // Chỉ owner mới được bấm
    if (interaction.user.id !== OWNER_USER_ID) {
      return interaction.reply({ content: "❌ Bạn không có quyền thực hiện hành động này!", ephemeral: true });
    }

    const allowedGuilds = loadJSON(ALLOWED_FILE);

    if (action === "approve") {
      allowedGuilds[guildId] = { approvedAt: Date.now() };
      saveJSON(ALLOWED_FILE, allowedGuilds);

      // Hủy timeout
      if (pendingGuilds.has(guildId)) {
        clearTimeout(pendingGuilds.get(guildId));
        pendingGuilds.delete(guildId);
      }

      const guild = client.guilds.cache.get(guildId);
      const guildName = guild ? guild.name : `ID: ${guildId}`;

      await interaction.update({
        embeds: [
          new EmbedBuilder()
            .setColor(0x00FF00)
            .setTitle("✅ Đã Duyệt!")
            .setDescription(`Bot được phép hoạt động tại **${guildName}**.`)
            .setTimestamp()
        ],
        components: []
      });
      console.log(`[ANTI-RAID] Owner đã DUYỆT guild: ${guildName} (${guildId})`);

    } else if (action === "reject") {
      const guild = client.guilds.cache.get(guildId);
      const guildName = guild ? guild.name : `ID: ${guildId}`;

      // Hủy timeout
      if (pendingGuilds.has(guildId)) {
        clearTimeout(pendingGuilds.get(guildId));
        pendingGuilds.delete(guildId);
      }

      await interaction.update({
        embeds: [
          new EmbedBuilder()
            .setColor(0xFF0000)
            .setTitle("❌ Đã Từ Chối!")
            .setDescription(`Bot đã rời khỏi **${guildName}**.`)
            .setTimestamp()
        ],
        components: []
      });

      if (guild) await safeLeaveGuild(guild, "Owner từ chối.");
      console.log(`[ANTI-RAID] Owner đã TỪ CHỐI guild: ${guildName} (${guildId})`);
    }

    return;
  }

  /* ---------- SLASH COMMANDS ---------- */
  if (!interaction.isChatInputCommand()) return;

  const commandName = interaction.commandName;
  const { user, member, channel, guild } = interaction;

  try {
    /* ===== MODERATION ===== */
    if (commandName === "kick") {
      if (!member.permissions.has(PermissionsBitField.Flags.KickMembers))
        return safeReply(interaction, { content: "❌ Bạn không có quyền kick!", ephemeral: true });

      const targetMember = interaction.options.getMember("user");
      const reason = interaction.options.getString("reason") || "Không có lý do";

      if (!targetMember?.kickable)
        return safeReply(interaction, { content: "❌ Không thể kick người này!", ephemeral: true });

      await targetMember.kick(reason);
      await safeReply(interaction, { content: `✅ Đã kick **${targetMember.user.tag}**\nLý do: ${reason}` });
    }

    else if (commandName === "ban") {
      if (!member.permissions.has(PermissionsBitField.Flags.BanMembers))
        return safeReply(interaction, { content: "❌ Bạn không có quyền ban!", ephemeral: true });

      const targetMember = interaction.options.getMember("user");
      const reason = interaction.options.getString("reason") || "Không có lý do";

      if (!targetMember?.bannable)
        return safeReply(interaction, { content: "❌ Không thể ban người này!", ephemeral: true });

      await targetMember.ban({ reason });
      await safeReply(interaction, { content: `✅ Đã ban **${targetMember.user.tag}**\nLý do: ${reason}` });
    }

    else if (commandName === "unban") {
      if (!member.permissions.has(PermissionsBitField.Flags.BanMembers))
        return safeReply(interaction, { content: "❌ Bạn không có quyền unban!", ephemeral: true });

      const userId = interaction.options.getString("userid");
      try {
        await guild.members.unban(userId);
        await safeReply(interaction, { content: `✅ Đã gỡ ban cho user ID: \`${userId}\`` });
      } catch {
        await safeReply(interaction, { content: "❌ Không tìm thấy user trong danh sách ban!", ephemeral: true });
      }
    }

    else if (commandName === "mute") {
      if (!member.permissions.has(PermissionsBitField.Flags.ModerateMembers))
        return safeReply(interaction, { content: "❌ Bạn không có quyền mute!", ephemeral: true });

      const targetMember = interaction.options.getMember("user");
      const duration = interaction.options.getInteger("duration");
      const reason = interaction.options.getString("reason") || "Không có lý do";

      if (!targetMember?.moderatable)
        return safeReply(interaction, { content: "❌ Không thể mute người này!", ephemeral: true });

      await targetMember.timeout(duration * 60 * 1000, reason);
      await safeReply(interaction, { content: `✅ Đã mute **${targetMember.user.tag}** trong ${duration} phút\nLý do: ${reason}` });
    }

    else if (commandName === "unmute") {
      if (!member.permissions.has(PermissionsBitField.Flags.ModerateMembers))
        return safeReply(interaction, { content: "❌ Bạn không có quyền unmute!", ephemeral: true });

      const targetMember = interaction.options.getMember("user");
      if (!targetMember?.moderatable)
        return safeReply(interaction, { content: "❌ Không thể unmute người này!", ephemeral: true });

      await targetMember.timeout(null);
      await safeReply(interaction, { content: `✅ Đã gỡ mute cho **${targetMember.user.tag}**` });
    }

    else if (commandName === "warn") {
      if (!member.permissions.has(PermissionsBitField.Flags.ModerateMembers))
        return safeReply(interaction, { content: "❌ Bạn không có quyền cảnh cáo!", ephemeral: true });

      const targetUser = interaction.options.getUser("user");
      const reason = interaction.options.getString("reason");
      const warns = loadJSON(WARN_FILE);

      if (!warns[targetUser.id]) warns[targetUser.id] = [];
      warns[targetUser.id].push({ reason, moderator: user.tag, timestamp: Date.now() });
      saveJSON(WARN_FILE, warns);

      await safeReply(interaction, {
        content: `⚠️ Đã cảnh cáo **${targetUser.tag}**\nLý do: ${reason}\nTổng warns: **${warns[targetUser.id].length}**`
      });
    }

    else if (commandName === "warnings") {
      const targetUser = interaction.options.getUser("user");
      const warns = loadJSON(WARN_FILE);
      const userWarns = warns[targetUser.id];

      if (!userWarns?.length)
        return safeReply(interaction, { content: `✅ **${targetUser.tag}** chưa có cảnh cáo nào!`, ephemeral: true });

      const warnList = userWarns.map((w, i) => {
        const date = new Date(w.timestamp).toLocaleString("vi-VN");
        return `**${i + 1}.** ${w.reason}\n   Bởi: ${w.moderator} — ${date}`;
      }).join("\n\n");

      const embed = new EmbedBuilder()
        .setColor(0xFFFF00)
        .setTitle(`⚠️ Cảnh cáo của ${targetUser.tag}`)
        .setDescription(warnList)
        .setFooter({ text: `Tổng: ${userWarns.length} warns` });

      await safeReply(interaction, { embeds: [embed] });
    }

    else if (commandName === "clearwarns") {
      if (!member.permissions.has(PermissionsBitField.Flags.Administrator))
        return safeReply(interaction, { content: "❌ Bạn không có quyền xóa warns!", ephemeral: true });

      const targetUser = interaction.options.getUser("user");
      const warns = loadJSON(WARN_FILE);
      delete warns[targetUser.id];
      saveJSON(WARN_FILE, warns);

      await safeReply(interaction, { content: `✅ Đã xóa tất cả cảnh cáo của **${targetUser.tag}**` });
    }

    else if (commandName === "clear") {
      if (!member.permissions.has(PermissionsBitField.Flags.ManageMessages))
        return safeReply(interaction, { content: "❌ Bạn không có quyền xóa tin nhắn!", ephemeral: true });

      const amount = interaction.options.getInteger("amount");
      try {
        const messages = await channel.bulkDelete(amount, true);
        await safeReply(interaction, { content: `✅ Đã xóa **${messages.size}** tin nhắn!`, ephemeral: true });
      } catch {
        await safeReply(interaction, { content: "❌ Không thể xóa tin nhắn (tin quá cũ hoặc lỗi hệ thống)!", ephemeral: true });
      }
    }

    /* ===== FUN ===== */
    else if (commandName === "avatar") {
      const targetUser = interaction.options.getUser("user") || user;
      const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(`🖼️ Avatar của ${targetUser.tag}`)
        .setImage(targetUser.displayAvatarURL({ dynamic: true, size: 1024 }));
      await safeReply(interaction, { embeds: [embed] });
    }

    else if (commandName === "serverinfo") {
      const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(`🏠 ${guild.name}`)
        .setThumbnail(guild.iconURL({ dynamic: true }))
        .addFields(
          { name: "👑 Owner",       value: `<@${guild.ownerId}>`,    inline: true },
          { name: "👥 Thành viên",  value: `${guild.memberCount}`,   inline: true },
          { name: "📅 Ngày tạo",    value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:R>`, inline: true },
          { name: "✨ Boost Level", value: `${guild.premiumTier}`,   inline: true },
          { name: "💎 Số Boost",    value: `${guild.premiumSubscriptionCount || 0}`, inline: true },
          { name: "🎭 Roles",       value: `${guild.roles.cache.size}`, inline: true }
        )
        .setFooter({ text: `Server ID: ${guild.id}` })
        .setTimestamp();
      await safeReply(interaction, { embeds: [embed] });
    }

    else if (commandName === "userinfo") {
      const targetUser = interaction.options.getUser("user") || user;
      const targetMember = await guild.members.fetch(targetUser.id).catch(() => null);

      if (!targetMember)
        return safeReply(interaction, { content: "❌ Không tìm thấy thành viên này!", ephemeral: true });

      const roles = targetMember.roles.cache
        .filter(r => r.id !== guild.id)
        .sort((a, b) => b.position - a.position)
        .map(r => `<@&${r.id}>`);

      let rolesDisplay = roles.join(", ") || "Không có role";
      if (rolesDisplay.length > 1024)
        rolesDisplay = roles.slice(0, 5).join(", ") + ` và ${roles.length - 5} role khác...`;

      const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(`👤 ${targetUser.tag}`)
        .setThumbnail(targetUser.displayAvatarURL({ dynamic: true }))
        .addFields(
          { name: "🆔 ID",            value: targetUser.id,           inline: true },
          { name: "📛 Nickname",       value: targetMember.nickname || "Không có", inline: true },
          { name: "🤖 Bot",            value: targetUser.bot ? "Có" : "Không", inline: true },
          { name: "📅 Tạo lúc",        value: `<t:${Math.floor(targetUser.createdTimestamp / 1000)}:R>`, inline: true },
          { name: "📥 Vào server",     value: `<t:${Math.floor(targetMember.joinedTimestamp / 1000)}:R>`, inline: true },
          { name: "🎭 Roles",          value: rolesDisplay, inline: false }
        )
        .setFooter({ text: `User ID: ${targetUser.id}` })
        .setTimestamp();

      await safeReply(interaction, { embeds: [embed] });
    }

    else if (commandName === "8ball") {
      const question = interaction.options.getString("question");
      const responses = [
        "✅ Chắc chắn rồi!",  "✅ Không có nghi ngờ gì!",
        "🟡 Có thể lắm!",     "🟡 Có vẻ tốt đấy!",
        "🟡 Hỏi lại sau nhé!","❌ Không chắc lắm...",
        "❌ Đừng mơ!",        "❌ Không đời nào!",
        "❌ Câu trả lời là KHÔNG!", "❌ Triển vọng không tốt..."
      ];
      const answer = responses[Math.floor(Math.random() * responses.length)];
      const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle("🎱 Magic 8-Ball")
        .addFields(
          { name: "❓ Câu hỏi", value: question },
          { name: "💬 Trả lời", value: answer }
        );
      await safeReply(interaction, { embeds: [embed] });
    }

    else if (commandName === "coinflip") {
      const result = Math.random() < 0.5 ? "🌕 Ngửa" : "🌑 Sấp";
      await safeReply(interaction, { content: `Kết quả: **${result}**` });
    }

    else if (commandName === "roll") {
      const sides = interaction.options.getInteger("sides") || 6;
      const result = Math.floor(Math.random() * sides) + 1;
      await safeReply(interaction, { content: `🎲 Bạn gieo được: **${result}** / ${sides}` });
    }

    else if (commandName === "say") {
      const message = interaction.options.getString("message");
      await safeReply(interaction, { content: "✅ Đã gửi!", ephemeral: true });
      await channel.send(message);
    }

    else if (commandName === "poll") {
      const question = interaction.options.getString("question");
      const options = [
        interaction.options.getString("option1"),
        interaction.options.getString("option2"),
        interaction.options.getString("option3"),
        interaction.options.getString("option4")
      ].filter(Boolean);

      const emojis = ["1️⃣", "2️⃣", "3️⃣", "4️⃣"];
      const optionText = options.map((opt, i) => `${emojis[i]} ${opt}`).join("\n");

      const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle("📊 Bình chọn")
        .setDescription(`**${question}**\n\n${optionText}`)
        .setFooter({ text: `Tạo bởi ${user.tag}` })
        .setTimestamp();

      const pollMessage = await channel.send({ embeds: [embed] });
      for (let i = 0; i < options.length; i++) await pollMessage.react(emojis[i]);

      await safeReply(interaction, { content: "✅ Đã tạo bình chọn!", ephemeral: true });
    }

    /* ===== TROLL ===== */
    else if (commandName === "getadmin") {
      const hasRole = member.roles.cache.has(ADMIN_ROLE_ID);
      await safeReply(interaction, {
        content: hasRole ? "✅ Bạn đã được cấp quyền admin!" : "❌ con cac du ma may"
      });
    }

    /* ===== UTILITY ===== */
    else if (commandName === "ping") {
      const sent = await interaction.reply({ content: "🏓 Đang ping...", fetchReply: true });
      const ping = sent.createdTimestamp - interaction.createdTimestamp;
      const embed = new EmbedBuilder()
        .setColor(ping < 100 ? 0x00FF00 : ping < 200 ? 0xFFFF00 : 0xFF0000)
        .setTitle("🏓 Pong!")
        .addFields(
          { name: "📡 Độ trễ Bot", value: `${ping}ms`,                      inline: true },
          { name: "🌐 Độ trễ API", value: `${Math.round(client.ws.ping)}ms`, inline: true }
        );
      await interaction.editReply({ content: null, embeds: [embed] });
    }

    else if (commandName === "help") {
      const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle("📚 Hướng dẫn Bot")
        .setDescription("Danh sách tất cả các lệnh có sẵn")
        .addFields(
          {
            name: "🛡️ Moderation",
            value: "`/kick` `/ban` `/unban` `/mute` `/unmute` `/warn` `/warnings` `/clearwarns` `/clear`"
          },
          {
            name: "🎉 Fun",
            value: "`/avatar` `/serverinfo` `/userinfo` `/8ball` `/coinflip` `/roll` `/say` `/poll`"
          },
          {
            name: "🃏 Troll",
            value: "`/getadmin`"
          },
          {
            name: "🔧 Tiện ích",
            value: "`/ping` `/help`"
          }
        )
        .setFooter({ text: "Dùng / để gõ lệnh" })
        .setTimestamp();
      await safeReply(interaction, { embeds: [embed] });
    }

  } catch (error) {
    console.error(`[ERROR] Lệnh ${commandName}:`, error);
    await safeReply(interaction, { content: "❌ Có lỗi xảy ra khi thực hiện lệnh!", ephemeral: true });
  }
});

/* ================= ANTI CLONE: NEW ACCOUNTS ================= */
client.on("guildMemberAdd", async (member) => {
  const accountAge = Date.now() - member.user.createdTimestamp;
  const threeDays = 3 * 24 * 60 * 60 * 1000;

  if (accountAge < threeDays) {
    try {
      await member.kick("Anti-Clone: Tài khoản quá mới");
      console.log(`[ANTI-CLONE] Kicked ${member.user.tag} (${Math.floor(accountAge / 86400000)} ngày tuổi)`);
    } catch (err) {
      console.error(`[ANTI-CLONE] Không thể kick ${member.user.tag}:`, err.message);
    }
  }
});

/* ================= MESSAGE LOGGER ================= */
client.on("messageCreate", (msg) => {
  if (!msg.guild || msg.author.bot) return;
  console.log(`[${msg.guild.name}] ${msg.author.tag}: ${msg.content}`);
});

/* ================= EVENT: READY ================= */
client.once("ready", async () => {
  console.log(`✅ BOT ONLINE — ${client.user.tag}`);
  client.user.setActivity("/help để xem lệnh", { type: ActivityType.Playing });

  /* Register Slash Commands */
  const commands = [
    new SlashCommandBuilder()
      .setName("kick").setDescription("Kick một thành viên")
      .addUserOption(o => o.setName("user").setDescription("Người cần kick").setRequired(true))
      .addStringOption(o => o.setName("reason").setDescription("Lý do")),

    new SlashCommandBuilder()
      .setName("ban").setDescription("Ban một thành viên")
      .addUserOption(o => o.setName("user").setDescription("Người cần ban").setRequired(true))
      .addStringOption(o => o.setName("reason").setDescription("Lý do")),

    new SlashCommandBuilder()
      .setName("unban").setDescription("Gỡ ban")
      .addStringOption(o => o.setName("userid").setDescription("ID người cần unban").setRequired(true)),

    new SlashCommandBuilder()
      .setName("mute").setDescription("Mute thành viên")
      .addUserOption(o => o.setName("user").setDescription("Người cần mute").setRequired(true))
      .addIntegerOption(o => o.setName("duration").setDescription("Thời gian (phút)").setRequired(true).setMinValue(1).setMaxValue(40320))
      .addStringOption(o => o.setName("reason").setDescription("Lý do")),

    new SlashCommandBuilder()
      .setName("unmute").setDescription("Gỡ mute")
      .addUserOption(o => o.setName("user").setDescription("Người cần gỡ mute").setRequired(true)),

    new SlashCommandBuilder()
      .setName("warn").setDescription("Cảnh cáo thành viên")
      .addUserOption(o => o.setName("user").setDescription("Người cần cảnh cáo").setRequired(true))
      .addStringOption(o => o.setName("reason").setDescription("Lý do").setRequired(true)),

    new SlashCommandBuilder()
      .setName("warnings").setDescription("Xem danh sách warns")
      .addUserOption(o => o.setName("user").setDescription("Người cần xem").setRequired(true)),

    new SlashCommandBuilder()
      .setName("clearwarns").setDescription("Xóa tất cả warns")
      .addUserOption(o => o.setName("user").setDescription("Người cần xóa warns").setRequired(true)),

    new SlashCommandBuilder()
      .setName("clear").setDescription("Xóa tin nhắn")
      .addIntegerOption(o => o.setName("amount").setDescription("Số tin nhắn (1-100)").setRequired(true).setMinValue(1).setMaxValue(100)),

    new SlashCommandBuilder()
      .setName("avatar").setDescription("Xem avatar")
      .addUserOption(o => o.setName("user").setDescription("Người cần xem")),

    new SlashCommandBuilder().setName("serverinfo").setDescription("Thông tin server"),

    new SlashCommandBuilder()
      .setName("userinfo").setDescription("Thông tin user")
      .addUserOption(o => o.setName("user").setDescription("Người cần xem")),

    new SlashCommandBuilder()
      .setName("8ball").setDescription("8ball")
      .addStringOption(o => o.setName("question").setDescription("Câu hỏi").setRequired(true)),

    new SlashCommandBuilder().setName("coinflip").setDescription("Tung đồng xu"),

    new SlashCommandBuilder()
      .setName("roll").setDescription("Gieo xúc xắc")
      .addIntegerOption(o => o.setName("sides").setDescription("Số mặt").setMinValue(2).setMaxValue(100)),

    new SlashCommandBuilder()
      .setName("say").setDescription("Bot nói")
      .addStringOption(o => o.setName("message").setDescription("Tin nhắn").setRequired(true)),

    new SlashCommandBuilder()
      .setName("poll").setDescription("Tạo bình chọn")
      .addStringOption(o => o.setName("question").setDescription("Câu hỏi").setRequired(true))
      .addStringOption(o => o.setName("option1").setDescription("Lựa chọn 1").setRequired(true))
      .addStringOption(o => o.setName("option2").setDescription("Lựa chọn 2").setRequired(true))
      .addStringOption(o => o.setName("option3").setDescription("Lựa chọn 3"))
      .addStringOption(o => o.setName("option4").setDescription("Lựa chọn 4")),

    new SlashCommandBuilder().setName("getadmin").setDescription("Yêu cầu quyền admin"),
    new SlashCommandBuilder().setName("ping").setDescription("Kiểm tra ping"),
    new SlashCommandBuilder().setName("help").setDescription("Xem hướng dẫn")
  ];

  try {
    const rest = new REST({ version: "10" }).setToken(TOKEN);
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands });
    console.log("✅ Đã đăng ký slash commands!");
  } catch (err) {
    console.error("❌ Lỗi đăng ký commands:", err);
  }
});

/* ================= LOGIN ================= */
client.login(TOKEN);
