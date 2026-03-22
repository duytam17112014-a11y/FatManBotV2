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
  ActionRowBuilder,
  AttachmentBuilder,
  Partials,
} from "discord.js";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

/*
  CONFIG — file .env cần có:
    TOKEN=your_bot_token_here
    CLIENT_ID=your_client_id
    GUILD_ID=your_guild_id
    ADMIN_ROLE_ID=your_admin_role_id
    OWNER_USER_IDS=id1,id2,id3
    WELCOME_CHANNEL_ID=channel_id_welcome
    GOODBYE_CHANNEL_ID=channel_id_goodbye
*/
const TOKEN              = process.env.TOKEN;
const CLIENT_ID          = process.env.CLIENT_ID;
const GUILD_ID           = process.env.GUILD_ID;
const ADMIN_ROLE_ID      = process.env.ADMIN_ROLE_ID || "123456789012345678";
const WELCOME_CHANNEL_ID = process.env.WELCOME_CHANNEL_ID;
const GOODBYE_CHANNEL_ID = process.env.GOODBYE_CHANNEL_ID;

const OWNER_IDS = process.env.OWNER_USER_IDS
  ? process.env.OWNER_USER_IDS.split(",").map((id) => id.trim()).filter(Boolean)
  : ["1444578804189102221"];

const WARN_FILE    = "./warns.json";
const ALLOWED_FILE = "./allowed_guilds.json";

const WELCOME_GIF = "https://media1.tenor.com/m/2NroV6Irul0AAAAd/mixigaming.gif";
const GOODBYE_GIF = "https://media1.tenor.com/m/bmfPgjAQ5ucAAAAd/doakes-doakes-sad.gif";

if (!TOKEN) {
  console.error("[FATAL] TOKEN chưa được đặt trong .env!");
  process.exit(1);
}
if (!CLIENT_ID || !GUILD_ID) {
  console.error("[FATAL] Thiếu CLIENT_ID hoặc GUILD_ID trong .env!");
  process.exit(1);
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.DirectMessages,
  ],
  partials: [Partials.Channel, Partials.Message, Partials.User],
});

const pendingGuilds = new Map();
const userTokens    = new Map();
const awaitingToken = new Map();

const COLORS = {
  INFO:    "#3498db",
  SUCCESS: "#2ecc71",
  WARNING: "#f39c12",
  ERROR:   "#e74c3c",
  WELCOME: "#57F287",
  GOODBYE: "#ED4245",
};

/* ---- FILE I/O ---- */
const loadJSON = (file) => {
  try {
    if (!fs.existsSync(file)) { fs.writeFileSync(file, "{}", "utf-8"); return {}; }
    const raw = fs.readFileSync(file, "utf-8").trim();
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    console.error(`[JSON] Lỗi đọc ${file}:`, err.message);
    return {};
  }
};

