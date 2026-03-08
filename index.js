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
  Partials
} from "discord.js";
import fs from "fs";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

/* =================================================================
   CONFIG
   Trong file .env:
     TOKEN=...
     CLIENT_ID=...
     GUILD_ID=...
     ADMIN_ROLE_ID=...
     OWNER_USER_IDS=id1,id2,id3   <-- thêm nhiều người cách nhau dấu phẩy
================================================================= */
const TOKEN         = process.env.TOKEN;
const CLIENT_ID     = process.env.CLIENT_ID;
const GUILD_ID      = process.env.GUILD_ID;
const ADMIN_ROLE_ID = process.env.ADMIN_ROLE_ID || "123456789012345678";

// Danh sách owner có quyền duyệt bot vào server
// Ưu tiên đọc từ .env, nếu không có thì dùng mảng hardcode bên dưới
const OWNER_IDS = process.env.OWNER_USER_IDS
  ? process.env.OWNER_USER_IDS.split(",").map(id => id.trim()).filter(Boolean)
  : [
      "1444578804189102221",  // <-- Thay bằng ID Discord thật của bạn
      "OWNER_ID_2",  // <-- Thêm người thứ 2 nếu muốn
    ];

const WARN_FILE    = "./warns.json";
const ALLOWED_FILE = "./allowed_guilds.json";

/* =================================================================
   VALIDATION
================================================================= */
if (!TOKEN || !CLIENT_ID || !GUILD_ID) {
  console.error("[FATAL] Thiếu TOKEN, CLIENT_ID hoặc GUILD_ID trong .env!");
  process.exit(1);
}

/* =================================================================
   CLIENT
================================================================= */
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

/* =================================================================
   STATE — lưu các guild đang chờ duyệt
   Map<guildId, { timeout, approvals: Set, rejections: Set }>
================================================================= */
const pendingGuilds = new Map();

/* =================================================================
   FILE I/O
================================================================= */
const loadJSON = (file) => {
  try {
    if (!fs.existsSync(file)) {
      fs.writeFileSync(file, "{}", "utf-8");
      return {};
    }
    const raw = fs.readFileSync(file, "utf-8").trim();
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    console.error(`[JSON] Lỗi đọc ${file}:`, err.message);
    return {};
  }
};

const saveJSON = (file, data) => {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error(`[JSON] Lỗi ghi ${file}:`, err.message);
  }
};

