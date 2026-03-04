import {
  Client,
  GatewayIntentBits,
  SlashCommandBuilder,
  REST,
  Routes,
  PermissionsBitField,
  ActivityType,
  EmbedBuilder
} from "discord.js";
import {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
  getVoiceConnection
} from "@discordjs/voice";
import fs from "fs";
import dotenv from "dotenv";
import ytdl from "ytdl-core";
import SpotifyWebApi from "spotify-web-api-node";
import ytSearch from "yt-search";

dotenv.config();

/* ================= CONFIG ================= */
const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;
const ADMIN_ROLE_ID = process.env.ADMIN_ROLE_ID || "123456789012345678";

const WARN_FILE = "./warns.json";
const MUSIC_FOLDER = "./sounds";

/* ================= CLIENT ================= */
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates
  ]
});


/* ================= DATABASE FUNCTIONS ================= */
const loadJSON = (file) => {
  if (!fs.existsSync(file)) fs.writeFileSync(file, "{}");
  return JSON.parse(fs.readFileSync(file));
};

const saveJSON = (file, data) =>
  fs.writeFileSync(file, JSON.stringify(data, null, 2));

/* ================= HELPER FUNCTIONS ================= */
function formatDuration(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}


/* ================= EVENT: MESSAGE LOGGING ================= */
client.on("messageCreate", (msg) => {
  if (!msg.guild || msg.author.bot) return;
  console.log(`[${msg.guild.name}] ${msg.author.tag}: ${msg.content}`);
});

/* ================= EVENT: ANTI CLONE (NEW ACCOUNTS) ================= */
client.on("guildMemberAdd", async (member) => {
  const accountAge = Date.now() - member.user.createdTimestamp;
  const threeDays = 3 * 24 * 60 * 60 * 1000;

  if (accountAge < threeDays) {
    try {
      await member.kick("Anti-Clone: Tài khoản quá mới");
      console.log(`[ANTI-CLONE] Đã kick ${member.user.tag} (tài khoản ${Math.floor(accountAge / 86400000)} ngày tuổi)`);
    } catch (error) {
      console.error(`[ANTI-CLONE] Không thể kick ${member.user.tag}:`, error.message);
    }
  }
});

/* ================= EVENT: READY ================= */
client.once("ready", () => {
  console.log(`✅ BOT ONLINE - Đăng nhập với tên ${client.user.tag}`);
  client.user.setActivity("/help để xem lệnh", {
    type: ActivityType.Playing
  });
});