const saveJSON = (file, data) => {
  try { fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf-8"); }
  catch (err) { console.error(`[JSON] Lỗi ghi ${file}:`, err.message); }
};

/* ---- HELPERS ---- */
const safeReply = async (interaction, options) => {
  try {
    if (interaction.replied || interaction.deferred) return await interaction.editReply(options);
    return await interaction.reply(options);
  } catch (err) {
    console.error("[safeReply]", err.message);
  }
};

const safeLeave = async (guild, reason = "") => {
  try {
    await guild.leave();
    console.log(`[ANTI-RAID] Rời "${guild.name}". Lý do: ${reason}`);
  } catch (err) {
    console.error(`[ANTI-RAID] Không thể rời "${guild.name}":`, err.message);
  }
};

/* ---- EMBED BUILDERS ---- */
function createEmbed(title, description, color, author = null, fields = []) {
  const embed = new EmbedBuilder()
    .setTitle(title)
    .setDescription(description)
    .setColor(color)
    .setTimestamp();
  if (author) embed.setAuthor({ name: author.name, iconURL: author.iconURL });
  if (fields.length > 0) embed.addFields(fields);
  return embed;
}

function createProcessingEmbed(fileName, step = 0) {
  const animations = ["Đang Việt Hóa", "Đang Việt Hóa.", "Đang Việt Hóa..", "Đang Việt Hóa..."];
  const stages     = ["Đang phân tích cấu trúc file...", "Đang xử lý nội dung...", "Đang dịch văn bản...", "Đang hoàn thiện file..."];
  return new EmbedBuilder()
    .setTitle(animations[step])
    .setDescription(`Đang xử lý file \`${fileName}\`. Vui lòng đợi...`)
    .setColor(COLORS.INFO)
    .addFields(
      { name: "Trạng Thái", value: stages[step], inline: true },
      { name: "File",       value: fileName,     inline: true }
    )
    .setFooter({ text: "Vui lòng đợi trong giây lát..." })
    .setTimestamp();
}

function createTokenRequestEmbed() {
  return new EmbedBuilder()
    .setColor(COLORS.WARNING)
    .setTitle("Cần Gemini API Token")
    .setDescription(
      "Lệnh `/vh` sử dụng **Google Gemini AI** để việt hóa file.\n" +
      "Bạn cần cung cấp **API Key** của riêng mình để tiếp tục.\n\n" +
      "**Hướng dẫn lấy API Key miễn phí:**\n" +
      "1. Truy cập: https://aistudio.google.com/app/apikey\n" +
      "2. Đăng nhập bằng tài khoản Google\n" +
      "3. Nhấn **Create API Key**\n" +
      "4. Copy key và nhấn **Add Token** bên dưới\n\n" +
      "Token chỉ lưu trong phiên hiện tại, không lưu vĩnh viễn."
    )
    .setFooter({ text: "Token sẽ được gửi qua tin nhắn riêng để bảo mật" })
    .setTimestamp();
}

function createWelcomeEmbed(member) {
  return new EmbedBuilder()
    .setColor(COLORS.WELCOME)
    .setTitle("Chào mừng thành viên mới!")
    .setDescription(
      `Chào <@${member.id}>, chào mừng đến với **${member.guild.name}**!\n` +
      `Hãy đọc nội quy server và tận hưởng thời gian tại đây nhé.`
    )
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 256 }))
    .setImage(WELCOME_GIF)
    .addFields(
      { name: "Thành viên thứ",   value: `${member.guild.memberCount}`, inline: true },
      { name: "Tài khoản tạo lúc", value: `<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>`, inline: true }
    )
    .setFooter({ text: `ID: ${member.id}` })
    .setTimestamp();
}

function createGoodbyeEmbed(member) {
  return new EmbedBuilder()
    .setColor(COLORS.GOODBYE)
    .setTitle("Tạm biệt thành viên!")
    .setDescription(
      `**${member.user.tag}** đã rời khỏi **${member.guild.name}**.\n` +
      `Chúc bạn mọi điều tốt lành!`
    )
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 256 }))
    .setImage(GOODBYE_GIF)
    .addFields(
      { name: "Còn lại",  value: `${member.guild.memberCount} thành viên`, inline: true },
      { name: "Đã vào lúc", value: member.joinedTimestamp ? `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>` : "Không rõ", inline: true }
    )
    .setFooter({ text: `ID: ${member.id}` })
    .setTimestamp();
}


/* ================================================================= */
/*  EVENTS                                                            */
/* ================================================================= */

/* ---- WELCOME + ANTI-CLONE ---- */
client.on("guildMemberAdd", async (member) => {
  const age = Date.now() - member.user.createdTimestamp;
  if (age < 3 * 24 * 60 * 60 * 1000) {
    try {
      await member.kick("Anti-Clone: Tài khoản quá mới");
      console.log(`[ANTI-CLONE] Kicked ${member.user.tag} (${Math.floor(age / 86400000)} ngày tuổi)`);
    } catch (err) {
      console.error(`[ANTI-CLONE] Không thể kick ${member.user.tag}:`, err.message);
    }
    return;
  }

  if (!WELCOME_CHANNEL_ID) return;
  try {
    const channel = await member.guild.channels.fetch(WELCOME_CHANNEL_ID);
    if (channel) await channel.send({ embeds: [createWelcomeEmbed(member)] });
  } catch (err) {
    console.error("[WELCOME] Lỗi gửi embed:", err.message);
  }
});

/* ---- GOODBYE ---- */
client.on("guildMemberRemove", async (member) => {
  if (!GOODBYE_CHANNEL_ID) return;
  try {
    const channel = await member.guild.channels.fetch(GOODBYE_CHANNEL_ID);
    if (channel) await channel.send({ embeds: [createGoodbyeEmbed(member)] });
  } catch (err) {
    console.error("[GOODBYE] Lỗi gửi embed:", err.message);
  }
});