/* =================================================================
   HELPERS
================================================================= */
const safeReply = async (interaction, options) => {
  try {
    if (interaction.replied || interaction.deferred) {
      return await interaction.editReply(options);
    }
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

// Khởi tạo Google Gemini API
const genAI = new GoogleGenerativeAI('AIzaSyAPTGKM8Gde0_Rc9umWUzzyhV_MGEZqOBI'); // Thay bằng API key thực của bạn

// Màu sắc cho các loại thông báo
const COLORS = {
  INFO: '#3498db',    // Xanh da trời
  SUCCESS: '#2ecc71', // Xanh lá
  WARNING: '#f39c12', // Cam
  ERROR: '#e74c3c'    // Đỏ
};

// Khi bot sẵn sàng
client.once('ready', () => {
  console.log(`Bot đã đăng nhập với tên ${client.user.tag}`);
  
  // Đăng ký lệnh slash
  const guilds = client.guilds.cache.map(guild => guild.id);
  
  guilds.forEach(guildId => {
    client.application.commands.create({
      name: 'vh',
      description: 'Việt hóa file config plugin Minecraft',
      options: [
        {
          name: 'file',
          description: 'File cần việt hóa (.txt, .json, .yml, v.v...)',
          type: ApplicationCommandOptionType.Attachment,
          required: true,
        },
      ],
    }, guildId);
  });
});

// Xử lý lệnh slash
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;
  
  const { commandName } = interaction;
  
  if (commandName === 'vh') {
    await interaction.deferReply({ ephemeral: true });
    
    try {
      // Lấy file đính kèm
      const fileAttachment = interaction.options.getAttachment('file');
      
      if (!fileAttachment) {
        const errorEmbed = createEmbed(
          'Lỗi Yêu Cầu',
          'Vui lòng đính kèm một file để việt hóa.',
          COLORS.ERROR
        );
        return interaction.editReply({ embeds: [errorEmbed] });
      }
      
      // Kiểm tra định dạng file
      const fileExtension = path.extname(fileAttachment.name).toLowerCase();
      const supportedExtensions = ['.txt', '.json', '.yml', '.yaml', '.properties', '.conf'];
      
      if (!supportedExtensions.includes(fileExtension)) {
        const errorEmbed = createEmbed(
          'Định Dạng Không Hỗ Trợ',
          'Chỉ hỗ trợ file .txt, .json, .yml, .yaml, .properties, .conf',
          COLORS.ERROR
        );
        return interaction.editReply({ embeds: [errorEmbed] });
      }
      
      // Tải file
      const response = await fetch(fileAttachment.url);
      const fileContent = await response.text();
      
      // Tạo và gửi thông báo đang xử lý với animation
      const processingEmbed = createProcessingEmbed(fileAttachment.name);
      await interaction.editReply({ embeds: [processingEmbed] });
      
      // Cập nhật thông báo theo tiến trình
      let step = 0;
      const updateInterval = setInterval(async () => {
        step = (step + 1) % 4;
        const updatedEmbed = createProcessingEmbed(fileAttachment.name, step);
        await interaction.editReply({ embeds: [updatedEmbed] });
      }, 3000);
      
      // Gọi hàm việt hóa
      const vietnameseContent = await vietnameseTranslation(fileContent, fileExtension);
      
      // Dừng cập nhật thông báo
      clearInterval(updateInterval);
      
      // Tạo file mới
      const tempFilePath = path.join(__dirname, 'temp', `VH_${fileAttachment.name}`);
      fs.mkdirSync(path.join(__dirname, 'temp'), { recursive: true });
      fs.writeFileSync(tempFilePath, vietnameseContent);
      
      // Gửi file đã việt hóa
      const attachment = new AttachmentBuilder(tempFilePath, { name: `VH_${fileAttachment.name}` });
      
      try {
        // Tạo embed thông báo hoàn thành để gửi qua DM
        const dmSuccessEmbed = createEmbed(
          '🎉 Việt Hóa Hoàn Tất!',
          `File \`${fileAttachment.name}\` đã được việt hóa thành công.\nFile đính kèm bên dưới là phiên bản Tiếng Việt.`,
          COLORS.SUCCESS,
          {
            name: interaction.user.username,
            iconURL: interaction.user.displayAvatarURL()
          },
          [
            {
              name: 'Tên File Gốc',
              value: fileAttachment.name,
              inline: true
            },
            {
              name: 'Tên File Việt Hóa',
              value: `VH_${fileAttachment.name}`,
              inline: true
            },
            {
              name: 'Định Dạng',
              value: fileExtension,
              inline: true
            }
          ]
        );
        
        // Gửi file đã việt hóa qua tin nhắn riêng
        await interaction.user.send({
          embeds: [dmSuccessEmbed],
          files: [attachment]
        });
        
        // Tạo embed thông báo thành công trong kênh
        const channelSuccessEmbed = createEmbed(
          '✅ Hoàn Tất Việt Hóa',
          `File \`${fileAttachment.name}\` đã được việt hóa thành công và gửi đến tin nhắn riêng của bạn.`,
          COLORS.SUCCESS,
          {
            name: client.user.username,
            iconURL: client.user.displayAvatarURL()
          }
        );
        
        // Cập nhật thông báo trong kênh
        await interaction.editReply({ embeds: [channelSuccessEmbed] });
        
        // Xóa file tạm
        fs.unlinkSync(tempFilePath);
      } catch (error) {
        console.error('Lỗi khi gửi DM:', error);
        
        // Tạo embed thông báo lỗi DM
        const dmErrorEmbed = createEmbed(
          '⚠️ Không Thể Gửi Tin Nhắn Riêng',
          'Không thể gửi tin nhắn riêng. Vui lòng kiểm tra cài đặt quyền riêng tư của bạn và đảm bảo bạn cho phép nhận tin nhắn từ thành viên máy chủ.',
          COLORS.WARNING
        );
        
        await interaction.editReply({ embeds: [dmErrorEmbed] });
      }
      
    } catch (error) {
      console.error('Lỗi khi xử lý lệnh:', error);
      
      // Tạo embed thông báo lỗi
      const errorEmbed = createEmbed(
        '❌ Đã Xảy Ra Lỗi',
        'Đã xảy ra lỗi khi xử lý lệnh. Vui lòng thử lại sau.',
        COLORS.ERROR
      );
      
      await interaction.editReply({ embeds: [errorEmbed] });
    }
  }
});

/**
 * Tạo embed với các thông tin cơ bản
 * @param {string} title - Tiêu đề embed
 * @param {string} description - Mô tả embed
 * @param {string} color - Mã màu hex
 * @param {Object} author - Thông tin người tạo (tùy chọn)
 * @param {Array} fields - Các trường bổ sung (tùy chọn)
 * @return {EmbedBuilder} - Discord embed
 */