/* ================= SLASH COMMANDS DEFINITION ================= */
const commands = [
  // ===== MUSIC COMMANDS =====
  // Ngưng hoạt động do lỗi hệ thống

  // ===== MODERATION COMMANDS =====
  new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick một thành viên khỏi server")
    .addUserOption(o =>
      o.setName("user")
       .setDescription("Người cần kick")
       .setRequired(true))
    .addStringOption(o =>
      o.setName("reason")
       .setDescription("Lý do kick")),

  new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban một thành viên khỏi server")
    .addUserOption(o =>
      o.setName("user")
       .setDescription("Người cần ban")
       .setRequired(true))
    .addStringOption(o =>
      o.setName("reason")
       .setDescription("Lý do ban")),

  new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Gỡ ban cho một người dùng")
    .addStringOption(o =>
      o.setName("userid")
       .setDescription("ID của người cần unban")
       .setRequired(true)),

  new SlashCommandBuilder()
    .setName("mute")
    .setDescription("Mute một thành viên")
    .addUserOption(o =>
      o.setName("user")
       .setDescription("Người cần mute")
       .setRequired(true))
    .addIntegerOption(o =>
      o.setName("duration")
       .setDescription("Thời gian mute (phút)")
       .setRequired(true))
    .addStringOption(o =>
      o.setName("reason")
       .setDescription("Lý do mute")),

  new SlashCommandBuilder()
    .setName("unmute")
    .setDescription("Gỡ mute cho một thành viên")
    .addUserOption(o =>
      o.setName("user")
       .setDescription("Người cần gỡ mute")
       .setRequired(true)),

  new SlashCommandBuilder()
    .setName("warn")
    .setDescription("Cảnh cáo một thành viên")
    .addUserOption(o =>
      o.setName("user")
       .setDescription("Người cần cảnh cáo")
       .setRequired(true))
    .addStringOption(o =>
      o.setName("reason")
       .setDescription("Lý do cảnh cáo")
       .setRequired(true)),

  new SlashCommandBuilder()
    .setName("warnings")
    .setDescription("Xem danh sách cảnh cáo của một người")
    .addUserOption(o =>
      o.setName("user")
       .setDescription("Người cần xem warns")
       .setRequired(true)),

  new SlashCommandBuilder()
    .setName("clearwarns")
    .setDescription("Xóa tất cả cảnh cáo của một người")
    .addUserOption(o =>
      o.setName("user")
       .setDescription("Người cần xóa warns")
       .setRequired(true)),

  new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Xóa số lượng tin nhắn")
    .addIntegerOption(o =>
      o.setName("amount")
       .setDescription("Số tin nhắn cần xóa (1-100)")
       .setRequired(true)
       .setMinValue(1)
       .setMaxValue(100)),

  // ===== FUN COMMANDS =====
  new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Xem avatar của người dùng")
    .addUserOption(o =>
      o.setName("user")
       .setDescription("Người cần xem avatar")),

  new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("Xem thông tin server"),

  new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Xem thông tin người dùng")
    .addUserOption(o =>
      o.setName("user")
       .setDescription("Người cần xem thông tin")),

  new SlashCommandBuilder()
    .setName("8ball")
    .setDescription("8ball trả lời câu hỏi của bạn")
    .addStringOption(o =>
      o.setName("question")
       .setDescription("Câu hỏi của bạn")
       .setRequired(true)),

  new SlashCommandBuilder()
    .setName("coinflip")
    .setDescription("Tung đồng xu"),

  new SlashCommandBuilder()
    .setName("roll")
    .setDescription("Gieo xúc xắc")
    .addIntegerOption(o =>
      o.setName("sides")
       .setDescription("Số mặt của xúc xắc")
       .setMinValue(2)
       .setMaxValue(100)),

  new SlashCommandBuilder()
    .setName("say")
    .setDescription("Để bot nói điều gì đó")
    .addStringOption(o =>
      o.setName("message")
       .setDescription("Tin nhắn cần nói")
       .setRequired(true)),

  new SlashCommandBuilder()
    .setName("poll")
    .setDescription("Tạo bình chọn")
    .addStringOption(o =>
      o.setName("question")
       .setDescription("Câu hỏi bình chọn")
       .setRequired(true))
    .addStringOption(o =>
      o.setName("option1")
       .setDescription("Lựa chọn 1")
       .setRequired(true))
    .addStringOption(o =>
      o.setName("option2")
       .setDescription("Lựa chọn 2")
       .setRequired(true))
    .addStringOption(o =>
      o.setName("option3")
       .setDescription("Lựa chọn 3"))
    .addStringOption(o =>
      o.setName("option4")
       .setDescription("Lựa chọn 4")),

  // ===== TROLL COMMANDS =====
  new SlashCommandBuilder()
    .setName("getadmin")
    .setDescription("Yêu cầu quyền admin"),

  // ===== UTILITY COMMANDS =====
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Kiểm tra ping của bot"),

  new SlashCommandBuilder()
    .setName("help")
    .setDescription("Xem hướng dẫn sử dụng bot")
];

/* ================= REGISTER SLASH COMMANDS ================= */
const rest = new REST({ version: "10" }).setToken(TOKEN);

(async () => {
  try {
    console.log("Đang đăng ký slash commands...");
    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commands }
    );
    console.log("Slash commands đã được đăng ký!");
  } catch (error) {
    console.error("Lỗi khi đăng ký commands:", error);
  }
})();