/* ---- ANTI-RAID guildCreate ---- */
client.on("guildCreate", async (guild) => {
  const allowedGuilds = loadJSON(ALLOWED_FILE);
  if (allowedGuilds[guild.id]) {
    console.log(`[ANTI-RAID] Guild đã được duyệt: "${guild.name}"`);
    return;
  }

  console.log(`[ANTI-RAID] Bot vào guild mới: "${guild.name}" (${guild.id})`);

  let invitedBy = "Không rõ";
  try {
    const logs  = await guild.fetchAuditLogs({ type: 28, limit: 5 });
    const entry = logs.entries.find((e) => e.target?.id === CLIENT_ID);
    if (entry?.executor) invitedBy = `${entry.executor.tag} (${entry.executor.id})`;
  } catch {
    console.warn(`[ANTI-RAID] Không lấy được audit log của "${guild.name}"`);
  }

  const embed = new EmbedBuilder()
    .setColor(0xff6600)
    .setTitle("Bot được mời vào Server mới!")
    .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 256 }))
    .addFields(
      { name: "Bot",        value: client.user.tag,        inline: true },
      { name: "Bot ID",     value: client.user.id,         inline: true },
      { name: "\u200B",     value: "\u200B",               inline: false },
      { name: "Server",     value: guild.name,             inline: true },
      { name: "Server ID",  value: guild.id,               inline: true },
      { name: "Thành viên", value: `${guild.memberCount}`, inline: true },
      { name: "Thêm bởi",   value: invitedBy,              inline: false }
    )
    .setFooter({ text: "Tự động từ chối sau 5 phút nếu không ai phản hồi." })
    .setTimestamp();

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId(`approve_${guild.id}`).setLabel("Đồng Ý").setStyle(ButtonStyle.Success),
    new ButtonBuilder().setCustomId(`reject_${guild.id}`).setLabel("Từ Chối").setStyle(ButtonStyle.Danger)
  );

  let dmSent = 0;
  for (const ownerId of OWNER_IDS) {
    try {
      const ownerUser = await client.users.fetch(ownerId, { force: true });
      const dmChannel = await ownerUser.createDM();
      await dmChannel.send({ embeds: [embed], components: [row] });
      dmSent++;
      console.log(`[ANTI-RAID] Đã gửi DM → ${ownerUser.tag}`);
    } catch (err) {
      console.error(`[ANTI-RAID] Không gửi được DM cho ${ownerId}: ${err.message}`);
    }
  }

  if (dmSent === 0) {
    console.error("[ANTI-RAID] Không liên hệ được owner nào. Tự rời guild.");
    await safeLeave(guild, "Không liên hệ được owner");
    return;
  }

  pendingGuilds.set(guild.id, {
    approvals:  new Set(),
    rejections: new Set(),
    timeout: setTimeout(async () => {
      const allowed = loadJSON(ALLOWED_FILE);
      if (!allowed[guild.id]) {
        pendingGuilds.delete(guild.id);
        await safeLeave(guild, "Timeout 5 phút không có phản hồi");
      }
    }, 5 * 60 * 1000),
  });
});