function createEmbed(title, description, color, author = null, fields = []) {
  const embed = new EmbedBuilder()
    .setTitle(title)
    .setDescription(description)
    .setColor(color)
    .setTimestamp();
  
  if (author) {
    embed.setAuthor({ name: author.name, iconURL: author.iconURL });
  }
  
  if (fields.length > 0) {
    embed.addFields(fields);
  }
  
  return embed;
}

/**
 * Tạo embed hiển thị quá trình xử lý với animation
 * @param {string} fileName - Tên file đang xử lý
 * @param {number} step - Bước hiện tại của animation (0-3)
 * @return {EmbedBuilder} - Discord embed
 */
function createProcessingEmbed(fileName, step = 0) {
  const animations = [
    '⏳ Đang Việt Hóa',
    '⌛ Đang Việt Hóa.',
    '⏳ Đang Việt Hóa..',
    '⌛ Đang Việt Hóa...'
  ];
  
  const progressStages = [
    'Đang phân tích cấu trúc file...',
    'Đang xử lý nội dung...',
    'Đang dịch văn bản...',
    'Đang hoàn thiện file...'
  ];
  
  const embed = new EmbedBuilder()
    .setTitle(animations[step])
    .setDescription(`Đang xử lý file \`${fileName}\`. Quá trình này có thể mất một chút thời gian...`)
    .setColor(COLORS.INFO)
    .addFields(
      { name: 'Trạng Thái', value: progressStages[step], inline: true },
      { name: 'File', value: fileName, inline: true }
    )
    .setFooter({ text: 'Vui lòng đợi trong giây lát...' })
    .setTimestamp();
  
  return embed;
}

/**
 * Hàm dịch file từ tiếng Anh sang tiếng Việt
 * @param {string} content - Nội dung file cần dịch
 * @param {string} fileExtension - Phần mở rộng của file
 * @return {Promise<string>} - Nội dung đã được dịch
 */
async function vietnameseTranslation(content, fileExtension) {
  try {
    let promptTemplate = '';
    
    switch (fileExtension) {
      case '.json':
        promptTemplate = `Hãy dịch file JSON này từ tiếng Anh sang tiếng Việt. 
        Chỉ dịch các giá trị văn bản, không dịch các khóa (keys), mã code, hằng số, biến, đường dẫn, v.v. 
        Giữ nguyên cấu trúc JSON và định dạng. 
        Nội dung cần dịch: ${content}`;
        break;
      
      case '.yml':
      case '.yaml':
        promptTemplate = `Hãy dịch file YAML này từ tiếng Anh sang tiếng Việt. 
        Chỉ dịch các giá trị văn bản, không dịch các khóa (keys), mã code, hằng số, biến, đường dẫn, v.v.
        Giữ nguyên cấu trúc YAML và định dạng.
        Nội dung cần dịch: ${content}`;
        break;
        
      case '.properties':
        promptTemplate = `Hãy dịch file properties này từ tiếng Anh sang tiếng Việt.
        Chỉ dịch phần giá trị nằm sau dấu bằng (=), không dịch các khóa và giữ nguyên định dạng.
        Nội dung cần dịch: ${content}`;
        break;
        
      default:
        promptTemplate = `Hãy dịch file này từ tiếng Anh sang tiếng Việt.
        Không dịch mã code, tên hàm, biến, đường dẫn hoặc bất kỳ chuỗi nào có vẻ như là lệnh hoặc cấu trúc phần mềm.
        Nội dung cần dịch: ${content}`;
    }
    
    // Khởi tạo mô hình Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const result = await model.generateContent(promptTemplate);
    const translatedContent = result.response.text();
    
    return translatedContent;
  } catch (error) {
    console.error('Lỗi khi dịch:', error);
    throw new Error('Không thể dịch nội dung. Vui lòng thử lại sau.');
  }
}