/* ================= INTERACTION HANDLER ================= */
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const commandName = interaction.commandName;
  const guildId = interaction.guild.id;
  const { user, member, channel, guild } = interaction;
  try {
    // ===== MODERATION COMMANDS ===== (giữ nguyên)
    if (commandName === "kick") {
      if (!member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
        return interaction.reply({ content: "Bạn không có quyền kick!", ephemeral: true });
      }
      const targetMember = interaction.options.getMember("user");
      const reason = interaction.options.getString("reason") || "Không có lý do";
      if (!targetMember.kickable) {
        return interaction.reply({ content: "Không thể kick người này!", ephemeral: true });
      }
      await targetMember.kick(reason);
      await interaction.reply(`Đã kick ${targetMember.user.tag}\nLý do: ${reason}`);
    }

    if (commandName === "ban") {
      if (!member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
        return interaction.reply({ content: "Bạn không có quyền ban!", ephemeral: true });
      }
      const targetMember = interaction.options.getMember("user");
      const reason = interaction.options.getString("reason") || "Không có lý do";
      if (!targetMember.bannable) {
        return interaction.reply({ content: "Không thể ban người này!", ephemeral: true });
      }
      await targetMember.ban({ reason });
      await interaction.reply(`Đã ban ${targetMember.user.tag}\nLý do: ${reason}`);
    }

    if (commandName === "unban") {
      if (!member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
        return interaction.reply({ content: "Bạn không có quyền unban!", ephemeral: true });
      }
      const userId = interaction.options.getString("userid");
      try {
        await guild.members.unban(userId);
        await interaction.reply(`Đã gỡ ban cho user ID: ${userId}`);
      } catch (error) {
        await interaction.reply({ content: "Không tìm thấy user này trong danh sách ban!", ephemeral: true });
      }
    }

    if (commandName === "mute") {
      if (!member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
        return interaction.reply({ content: "Bạn không có quyền mute!", ephemeral: true });
      }
      const targetMember = interaction.options.getMember("user");
      const duration = interaction.options.getInteger("duration");
      const reason = interaction.options.getString("reason") || "Không có lý do";
      if (!targetMember.moderatable) {
        return interaction.reply({ content: " Không thể mute người này!", ephemeral: true });
      }
      const muteTime = duration * 60 * 1000;
      await targetMember.timeout(muteTime, reason);
      await interaction.reply(`Đã mute ${targetMember.user.tag} trong ${duration} phút\nLý do: ${reason}`);
    }

    if (commandName === "unmute") {
      if (!member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
        return interaction.reply({ content: "Bạn không có quyền unmute!", ephemeral: true });
      }
      const targetMember = interaction.options.getMember("user");
      await targetMember.timeout(null);
      await interaction.reply(`Đã gỡ mute cho ${targetMember.user.tag}`);
    }

    if (commandName === "warn") {
      if (!member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
        return interaction.reply({ content: "Bạn không có quyền cảnh cáo!", ephemeral: true });
      }
      const targetUser = interaction.options.getUser("user");
      const reason = interaction.options.getString("reason");
      const warns = loadJSON(WARN_FILE);
      if (!warns[targetUser.id]) warns[targetUser.id] = [];
      warns[targetUser.id].push({
        reason,
        moderator: user.tag,
        timestamp: Date.now()
      });
      saveJSON(WARN_FILE, warns);
      await interaction.reply(`Đã cảnh cáo ${targetUser.tag}\nLý do: ${reason}\nTổng warns: ${warns[targetUser.id].length}`);
    }

    if (commandName === "warnings") {
      const targetUser = interaction.options.getUser("user");
      const warns = loadJSON(WARN_FILE);
      const userWarns = warns[targetUser.id];
      if (!userWarns || userWarns.length === 0) {
        return interaction.reply({ content: `${targetUser.tag} chưa có cảnh cáo nào!`, ephemeral: true });
      }
      const warnList = userWarns.map((warn, index) => {
        const date = new Date(warn.timestamp).toLocaleString("vi-VN");
        return `**${index + 1}.** ${warn.reason}\n   Bởi: ${warn.moderator} - ${date}`;
      }).join("\n\n");
      const embed = new EmbedBuilder()
        .setColor(0xFFFF00)
        .setTitle(`⚠️ Danh sách cảnh cáo của ${targetUser.tag}`)
        .setDescription(warnList)
        .setFooter({ text: `Tổng: ${userWarns.length} warns` });
      await interaction.reply({ embeds: [embed] });
    }

    if (commandName === "clearwarns") {
      if (!member.permissions.has(PermissionsBitField.Flags.Administrator)) {
        return interaction.reply({ content: "Bạn không có quyền xóa warns!", ephemeral: true });
      }
      const targetUser = interaction.options.getUser("user");
      const warns = loadJSON(WARN_FILE);
      delete warns[targetUser.id];
      saveJSON(WARN_FILE, warns);
      await interaction.reply(`Đã xóa tất cả cảnh cáo của ${targetUser.tag}`);
    }

    if (commandName === "clear") {
      if (!member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
        return interaction.reply({ content: "Bạn không có quyền xóa tin nhắn!", ephemeral: true });
      }
      const amount = interaction.options.getInteger("amount");
      try {
        const messages = await channel.bulkDelete(amount, true);
        await interaction.reply({ content: `Đã xóa ${messages.size} tin nhắn!`, ephemeral: true });
      } catch (error) {
        await interaction.reply({ content: "Có lỗi khi xóa tin nhắn!", ephemeral: true });
      }
    }

    // ===== FUN COMMANDS ===== (giữ nguyên)
    if (commandName === "avatar") {
      const targetUser = interaction.options.getUser("user") || user;
      const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(`Avatar của ${targetUser.tag}`)
        .setImage(targetUser.displayAvatarURL({ dynamic: true, size: 1024 }));
      await interaction.reply({ embeds: [embed] });
    }

    if (commandName === "serverinfo") {
      const { guild } = interaction;
      const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(`Thông tin Server: ${guild.name}`)
        .setThumbnail(guild.iconURL({ dynamic: true }))
        .addFields(
          { name: "Owner", value: `<@${guild.ownerId}>`, inline: true },
          { name: "Thành viên", value: `${guild.memberCount}`, inline: true },
          { name: "Ngày tạo", value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:R>`, inline: true },
          { name: "Boost Level", value: `${guild.premiumTier}`, inline: true },
          { name: "Số Boost", value: `${guild.premiumSubscriptionCount || 0}`, inline: true },
          { name: "Roles", value: `${guild.roles.cache.size}`, inline: true }
        )
        .setFooter({ text: `Server ID: ${guild.id}` })
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    }

if (commandName === "userinfo") {
    try {
        const targetUser = interaction.options.getUser("user") || user;
        const targetMember = await interaction.guild.members.fetch(targetUser.id);

        // Lấy danh sách role (bỏ qua @everyone)
        const roles = targetMember.roles.cache
            .filter(role => role.id !== interaction.guild.id) // bỏ role @everyone
            .sort((a, b) => b.position - a.position)
            .map(role => `<@&${role.id}>`); // mention role

        // Giới hạn độ dài hiển thị (Discord giới hạn field value 1024 ký tự)
        let rolesDisplay = roles.join(', ');
        if (rolesDisplay.length > 1024) {
            rolesDisplay = roles.slice(0, 5).join(', ') + ` và ${roles.length - 5} role khác...`;
        }
        if (!rolesDisplay) rolesDisplay = 'Không có role';

        // Format thời gian tham gia chi tiết (theo kiểu Việt Nam)
        const joinDate = new Date(targetMember.joinedTimestamp).toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(`Thông tin: ${targetUser.tag}`)
            .setThumbnail(targetUser.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: "ID", value: targetUser.id, inline: true },
                { name: "Nickname", value: targetMember.nickname || "Không có", inline: true },
                { name: "Bot", value: targetUser.bot ? "Có" : "Không", inline: true },
                { name: "Tài khoản tạo", value: `<t:${Math.floor(targetUser.createdTimestamp / 1000)}:R>`, inline: true },
                { name: "Tham gia server", value: `<t:${Math.floor(targetMember.joinedTimestamp / 1000)}:R> (${joinDate})`, inline: true },
                { name: "Roles", value: rolesDisplay, inline: false }
            )
            .setFooter({ text: `User ID: ${targetUser.id}` })
            .setTimestamp();

        // Kiểm tra trạng thái interaction trước khi gửi (tránh lỗi InteractionAlreadyReplied)
        if (interaction.replied || interaction.deferred) {
            await interaction.editReply({ embeds: [embed] });
        } else {
            await interaction.reply({ embeds: [embed] });
        }
    } catch (error) {
        console.error("Lỗi trong userinfo:", error);
        const errorMsg = { content: "❌ Không thể lấy thông tin người dùng!", ephemeral: true };
        if (interaction.replied || interaction.deferred) {
            await interaction.editReply(errorMsg);
        } else {
            await interaction.reply(errorMsg);
        }
    }
}

    if (commandName === "8ball") {
      const question = interaction.options.getString("question");
      const responses = [
        "Chắc chắn rồi! ",
        "Không có nghi ngờ gì! ",
        "Có thể lắm! ",
        "Có vẻ tốt đấy! ",
        "Hỏi lại sau nhé! ",
        "Không chắc lắm... ",
        "Đừng mơ! ",
        "Không đời nào! ",
        "Câu trả lời là KHÔNG! ",
        "Triển vọng không tốt lắm... "
      ];
      const answer = responses[Math.floor(Math.random() * responses.length)];
      const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle("8ball")
        .addFields(
          { name: "Câu hỏi", value: question },
          { name: "Trả lời", value: answer }
        );
      await interaction.reply({ embeds: [embed] });
    }

    if (commandName === "coinflip") {
      const result = Math.random() < 0.5 ? "Ngửa" : "Sấp ";
      await interaction.reply(`Kết quả: **${result}**`);
    }

    if (commandName === "roll") {
      const sides = interaction.options.getInteger("sides") || 6;
      const result = Math.floor(Math.random() * sides) + 1;
      await interaction.reply(`Bạn gieo được: **${result}** (Xúc xắc ${sides} mặt)`);
    }

    if (commandName === "say") {
      const message = interaction.options.getString("message");
      await interaction.reply({ content: "Đã gửi tin nhắn!", ephemeral: true });
      await channel.send(message);
    }

    if (commandName === "poll") {
      const question = interaction.options.getString("question");
      const options = [
        interaction.options.getString("option1"),
        interaction.options.getString("option2"),
        interaction.options.getString("option3"),
        interaction.options.getString("option4")
      ].filter(opt => opt !== null);
      const emojis = ["1️⃣", "2️⃣", "3️⃣", "4️⃣"];
      const optionText = options.map((opt, i) => `${emojis[i]} ${opt}`).join("\n");
      const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle("Bình chọn")
        .setDescription(`**${question}**\n\n${optionText}`)
        .setFooter({ text: `Tạo bởi ${user.tag}` })
        .setTimestamp();
      const pollMessage = await channel.send({ embeds: [embed] });
      for (let i = 0; i < options.length; i++) {
        await pollMessage.react(emojis[i]);
      }
      await interaction.reply({ content: "Đã tạo bình chọn!", ephemeral: true });
    }

    // ===== TROLL COMMANDS =====
    if (commandName === "getadmin") {
      const hasRole = member.roles.cache.has(ADMIN_ROLE_ID);
      if (hasRole) {
        await interaction.reply("Bạn đã được cấp quyền admin!");
      } else {
        await interaction.reply("con cac du ma may");
      }
    }

    // ===== UTILITY COMMANDS =====
    if (commandName === "ping") {
      const sent = await interaction.reply({ content: "Đang ping...", fetchReply: true });
      const ping = sent.createdTimestamp - interaction.createdTimestamp;
      const apiPing = Math.round(client.ws.ping);
      const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle("Pong!")
        .addFields(
          { name: "Độ trễ Bot", value: `${ping}ms`, inline: true },
          { name: "Độ trễ API", value: `${apiPing}ms`, inline: true }
        );
      await interaction.editReply({ content: null, embeds: [embed] });
    }

    if (commandName === "help") {
      const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle("📚 Hướng dẫn Bot")
        .setDescription("Danh sách tất cả các lệnh có sẵn")
        .addFields(
          {
            name: "Lệnh Nhạc",
            value: "Ngưng hoạt động do lỗi hệ thống"
          },
          {
            name: "Lệnh Moderation",
            value: "`/kick` - Kick thành viên\n`/ban` - Ban thành viên\n`/unban` - Gỡ ban\n`/mute` - Mute thành viên\n`/unmute` - Gỡ mute\n`/warn` - Cảnh cáo\n`/warnings` - Xem warns\n`/clearwarns` - Xóa warns\n`/clear` - Xóa tin nhắn\n`/getadmin` - Yêu cầu quyền admin"
          },
          {
            name: "Lệnh Fun",
            value: "`/avatar` - Xem avatar\n`/serverinfo` - Thông tin server\n`/userinfo` - Thông tin user\n`/8ball` - Quả cầu thần kỳ\n`/coinflip` - Tung xu\n`/roll` - Gieo xúc xắc\n`/say` - Bot nói\n`/poll` - Tạo bình chọn"
          },
          {
            name: "Lệnh Tiện ích",
            value: "`/ping` - Kiểm tra ping\n`/help` - Xem hướng dẫn"
          }
        )
        .setFooter({ text: "/help" })
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    }

  } catch (error) {
    console.error(`Lỗi khi xử lý lệnh ${commandName}:`, error);
    const errorMessage = { content: "❌ Có lỗi xảy ra khi thực hiện lệnh!", ephemeral: true };
    if (interaction.deferred || interaction.replied) {
      await interaction.editReply(errorMessage);
    } else {
      await interaction.reply(errorMessage);
    }
  }
});

/* ================= CREATE FOLDERS ================= */
if (!fs.existsSync(MUSIC_FOLDER)) {
  fs.mkdirSync(MUSIC_FOLDER, { recursive: true });
  console.log(`✅ Đã tạo folder ${MUSIC_FOLDER}`);
}

/* ================= LOGIN ================= */
client.login(TOKEN);