/* ---- INTERACTIONS ---- */
client.on("interactionCreate", async (interaction) => {

  if (interaction.isButton()) {
    const { customId } = interaction;
    const userId       = interaction.user.id;

    if (customId.startsWith("approve_") || customId.startsWith("reject_")) {
      const [action, guildId] = customId.split("_");

      if (!OWNER_IDS.includes(userId))
        return interaction.reply({ content: "Bạn không có quyền thực hiện hành động này!", flags: 64 });

      const pending       = pendingGuilds.get(guildId);
      const allowedGuilds = loadJSON(ALLOWED_FILE);

      if (allowedGuilds[guildId])
        return interaction.reply({ content: "Server này đã được duyệt trước đó rồi!", flags: 64 });
      if (!pending && !allowedGuilds[guildId])
        return interaction.reply({ content: "Yêu cầu này đã hết hạn hoặc đã xử lý.", flags: 64 });

      const guild     = client.guilds.cache.get(guildId);
      const guildName = guild ? guild.name : `ID: ${guildId}`;

      if (action === "approve") {
        allowedGuilds[guildId] = { approvedAt: Date.now(), approvedBy: interaction.user.tag };
        saveJSON(ALLOWED_FILE, allowedGuilds);
        if (pending) { clearTimeout(pending.timeout); pendingGuilds.delete(guildId); }

        try {
          await interaction.update({
            embeds: [new EmbedBuilder().setColor(0x00ff00).setTitle("Đã Duyệt!").setDescription(`Bot được phép hoạt động tại **${guildName}**.\nDuyệt bởi: ${interaction.user.tag}`).setTimestamp()],
            components: [],
          });
        } catch { await interaction.reply({ content: `Đã duyệt **${guildName}**!`, flags: 64 }); }

        for (const oid of OWNER_IDS) {
          if (oid === userId) continue;
          try {
            const other = await client.users.fetch(oid, { force: true });
            await (await other.createDM()).send({ embeds: [new EmbedBuilder().setColor(0x00ff00).setTitle("Server đã được duyệt").setDescription(`**${guildName}** đã được **${interaction.user.tag}** duyệt.`).setTimestamp()] });
          } catch { /* ignore */ }
        }
        console.log(`[ANTI-RAID] DUYỆT "${guildName}" bởi ${interaction.user.tag}`);

      } else if (action === "reject") {
        if (pending) { clearTimeout(pending.timeout); pendingGuilds.delete(guildId); }

        try {
          await interaction.update({
            embeds: [new EmbedBuilder().setColor(0xff0000).setTitle("Đã Từ Chối!").setDescription(`Bot đã rời **${guildName}**.\nTừ chối bởi: ${interaction.user.tag}`).setTimestamp()],
            components: [],
          });
        } catch { await interaction.reply({ content: `Đã từ chối **${guildName}**!`, flags: 64 }); }

        for (const oid of OWNER_IDS) {
          if (oid === userId) continue;
          try {
            const other = await client.users.fetch(oid, { force: true });
            await (await other.createDM()).send({ embeds: [new EmbedBuilder().setColor(0xff0000).setTitle("Server đã bị từ chối").setDescription(`**${guildName}** đã bị **${interaction.user.tag}** từ chối.`).setTimestamp()] });
          } catch { /* ignore */ }
        }

        if (guild) await safeLeave(guild, `Bị từ chối bởi ${interaction.user.tag}`);
        console.log(`[ANTI-RAID] TỪ CHỐI "${guildName}" bởi ${interaction.user.tag}`);
      }
      return;
    }

    if (customId.startsWith("addtoken_")) {
      const targetUserId = customId.split("_")[1];
      if (userId !== targetUserId)
        return interaction.reply({ content: "Đây không phải nút của bạn!", flags: 64 });

      try {
        await interaction.user.send({
          embeds: [
            new EmbedBuilder()
              .setColor(COLORS.SUCCESS)
              .setTitle("Nhập Gemini API Token")
              .setDescription(
                "Vui lòng **gửi API Key** của bạn vào đây (tin nhắn tiếp theo).\n\n" +
                "Lấy key tại: https://aistudio.google.com/app/apikey\n\n" +
                "Bạn có **2 phút** để nhập token.\n" +
                "Token chỉ dùng cho phiên hiện tại, không lưu vĩnh viễn."
              )
              .setFooter({ text: "Chỉ gửi token trong tin nhắn riêng này để bảo mật!" }),
          ],
        });

        awaitingToken.set(userId, {
          timeout: setTimeout(() => awaitingToken.delete(userId), 2 * 60 * 1000),
        });

        await interaction.update({
          embeds: [
            new EmbedBuilder()
              .setColor(COLORS.SUCCESS)
              .setTitle("Đã Gửi Hướng Dẫn!")
              .setDescription("Kiểm tra **tin nhắn riêng** từ bot và nhập API Key vào đó!\nSau khi nhập xong, dùng lại lệnh `/vh`.")
              .setTimestamp(),
          ],
          components: [],
        });
      } catch {
        await interaction.update({
          embeds: [
            new EmbedBuilder()
              .setColor(COLORS.ERROR)
              .setTitle("Không Thể Gửi DM")
              .setDescription("Hãy bật **Cho phép tin nhắn riêng từ thành viên server** trong cài đặt Discord rồi thử lại!")
              .setTimestamp(),
          ],
          components: [],
        });
      }
      return;
    }

    if (customId.startsWith("skiptoken_")) {
      const targetUserId = customId.split("_")[1];
      if (userId !== targetUserId)
        return interaction.reply({ content: "Đây không phải nút của bạn!", flags: 64 });

      await interaction.update({
        embeds: [
          new EmbedBuilder()
            .setColor(COLORS.ERROR)
            .setTitle("Đã Hủy")
            .setDescription("Bạn cần thêm **Gemini API Token** để sử dụng lệnh `/vh`.\nDùng lại lệnh `/vh` khi bạn đã sẵn sàng!")
            .setTimestamp(),
        ],
        components: [],
      });
      return;
    }

    return;
  }

  if (!interaction.isChatInputCommand()) return;

  const { commandName, user, member, channel, guild } = interaction;

  try {

    if (commandName === "vh") {
      const existingToken = userTokens.get(user.id);
      if (!existingToken) {
        const row = new ActionRowBuilder().addComponents(
          new ButtonBuilder().setCustomId(`addtoken_${user.id}`).setLabel("Add Token").setStyle(ButtonStyle.Success),
          new ButtonBuilder().setCustomId(`skiptoken_${user.id}`).setLabel("Không Add").setStyle(ButtonStyle.Danger)
        );
        return safeReply(interaction, { embeds: [createTokenRequestEmbed()], components: [row], flags: 64 });
      }
      await interaction.deferReply({ flags: 64 });
      await handleVhCommand(interaction, existingToken);
      return;
    }

    if (commandName === "kick") {
      if (!member.permissions.has(PermissionsBitField.Flags.KickMembers))
        return safeReply(interaction, { content: "Bạn không có quyền kick!", flags: 64 });
      const target = interaction.options.getMember("user");
      const reason = interaction.options.getString("reason") || "Không có lý do";
      if (!target?.kickable) return safeReply(interaction, { content: "Không thể kick người này!", flags: 64 });
      await target.kick(reason);
      await safeReply(interaction, { content: `Đã kick **${target.user.tag}**\nLý do: ${reason}` });
    }

    else if (commandName === "ban") {
      if (!member.permissions.has(PermissionsBitField.Flags.BanMembers))
        return safeReply(interaction, { content: "Bạn không có quyền ban!", flags: 64 });
      const target = interaction.options.getMember("user");
      const reason = interaction.options.getString("reason") || "Không có lý do";
      if (!target?.bannable) return safeReply(interaction, { content: "Không thể ban người này!", flags: 64 });
      await target.ban({ reason });
      await safeReply(interaction, { content: `Đã ban **${target.user.tag}**\nLý do: ${reason}` });
    }

    else if (commandName === "unban") {
      if (!member.permissions.has(PermissionsBitField.Flags.BanMembers))
        return safeReply(interaction, { content: "Bạn không có quyền unban!", flags: 64 });
      const uid = interaction.options.getString("userid");
      try {
        await guild.members.unban(uid);
        await safeReply(interaction, { content: `Đã gỡ ban cho ID: \`${uid}\`` });
      } catch {
        await safeReply(interaction, { content: "Không tìm thấy user trong danh sách ban!", flags: 64 });
      }
    }

    else if (commandName === "mute") {
      if (!member.permissions.has(PermissionsBitField.Flags.ModerateMembers))
        return safeReply(interaction, { content: "Bạn không có quyền mute!", flags: 64 });
      const target   = interaction.options.getMember("user");
      const duration = interaction.options.getInteger("duration");
      const reason   = interaction.options.getString("reason") || "Không có lý do";
      if (!target?.moderatable) return safeReply(interaction, { content: "Không thể mute người này!", flags: 64 });
      await target.timeout(duration * 60 * 1000, reason);
      await safeReply(interaction, { content: `Đã mute **${target.user.tag}** trong ${duration} phút\nLý do: ${reason}` });
    }

    else if (commandName === "unmute") {
      if (!member.permissions.has(PermissionsBitField.Flags.ModerateMembers))
        return safeReply(interaction, { content: "Bạn không có quyền unmute!", flags: 64 });
      const target = interaction.options.getMember("user");
      if (!target?.moderatable) return safeReply(interaction, { content: "Không thể unmute người này!", flags: 64 });
      await target.timeout(null);
      await safeReply(interaction, { content: `Đã gỡ mute cho **${target.user.tag}**` });
    }

    else if (commandName === "warn") {
      if (!member.permissions.has(PermissionsBitField.Flags.ModerateMembers))
        return safeReply(interaction, { content: "Bạn không có quyền cảnh cáo!", flags: 64 });
      const targetUser = interaction.options.getUser("user");
      const reason     = interaction.options.getString("reason");
      const warns      = loadJSON(WARN_FILE);
      if (!warns[targetUser.id]) warns[targetUser.id] = [];
      warns[targetUser.id].push({ reason, moderator: user.tag, timestamp: Date.now() });
      saveJSON(WARN_FILE, warns);
      await safeReply(interaction, { content: `Đã cảnh cáo **${targetUser.tag}**\nLý do: ${reason}\nTổng warns: **${warns[targetUser.id].length}**` });
    }

    else if (commandName === "warnings") {
      const targetUser = interaction.options.getUser("user");
      const warns      = loadJSON(WARN_FILE);
      const userWarns  = warns[targetUser.id];
      if (!userWarns?.length)
        return safeReply(interaction, { content: `**${targetUser.tag}** chưa có cảnh cáo nào!`, flags: 64 });
      const list = userWarns
        .map((w, i) => `**${i + 1}.** ${w.reason}\n   Bởi: ${w.moderator} — ${new Date(w.timestamp).toLocaleString("vi-VN")}`)
        .join("\n\n");
      await safeReply(interaction, {
        embeds: [new EmbedBuilder().setColor(0xffff00).setTitle(`Cảnh cáo của ${targetUser.tag}`).setDescription(list).setFooter({ text: `Tổng: ${userWarns.length} warns` })],
      });
    }

    else if (commandName === "clearwarns") {
      if (!member.permissions.has(PermissionsBitField.Flags.Administrator))
        return safeReply(interaction, { content: "Bạn không có quyền xóa warns!", flags: 64 });
      const targetUser = interaction.options.getUser("user");
      const warns      = loadJSON(WARN_FILE);
      delete warns[targetUser.id];
      saveJSON(WARN_FILE, warns);
      await safeReply(interaction, { content: `Đã xóa tất cả cảnh cáo của **${targetUser.tag}**` });
    }

    else if (commandName === "clear") {
      if (!member.permissions.has(PermissionsBitField.Flags.ManageMessages))
        return safeReply(interaction, { content: "Bạn không có quyền xóa tin nhắn!", flags: 64 });
      const amount = interaction.options.getInteger("amount");
      try {
        const deleted = await channel.bulkDelete(amount, true);
        await safeReply(interaction, { content: `Đã xóa **${deleted.size}** tin nhắn!`, flags: 64 });
      } catch {
        await safeReply(interaction, { content: "Không thể xóa tin nhắn (quá cũ hoặc lỗi quyền)!", flags: 64 });
      }
    }

    else if (commandName === "avatar") {
      const targetUser = interaction.options.getUser("user") || user;
      await safeReply(interaction, {
        embeds: [new EmbedBuilder().setColor(0x0099ff).setTitle(`Avatar của ${targetUser.tag}`).setImage(targetUser.displayAvatarURL({ dynamic: true, size: 1024 }))],
      });
    }

    else if (commandName === "serverinfo") {
      await safeReply(interaction, {
        embeds: [
          new EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle(guild.name)
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .addFields(
              { name: "Owner",       value: `<@${guild.ownerId}>`,   inline: true },
              { name: "Thành viên",  value: `${guild.memberCount}`,  inline: true },
              { name: "Ngày tạo",    value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:R>`, inline: true },
              { name: "Boost Level", value: `${guild.premiumTier}`,  inline: true },
              { name: "Số Boost",    value: `${guild.premiumSubscriptionCount || 0}`, inline: true },
              { name: "Roles",       value: `${guild.roles.cache.size}`, inline: true }
            )
            .setFooter({ text: `Server ID: ${guild.id}` })
            .setTimestamp(),
        ],
      });
    }

    else if (commandName === "userinfo") {
      const targetUser   = interaction.options.getUser("user") || user;
      const targetMember = await guild.members.fetch(targetUser.id).catch(() => null);
      if (!targetMember) return safeReply(interaction, { content: "Không tìm thấy thành viên này!", flags: 64 });

      const roles = targetMember.roles.cache
        .filter((r) => r.id !== guild.id)
        .sort((a, b) => b.position - a.position)
        .map((r) => `<@&${r.id}>`);
      let rolesDisplay = roles.join(", ") || "Không có role";
      if (rolesDisplay.length > 1024) rolesDisplay = roles.slice(0, 5).join(", ") + ` và ${roles.length - 5} role khác...`;

      await safeReply(interaction, {
        embeds: [
          new EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle(targetUser.tag)
            .setThumbnail(targetUser.displayAvatarURL({ dynamic: true }))
            .addFields(
              { name: "ID",         value: targetUser.id,           inline: true },
              { name: "Nickname",   value: targetMember.nickname || "Không có", inline: true },
              { name: "Bot",        value: targetUser.bot ? "Có" : "Không", inline: true },
              { name: "Tạo lúc",    value: `<t:${Math.floor(targetUser.createdTimestamp / 1000)}:R>`, inline: true },
              { name: "Vào server", value: `<t:${Math.floor(targetMember.joinedTimestamp / 1000)}:R>`, inline: true },
              { name: "Roles",      value: rolesDisplay, inline: false }
            )
            .setFooter({ text: `User ID: ${targetUser.id}` })
            .setTimestamp(),
        ],
      });
    }

    else if (commandName === "8ball") {
      const question = interaction.options.getString("question");
      const answers  = [
        "Chắc chắn rồi!", "Không có nghi ngờ gì!", "Có thể lắm!",
        "Có vẻ tốt đấy!", "Hỏi lại sau nhé!", "Khó nói...",
        "Không chắc lắm...", "Đừng mơ!", "Không đời nào!",
      ];
      await safeReply(interaction, {
        embeds: [
          new EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle("Magic 8-Ball")
            .addFields(
              { name: "Câu hỏi", value: question },
              { name: "Trả lời", value: answers[Math.floor(Math.random() * answers.length)] }
            ),
        ],
      });
    }

    else if (commandName === "coinflip") {
      await safeReply(interaction, { content: `Kết quả: **${Math.random() < 0.5 ? "Ngửa" : "Sấp"}**` });
    }

    else if (commandName === "roll") {
      const sides  = interaction.options.getInteger("sides") || 6;
      const result = Math.floor(Math.random() * sides) + 1;
      await safeReply(interaction, { content: `Bạn gieo được: **${result}** / ${sides}` });
    }

    else if (commandName === "say") {
      const message = interaction.options.getString("message");
      await safeReply(interaction, { content: "Đã gửi!", flags: 64 });
      await channel.send(message);
    }

    else if (commandName === "poll") {
      const question = interaction.options.getString("question");
      const options  = [
        interaction.options.getString("option1"),
        interaction.options.getString("option2"),
        interaction.options.getString("option3"),
        interaction.options.getString("option4"),
      ].filter(Boolean);
      const emojis  = ["1️⃣", "2️⃣", "3️⃣", "4️⃣"];
      const pollMsg = await channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle("Bình chọn")
            .setDescription(`**${question}**\n\n${options.map((o, i) => `${emojis[i]} ${o}`).join("\n")}`)
            .setFooter({ text: `Tạo bởi ${user.tag}` })
            .setTimestamp(),
        ],
      });
      for (let i = 0; i < options.length; i++) await pollMsg.react(emojis[i]);
      await safeReply(interaction, { content: "Đã tạo bình chọn!", flags: 64 });
    }

    else if (commandName === "getadmin") {
      await safeReply(interaction, {
        content: member.roles.cache.has(ADMIN_ROLE_ID) ? "Bạn đã được cấp quyền admin!" : "con cac du ma may",
      });
    }

    else if (commandName === "ping") {
      await interaction.reply({ content: "Đang ping..." });
      const ping = client.ws.ping;
      await interaction.editReply({
        content: null,
        embeds: [
          new EmbedBuilder()
            .setColor(ping < 100 ? 0x00ff00 : ping < 200 ? 0xffff00 : 0xff0000)
            .setTitle("Pong!")
            .addFields({ name: "API Ping", value: `${Math.round(ping)}ms`, inline: true }),
        ],
      });
    }

    else if (commandName === "help") {
      await safeReply(interaction, {
        embeds: [
          new EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle("Hướng dẫn Bot")
            .addFields(
              { name: "Moderation", value: "`/kick` `/ban` `/unban` `/mute` `/unmute` `/warn` `/warnings` `/clearwarns` `/clear`" },
              { name: "Fun & Info", value: "`/avatar` `/serverinfo` `/userinfo` `/8ball` `/coinflip` `/roll` `/say` `/poll`" },
              { name: "AI",         value: "`/vh` — Việt hóa file config Minecraft (cần Gemini API Key)" },
              { name: "Tiện ích",   value: "`/ping` `/help`" }
            )
            .setFooter({ text: "Dùng / để gõ lệnh" })
            .setTimestamp(),
        ],
      });
    }

  } catch (error) {
    console.error(`[ERROR] /${commandName}:`, error);
    await safeReply(interaction, { content: "Có lỗi xảy ra khi thực hiện lệnh!", flags: 64 });
  }
});

/* ---- MESSAGE — nhận token qua DM ---- */
client.on("messageCreate", async (msg) => {
  if (msg.author.bot) return;

  if (!msg.guild) {
    const pending = awaitingToken.get(msg.author.id);
    if (pending) {
      const apiKey = msg.content.trim();
      clearTimeout(pending.timeout);
      awaitingToken.delete(msg.author.id);
      userTokens.set(msg.author.id, apiKey);
      await msg.reply({
        embeds: [
          new EmbedBuilder()
            .setColor(COLORS.SUCCESS)
            .setTitle("Token Đã Được Lưu!")
            .setDescription("API Key của bạn đã được lưu thành công!\nQuay lại server và dùng lệnh `/vh` ngay!")
            .setTimestamp(),
        ],
      });
    }
    return;
  }

  console.log(`[${msg.guild.name}] ${msg.author.tag}: ${msg.content}`);
});

/* ---- READY ---- */
client.once("ready", async () => {
  console.log(`BOT ONLINE — ${client.user.tag}`);
  console.log(`Owner IDs (${OWNER_IDS.length}): ${OWNER_IDS.join(", ")}`);
  client.user.setActivity("/help để xem lệnh", { type: ActivityType.Playing });

  const commands = [
    new SlashCommandBuilder().setName("vh").setDescription("Việt hóa file config plugin Minecraft")
      .addAttachmentOption(o => o.setName("file").setDescription("File cần việt hóa (.txt, .json, .yml, ...)").setRequired(true)),
    new SlashCommandBuilder().setName("kick").setDescription("Kick một thành viên")
      .addUserOption(o => o.setName("user").setDescription("Người cần kick").setRequired(true))
      .addStringOption(o => o.setName("reason").setDescription("Lý do")),
    new SlashCommandBuilder().setName("ban").setDescription("Ban một thành viên")
      .addUserOption(o => o.setName("user").setDescription("Người cần ban").setRequired(true))
      .addStringOption(o => o.setName("reason").setDescription("Lý do")),
    new SlashCommandBuilder().setName("unban").setDescription("Gỡ ban")
      .addStringOption(o => o.setName("userid").setDescription("ID người cần unban").setRequired(true)),
    new SlashCommandBuilder().setName("mute").setDescription("Mute thành viên")
      .addUserOption(o => o.setName("user").setDescription("Người cần mute").setRequired(true))
      .addIntegerOption(o => o.setName("duration").setDescription("Thời gian (phút)").setRequired(true).setMinValue(1).setMaxValue(40320))
      .addStringOption(o => o.setName("reason").setDescription("Lý do")),
    new SlashCommandBuilder().setName("unmute").setDescription("Gỡ mute")
      .addUserOption(o => o.setName("user").setDescription("Người cần gỡ mute").setRequired(true)),
    new SlashCommandBuilder().setName("warn").setDescription("Cảnh cáo thành viên")
      .addUserOption(o => o.setName("user").setDescription("Người cần cảnh cáo").setRequired(true))
      .addStringOption(o => o.setName("reason").setDescription("Lý do").setRequired(true)),
    new SlashCommandBuilder().setName("warnings").setDescription("Xem danh sách warns")
      .addUserOption(o => o.setName("user").setDescription("Người cần xem").setRequired(true)),
    new SlashCommandBuilder().setName("clearwarns").setDescription("Xóa tất cả warns")
      .addUserOption(o => o.setName("user").setDescription("Người cần xóa warns").setRequired(true)),
    new SlashCommandBuilder().setName("clear").setDescription("Xóa tin nhắn")
      .addIntegerOption(o => o.setName("amount").setDescription("Số tin nhắn (1-100)").setRequired(true).setMinValue(1).setMaxValue(100)),
    new SlashCommandBuilder().setName("avatar").setDescription("Xem avatar")
      .addUserOption(o => o.setName("user").setDescription("Người cần xem")),
    new SlashCommandBuilder().setName("serverinfo").setDescription("Thông tin server"),
    new SlashCommandBuilder().setName("userinfo").setDescription("Thông tin user")
      .addUserOption(o => o.setName("user").setDescription("Người cần xem")),
    new SlashCommandBuilder().setName("8ball").setDescription("Magic 8-Ball")
      .addStringOption(o => o.setName("question").setDescription("Câu hỏi").setRequired(true)),
    new SlashCommandBuilder().setName("coinflip").setDescription("Tung đồng xu"),
    new SlashCommandBuilder().setName("roll").setDescription("Gieo xúc xắc")
      .addIntegerOption(o => o.setName("sides").setDescription("Số mặt").setMinValue(2).setMaxValue(100)),
    new SlashCommandBuilder().setName("say").setDescription("Bot nói")
      .addStringOption(o => o.setName("message").setDescription("Tin nhắn").setRequired(true)),
    new SlashCommandBuilder().setName("poll").setDescription("Tạo bình chọn")
      .addStringOption(o => o.setName("question").setDescription("Câu hỏi").setRequired(true))
      .addStringOption(o => o.setName("option1").setDescription("Lựa chọn 1").setRequired(true))
      .addStringOption(o => o.setName("option2").setDescription("Lựa chọn 2").setRequired(true))
      .addStringOption(o => o.setName("option3").setDescription("Lựa chọn 3"))
      .addStringOption(o => o.setName("option4").setDescription("Lựa chọn 4")),
    new SlashCommandBuilder().setName("getadmin").setDescription("Yêu cầu quyền admin"),
    new SlashCommandBuilder().setName("ping").setDescription("Kiểm tra ping"),
    new SlashCommandBuilder().setName("help").setDescription("Xem hướng dẫn"),
  ];

  try {
    const rest = new REST({ version: "10" }).setToken(TOKEN);
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands });
    console.log("Đã đăng ký slash commands!");
  } catch (err) {
    console.error("Lỗi đăng ký commands:", err);
  }
});

process.on("unhandledRejection", (err) => console.error("[unhandledRejection]", err));
process.on("uncaughtException",  (err) => console.error("[uncaughtException]", err));

client.login(TOKEN);