/* =================================================================
   2FA ANTI-RAID — guildCreate
   Gửi DM cho TẤT CẢ owner trong OWNER_IDS.
   Ai bấm trước sẽ quyết định (approve/reject).
================================================================= */
client.on("guildCreate", async (guild) => {
  const allowedGuilds = loadJSON(ALLOWED_FILE);
  if (allowedGuilds[guild.id]) {
    console.log(`[ANTI-RAID] Guild đã được duyệt: "${guild.name}"`);
    return;
  }

  console.log(`[ANTI-RAID] Bot vào guild mới: "${guild.name}" (${guild.id})`);

  // Lấy người thêm bot qua Audit Log
  let invitedBy = "Không rõ";
  try {
    const logs = await guild.fetchAuditLogs({ type: 28, limit: 5 });
    const entry = logs.entries.find((e) => e.target?.id === CLIENT_ID);
    if (entry?.executor) {
      invitedBy = `${entry.executor.tag} (${entry.executor.id})`;
    }
  } catch {
    console.warn(`[ANTI-RAID] Không lấy được audit log của "${guild.name}"`);
  }

  // Embed thông báo
  const embed = new EmbedBuilder()
    .setColor(0xff6600)
    .setTitle("⚠️ Bot được mời vào Server mới!")
    .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 256 }))
    .addFields(
      { name: "🤖 Bot",        value: client.user.tag,           inline: true },
      { name: "🆔 Bot ID",     value: client.user.id,            inline: true },
      { name: "\u200B",        value: "\u200B",                  inline: false },
      { name: "🏠 Server",     value: guild.name,                inline: true },
      { name: "🆔 Server ID",  value: guild.id,                  inline: true },
      { name: "👥 Thành viên", value: `${guild.memberCount}`,    inline: true },
      { name: "📨 Thêm bởi",   value: invitedBy,                 inline: false }
    )
    .setFooter({ text: "⏳ Tự động từ chối sau 5 phút nếu không ai phản hồi." })
    .setTimestamp();

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

  // Gửi DM cho tất cả owner
  let dmSent = 0;
  console.log(`[ANTI-RAID] Đang gửi DM cho ${OWNER_IDS.length} owner: ${OWNER_IDS.join(", ")}`);
  for (const ownerId of OWNER_IDS) {
    try {
      // fetch({ force: true }) đảm bảo lấy user mới nhất từ API
      const ownerUser = await client.users.fetch(ownerId, { force: true });
      // createDM() mở kênh DM trước, tránh lỗi "Cannot send messages to this user"
      const dmChannel = await ownerUser.createDM();
      await dmChannel.send({ embeds: [embed], components: [row] });
      dmSent++;
      console.log(`[ANTI-RAID] ✅ Đã gửi DM → ${ownerUser.tag} (${ownerId})`);
    } catch (err) {
      console.error(`[ANTI-RAID] ❌ Không gửi được DM cho owner ${ownerId}: ${err.message}`);
    }
  }

  // Nếu không gửi được DM nào → rời luôn cho an toàn
  if (dmSent === 0) {
    console.error("[ANTI-RAID] Không liên hệ được owner nào. Tự rời guild.");
    await safeLeave(guild, "Không liên hệ được owner");
    return;
  }

  // Đăng ký state chờ duyệt
  pendingGuilds.set(guild.id, {
    approvals:  new Set(),
    rejections: new Set(),
    timeout: setTimeout(async () => {
      const allowed = loadJSON(ALLOWED_FILE);
      if (!allowed[guild.id]) {
        console.log(`[ANTI-RAID] Timeout 5 phút — tự rời "${guild.name}"`);
        pendingGuilds.delete(guild.id);
        await safeLeave(guild, "Timeout 5 phút không có phản hồi");
      }
    }, 5 * 60 * 1000),
  });
});

/* =================================================================
   INTERACTION HANDLER
================================================================= */
client.on("interactionCreate", async (interaction) => {

  /* ---------------------------------------------------------------
     BUTTON — Anti-Raid approve/reject
  --------------------------------------------------------------- */
  if (interaction.isButton()) {
    const customId = interaction.customId;

    // Chỉ xử lý button approve_ và reject_
    if (!customId.startsWith("approve_") && !customId.startsWith("reject_")) return;

    const [action, guildId] = customId.split("_");
    const userId = interaction.user.id;

    // Kiểm tra quyền — chỉ owner trong danh sách
    if (!OWNER_IDS.includes(userId)) {
      return interaction.reply({
        content: "❌ Bạn không có quyền thực hiện hành động này!",
        flags: 64,
      });
    }

    const pending = pendingGuilds.get(guildId);
    const allowedGuilds = loadJSON(ALLOWED_FILE);

    // Đã được xử lý rồi (timeout hoặc owner khác bấm trước)
    if (allowedGuilds[guildId]) {
      return interaction.reply({
        content: "✅ Server này đã được duyệt trước đó rồi!",
        flags: 64,
      });
    }
    if (!pending && !allowedGuilds[guildId]) {
      // Có thể đã bị reject/timeout
      return interaction.reply({
        content: "⚠️ Yêu cầu này đã hết hạn hoặc đã xử lý.",
        flags: 64,
      });
    }

    const guild = client.guilds.cache.get(guildId);
    const guildName = guild ? guild.name : `ID: ${guildId}`;

    if (action === "approve") {
      // Lưu duyệt
      allowedGuilds[guildId] = { approvedAt: Date.now(), approvedBy: interaction.user.tag };
      saveJSON(ALLOWED_FILE, allowedGuilds);

      // Hủy timeout
      if (pending) {
        clearTimeout(pending.timeout);
        pendingGuilds.delete(guildId);
      }

      // Cập nhật tin nhắn DM của người bấm
      try {
        await interaction.update({
          embeds: [
            new EmbedBuilder()
              .setColor(0x00ff00)
              .setTitle("✅ Đã Duyệt!")
              .setDescription(`Bot được phép hoạt động tại **${guildName}**.\nDuyệt bởi: ${interaction.user.tag}`)
              .setTimestamp(),
          ],
          components: [],
        });
      } catch {
        await interaction.reply({ content: `✅ Đã duyệt **${guildName}**!`, flags: 64 });
      }

      // Thông báo cho các owner còn lại
      for (const ownerId of OWNER_IDS) {
        if (ownerId === userId) continue;
        try {
          const other = await client.users.fetch(ownerId, { force: true });
          const otherDM = await other.createDM();
          await otherDM.send({
            embeds: [
              new EmbedBuilder()
                .setColor(0x00ff00)
                .setTitle("✅ Server đã được duyệt")
                .setDescription(`**${guildName}** đã được **${interaction.user.tag}** duyệt.`)
                .setTimestamp(),
            ],
          });
        } catch { /* ignore */ }
      }

      console.log(`[ANTI-RAID] DUYỆT "${guildName}" bởi ${interaction.user.tag}`);

    } else if (action === "reject") {
      // Hủy timeout
      if (pending) {
        clearTimeout(pending.timeout);
        pendingGuilds.delete(guildId);
      }

      // Cập nhật tin nhắn DM của người bấm
      try {
        await interaction.update({
          embeds: [
            new EmbedBuilder()
              .setColor(0xff0000)
              .setTitle("❌ Đã Từ Chối!")
              .setDescription(`Bot đã rời **${guildName}**.\nTừ chối bởi: ${interaction.user.tag}`)
              .setTimestamp(),
          ],
          components: [],
        });
      } catch {
        await interaction.reply({ content: `❌ Đã từ chối **${guildName}**!`, flags: 64 });
      }

      // Thông báo cho các owner còn lại
      for (const ownerId of OWNER_IDS) {
        if (ownerId === userId) continue;
        try {
          const other = await client.users.fetch(ownerId, { force: true });
          const otherDM = await other.createDM();
          await otherDM.send({
            embeds: [
              new EmbedBuilder()
                .setColor(0xff0000)
                .setTitle("❌ Server đã bị từ chối")
                .setDescription(`**${guildName}** đã bị **${interaction.user.tag}** từ chối. Bot đã rời server.`)
                .setTimestamp(),
            ],
          });
        } catch { /* ignore */ }
      }

      if (guild) await safeLeave(guild, `Bị từ chối bởi ${interaction.user.tag}`);
      console.log(`[ANTI-RAID] TỪ CHỐI "${guildName}" bởi ${interaction.user.tag}`);
    }

    return;
  }

  /* ---------------------------------------------------------------
     SLASH COMMANDS
  --------------------------------------------------------------- */
  if (!interaction.isChatInputCommand()) return;

  const commandName = interaction.commandName;
  const { user, member, channel, guild } = interaction;

  try {

    /* ---- MODERATION ---- */
    if (commandName === "kick") {
      if (!member.permissions.has(PermissionsBitField.Flags.KickMembers))
        return safeReply(interaction, { content: "❌ Bạn không có quyền kick!", flags: 64 });

      const target = interaction.options.getMember("user");
      const reason = interaction.options.getString("reason") || "Không có lý do";
      if (!target?.kickable)
        return safeReply(interaction, { content: "❌ Không thể kick người này!", flags: 64 });

      await target.kick(reason);
      await safeReply(interaction, { content: `✅ Đã kick **${target.user.tag}**\nLý do: ${reason}` });
    }

    else if (commandName === "ban") {
      if (!member.permissions.has(PermissionsBitField.Flags.BanMembers))
        return safeReply(interaction, { content: "❌ Bạn không có quyền ban!", flags: 64 });

      const target = interaction.options.getMember("user");
      const reason = interaction.options.getString("reason") || "Không có lý do";
      if (!target?.bannable)
        return safeReply(interaction, { content: "❌ Không thể ban người này!", flags: 64 });

      await target.ban({ reason });
      await safeReply(interaction, { content: `✅ Đã ban **${target.user.tag}**\nLý do: ${reason}` });
    }

    else if (commandName === "unban") {
      if (!member.permissions.has(PermissionsBitField.Flags.BanMembers))
        return safeReply(interaction, { content: "❌ Bạn không có quyền unban!", flags: 64 });

      const userId = interaction.options.getString("userid");
      try {
        await guild.members.unban(userId);
        await safeReply(interaction, { content: `✅ Đã gỡ ban cho ID: \`${userId}\`` });
      } catch {
        await safeReply(interaction, { content: "❌ Không tìm thấy user trong danh sách ban!", flags: 64 });
      }
    }

    else if (commandName === "mute") {
      if (!member.permissions.has(PermissionsBitField.Flags.ModerateMembers))
        return safeReply(interaction, { content: "❌ Bạn không có quyền mute!", flags: 64 });

      const target = interaction.options.getMember("user");
      const duration = interaction.options.getInteger("duration");
      const reason = interaction.options.getString("reason") || "Không có lý do";
      if (!target?.moderatable)
        return safeReply(interaction, { content: "❌ Không thể mute người này!", flags: 64 });

      await target.timeout(duration * 60 * 1000, reason);
      await safeReply(interaction, { content: `✅ Đã mute **${target.user.tag}** trong ${duration} phút\nLý do: ${reason}` });
    }

    else if (commandName === "unmute") {
      if (!member.permissions.has(PermissionsBitField.Flags.ModerateMembers))
        return safeReply(interaction, { content: "❌ Bạn không có quyền unmute!", flags: 64 });

      const target = interaction.options.getMember("user");
      if (!target?.moderatable)
        return safeReply(interaction, { content: "❌ Không thể unmute người này!", flags: 64 });

      await target.timeout(null);
      await safeReply(interaction, { content: `✅ Đã gỡ mute cho **${target.user.tag}**` });
    }

    else if (commandName === "warn") {
      if (!member.permissions.has(PermissionsBitField.Flags.ModerateMembers))
        return safeReply(interaction, { content: "❌ Bạn không có quyền cảnh cáo!", flags: 64 });

      const targetUser = interaction.options.getUser("user");
      const reason = interaction.options.getString("reason");
      const warns = loadJSON(WARN_FILE);
      if (!warns[targetUser.id]) warns[targetUser.id] = [];
      warns[targetUser.id].push({ reason, moderator: user.tag, timestamp: Date.now() });
      saveJSON(WARN_FILE, warns);

      await safeReply(interaction, {
        content: `⚠️ Đã cảnh cáo **${targetUser.tag}**\nLý do: ${reason}\nTổng warns: **${warns[targetUser.id].length}**`,
      });
    }

    else if (commandName === "warnings") {
      const targetUser = interaction.options.getUser("user");
      const warns = loadJSON(WARN_FILE);
      const userWarns = warns[targetUser.id];
      if (!userWarns?.length)
        return safeReply(interaction, { content: `✅ **${targetUser.tag}** chưa có cảnh cáo nào!`, flags: 64 });

      const list = userWarns
        .map((w, i) => `**${i + 1}.** ${w.reason}\n   Bởi: ${w.moderator} — ${new Date(w.timestamp).toLocaleString("vi-VN")}`)
        .join("\n\n");

      await safeReply(interaction, {
        embeds: [
          new EmbedBuilder()
            .setColor(0xffff00)
            .setTitle(`⚠️ Cảnh cáo của ${targetUser.tag}`)
            .setDescription(list)
            .setFooter({ text: `Tổng: ${userWarns.length} warns` }),
        ],
      });
    }

    else if (commandName === "clearwarns") {
      if (!member.permissions.has(PermissionsBitField.Flags.Administrator))
        return safeReply(interaction, { content: "❌ Bạn không có quyền xóa warns!", flags: 64 });

      const targetUser = interaction.options.getUser("user");
      const warns = loadJSON(WARN_FILE);
      delete warns[targetUser.id];
      saveJSON(WARN_FILE, warns);
      await safeReply(interaction, { content: `✅ Đã xóa tất cả cảnh cáo của **${targetUser.tag}**` });
    }

    else if (commandName === "clear") {
      if (!member.permissions.has(PermissionsBitField.Flags.ManageMessages))
        return safeReply(interaction, { content: "❌ Bạn không có quyền xóa tin nhắn!", flags: 64 });

      const amount = interaction.options.getInteger("amount");
      try {
        const deleted = await channel.bulkDelete(amount, true);
        await safeReply(interaction, { content: `✅ Đã xóa **${deleted.size}** tin nhắn!`, flags: 64 });
      } catch {
        await safeReply(interaction, { content: "❌ Không thể xóa tin nhắn (có thể quá cũ hoặc lỗi quyền)!", flags: 64 });
      }
    }

    /* ---- FUN ---- */
    else if (commandName === "avatar") {
      const targetUser = interaction.options.getUser("user") || user;
      await safeReply(interaction, {
        embeds: [
          new EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle(`🖼️ Avatar của ${targetUser.tag}`)
            .setImage(targetUser.displayAvatarURL({ dynamic: true, size: 1024 })),
        ],
      });
    }

    else if (commandName === "serverinfo") {
      await safeReply(interaction, {
        embeds: [
          new EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle(`🏠 ${guild.name}`)
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .addFields(
              { name: "👑 Owner",        value: `<@${guild.ownerId}>`,   inline: true },
              { name: "👥 Thành viên",   value: `${guild.memberCount}`,  inline: true },
              { name: "📅 Ngày tạo",     value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:R>`, inline: true },
              { name: "✨ Boost Level",  value: `${guild.premiumTier}`,  inline: true },
              { name: "💎 Số Boost",     value: `${guild.premiumSubscriptionCount || 0}`, inline: true },
              { name: "🎭 Roles",        value: `${guild.roles.cache.size}`, inline: true }
            )
            .setFooter({ text: `Server ID: ${guild.id}` })
            .setTimestamp(),
        ],
      });
    }

    else if (commandName === "userinfo") {
      const targetUser = interaction.options.getUser("user") || user;
      const targetMember = await guild.members.fetch(targetUser.id).catch(() => null);
      if (!targetMember)
        return safeReply(interaction, { content: "❌ Không tìm thấy thành viên này!", flags: 64 });

      const roles = targetMember.roles.cache
        .filter((r) => r.id !== guild.id)
        .sort((a, b) => b.position - a.position)
        .map((r) => `<@&${r.id}>`);

      let rolesDisplay = roles.join(", ") || "Không có role";
      if (rolesDisplay.length > 1024)
        rolesDisplay = roles.slice(0, 5).join(", ") + ` và ${roles.length - 5} role khác...`;

      await safeReply(interaction, {
        embeds: [
          new EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle(`👤 ${targetUser.tag}`)
            .setThumbnail(targetUser.displayAvatarURL({ dynamic: true }))
            .addFields(
              { name: "🆔 ID",          value: targetUser.id,           inline: true },
              { name: "📛 Nickname",     value: targetMember.nickname || "Không có", inline: true },
              { name: "🤖 Bot",          value: targetUser.bot ? "Có" : "Không", inline: true },
              { name: "📅 Tạo lúc",      value: `<t:${Math.floor(targetUser.createdTimestamp / 1000)}:R>`, inline: true },
              { name: "📥 Vào server",   value: `<t:${Math.floor(targetMember.joinedTimestamp / 1000)}:R>`, inline: true },
              { name: "🎭 Roles",        value: rolesDisplay, inline: false }
            )
            .setFooter({ text: `User ID: ${targetUser.id}` })
            .setTimestamp(),
        ],
      });
    }

    else if (commandName === "8ball") {
      const question = interaction.options.getString("question");
      const answers = [
        "✅ Chắc chắn rồi!", "✅ Không có nghi ngờ gì!", "✅ Có thể lắm!",
        "🟡 Có vẻ tốt đấy!", "🟡 Hỏi lại sau nhé!", "🟡 Khó nói...",
        "❌ Không chắc lắm...", "❌ Đừng mơ!", "❌ Không đời nào!",
        "❌ Triển vọng không tốt...",
      ];
      const answer = answers[Math.floor(Math.random() * answers.length)];
      await safeReply(interaction, {
        embeds: [
          new EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle("🎱 Magic 8-Ball")
            .addFields(
              { name: "❓ Câu hỏi", value: question },
              { name: "💬 Trả lời", value: answer }
            ),
        ],
      });
    }

    else if (commandName === "coinflip") {
      await safeReply(interaction, {
        content: `Kết quả: **${Math.random() < 0.5 ? "🌕 Ngửa" : "🌑 Sấp"}**`,
      });
    }

    else if (commandName === "roll") {
      const sides = interaction.options.getInteger("sides") || 6;
      const result = Math.floor(Math.random() * sides) + 1;
      await safeReply(interaction, { content: `🎲 Bạn gieo được: **${result}** / ${sides}` });
    }

    else if (commandName === "say") {
      const message = interaction.options.getString("message");
      await safeReply(interaction, { content: "✅ Đã gửi!", flags: 64 });
      await channel.send(message);
    }

    else if (commandName === "poll") {
      const question = interaction.options.getString("question");
      const options = [
        interaction.options.getString("option1"),
        interaction.options.getString("option2"),
        interaction.options.getString("option3"),
        interaction.options.getString("option4"),
      ].filter(Boolean);

      const emojis = ["1️⃣", "2️⃣", "3️⃣", "4️⃣"];
      const pollMsg = await channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle("📊 Bình chọn")
            .setDescription(`**${question}**\n\n${options.map((o, i) => `${emojis[i]} ${o}`).join("\n")}`)
            .setFooter({ text: `Tạo bởi ${user.tag}` })
            .setTimestamp(),
        ],
      });
      for (let i = 0; i < options.length; i++) await pollMsg.react(emojis[i]);
      await safeReply(interaction, { content: "✅ Đã tạo bình chọn!", flags: 64 });
    }

    /* ---- TROLL ---- */
    else if (commandName === "getadmin") {
      await safeReply(interaction, {
        content: member.roles.cache.has(ADMIN_ROLE_ID)
          ? "✅ Bạn đã được cấp quyền admin!"
          : "❌ con cac du ma may",
      });
    }

    /* ---- UTILITY ---- */
    else if (commandName === "ping") {
      const start = Date.now();
      const { resource: sent } = await interaction.reply({ content: "🏓 Đang ping...", withResponse: true });
      const ping = Date.now() - start;
      await interaction.editReply({
        content: null,
        embeds: [
          new EmbedBuilder()
            .setColor(ping < 100 ? 0x00ff00 : ping < 200 ? 0xffff00 : 0xff0000)
            .setTitle("🏓 Pong!")
            .addFields(
              { name: "📡 Bot",  value: `${ping}ms`,                      inline: true },
              { name: "🌐 API",  value: `${Math.round(client.ws.ping)}ms`, inline: true }
            ),
        ],
      });
    }

    else if (commandName === "help") {
      await safeReply(interaction, {
        embeds: [
          new EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle("📚 Hướng dẫn Bot")
            .addFields(
              { name: "🛡️ Moderation", value: "`/kick` `/ban` `/unban` `/mute` `/unmute` `/warn` `/warnings` `/clearwarns` `/clear` `/getadmin`" },
              { name: "🎉 Fun",        value: "`/avatar` `/serverinfo` `/userinfo` `/8ball` `/coinflip` `/roll` `/say` `/poll`" },
              { name: "🔧 Tiện ích",   value: "`/ping` `/help`" }
            )
            .setFooter({ text: "Dùng / để gõ lệnh" })
            .setTimestamp(),
        ],
      });
    }

  } catch (error) {
    console.error(`[ERROR] /${commandName}:`, error);
    await safeReply(interaction, { content: "❌ Có lỗi xảy ra khi thực hiện lệnh!", flags: 64 });
  }
});

/* =================================================================
   ANTI CLONE — kick tài khoản mới dưới 3 ngày
================================================================= */
client.on("guildMemberAdd", async (member) => {
  const age = Date.now() - member.user.createdTimestamp;
  if (age < 3 * 24 * 60 * 60 * 1000) {
    try {
      await member.kick("Anti-Clone: Tài khoản quá mới");
      console.log(`[ANTI-CLONE] Kicked ${member.user.tag} (${Math.floor(age / 86400000)} ngày tuổi)`);
    } catch (err) {
      console.error(`[ANTI-CLONE] Không thể kick ${member.user.tag}:`, err.message);
    }
  }
});

/* =================================================================
   MESSAGE LOGGER
================================================================= */
client.on("messageCreate", (msg) => {
  if (!msg.guild || msg.author.bot) return;
  console.log(`[${msg.guild.name}] ${msg.author.tag}: ${msg.content}`);
});

/* =================================================================
   READY — đăng ký slash commands
================================================================= */
client.once("ready", async () => {
  console.log(`✅ BOT ONLINE — ${client.user.tag}`);
  console.log(`✅ Danh sách owner (${OWNER_IDS.length}): ${OWNER_IDS.join(", ")}`);
  client.user.setActivity("/help để xem lệnh", { type: ActivityType.Playing });

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
    new SlashCommandBuilder().setName("help").setDescription("Xem hướng dẫn"),
  ];

  try {
    const rest = new REST({ version: "10" }).setToken(TOKEN);
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands });
    console.log("✅ Đã đăng ký slash commands!");
  } catch (err) {
    console.error("❌ Lỗi đăng ký commands:", err);
  }
});

/* =================================================================
   GLOBAL ERROR HANDLERS — tránh crash toàn bộ bot
================================================================= */
process.on("unhandledRejection", (err) => {
  console.error("[unhandledRejection]", err);
});
process.on("uncaughtException", (err) => {
  console.error("[uncaughtException]", err);
});

/* =================================================================
   LOGIN
================================================================= */
client.login(TOKEN);
