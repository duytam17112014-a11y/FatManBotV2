/* Obfuscated by J2TEAM.org */
const _0x533b3f = _0x456e;
(function(_0x41d99e, _0x17159c) {
  const _0xd4e61a = _0x456e,
    _0x3f013a = _0x41d99e();
  while (!![]) {
    try {
      const _0x59ee90 = -parseInt(_0xd4e61a(0x3d5)) / 0x1 + -parseInt(_0xd4e61a(0x252)) / 0x2 + parseInt(_0xd4e61a(0x3ad)) / 0x3 + parseInt(_0xd4e61a(0x28d)) / 0x4 + parseInt(_0xd4e61a(0x21a)) / 0x5 * (parseInt(_0xd4e61a(0x219)) / 0x6) + -parseInt(_0xd4e61a(0x16e)) / 0x7 * (parseInt(_0xd4e61a(0x1b0)) / 0x8) + parseInt(_0xd4e61a(0x23a)) / 0x9;
      if (_0x59ee90 === _0x17159c) break;
      else _0x3f013a['push'](_0x3f013a['shift']());
    } catch (_0x42b462) {
      _0x3f013a['push'](_0x3f013a['shift']());
    }
  }
}(_0x5143, 0xcfdd2));
const _0x3b7e32 = (function() {
  let _0x374b71 = !![];
  return function(_0x1ab0de, _0x5f4e97) {
    const _0x56e97a = _0x374b71 ? function() {
      const _0x44b92b = _0x456e;
      if (_0x5f4e97) {
        const _0x382b45 = _0x5f4e97[_0x44b92b(0x2a0)](_0x1ab0de, arguments);
        return _0x5f4e97 = null, _0x382b45;
      }
    } : function() {};
    return _0x374b71 = ![], _0x56e97a;
  };
}());
(function() {
  _0x3b7e32(this, function() {
    const _0x5444dd = _0x456e,
      _0x526fa0 = new RegExp(_0x5444dd(0x3fc) + _0x5444dd(0x147)),
      _0x459c47 = new RegExp(_0x5444dd(0x320) + _0x5444dd(0x1fb) + _0x5444dd(0x1d6) + _0x5444dd(0x3f6), 'i'),
      _0x1ccaca = _0x144301(_0x5444dd(0x2ea));
    !_0x526fa0[_0x5444dd(0x376)](_0x1ccaca + _0x5444dd(0x26e)) || !_0x459c47['test'](_0x1ccaca + _0x5444dd(0x1c3)) ? _0x1ccaca('0') : _0x144301();
  })();
}());

function _0x456e(_0x435145, _0x185022) {
  _0x435145 = _0x435145 - 0x136;
  const _0x5a839a = _0x5143();
  let _0x144301 = _0x5a839a[_0x435145];
  if (_0x456e['NnGJpo'] === undefined) {
    var _0x3b7e32 = function(_0x4f4070) {
      const _0x144bdc = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';
      let _0x4acfcd = '',
        _0x3fb34f = '';
      for (let _0x3fd49b = 0x0, _0x5a0996, _0x16157a, _0x374b71 = 0x0; _0x16157a = _0x4f4070['charAt'](_0x374b71++); ~_0x16157a && (_0x5a0996 = _0x3fd49b % 0x4 ? _0x5a0996 * 0x40 + _0x16157a : _0x16157a, _0x3fd49b++ % 0x4) ? _0x4acfcd += String['fromCharCode'](0xff & _0x5a0996 >> (-0x2 * _0x3fd49b & 0x6)) : 0x0) {
        _0x16157a = _0x144bdc['indexOf'](_0x16157a);
      }
      for (let _0x1ab0de = 0x0, _0x5f4e97 = _0x4acfcd['length']; _0x1ab0de < _0x5f4e97; _0x1ab0de++) {
        _0x3fb34f += '%' + ('00' + _0x4acfcd['charCodeAt'](_0x1ab0de)['toString'](0x10))['slice'](-0x2);
      }
      return decodeURIComponent(_0x3fb34f);
    };
    _0x456e['pfTINe'] = _0x3b7e32, _0x456e['GgPFuI'] = {}, _0x456e['NnGJpo'] = !![];
  }
  const _0x5143a9 = _0x5a839a[0x0],
    _0x456e4c = _0x435145 + _0x5143a9,
    _0x59fc3e = _0x456e['GgPFuI'][_0x456e4c];
  return !_0x59fc3e ? (_0x144301 = _0x456e['pfTINe'](_0x144301), _0x456e['GgPFuI'][_0x456e4c] = _0x144301) : _0x144301 = _0x59fc3e, _0x144301;
}
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
  Partials
} from 'discord.js';
import _0x5a0996 from 'fs';
import _0x16157a from 'dotenv';
import {
  GoogleGenerativeAI
} from '@google/generative-ai';
_0x16157a[_0x533b3f(0x39f)]();
const TOKEN = process.env.TOKEN,
  CLIENT_ID = process.env.CLIENT_ID,
  GUILD_ID = process.env.GUILD_ID,
  ADMIN_ROLE_ID = process.env.ADMIN_ROLE_ID || _0x533b3f(0x355) + '12345678',
  OWNER_IDS = process.env.OWNER_USER_IDS ? process.env.OWNER_USER_IDS['split'](',')[_0x533b3f(0x266)](_0x399380 => _0x399380[_0x533b3f(0x3c9)]())[_0x533b3f(0x3a7)](Boolean) : [_0x533b3f(0x1a1) + _0x533b3f(0x365)],
  WARN_FILE = _0x533b3f(0x222) + 'on',
  ALLOWED_FILE = _0x533b3f(0x347) + 'guilds.jso' + 'n';
(!TOKEN || TOKEN === _0x533b3f(0x1c2) + _0x533b3f(0x1e2) + _0x533b3f(0x380) + _0x533b3f(0x151) + 'MBSIhH-6Bk' + 'yyTzhaj1Ve' + _0x533b3f(0x27e) + 'y0') && (console[_0x533b3f(0x3a8)](_0x533b3f(0x32d) + _0x533b3f(0x32d) + _0x533b3f(0x32d) + _0x533b3f(0x32d) + '======'), console['error']('[FATAL]\x20TO' + _0x533b3f(0x352) + _0x533b3f(0x230) + 'c\x20chưa\x20đượ' + _0x533b3f(0x2a4)), console[_0x533b3f(0x3a8)](_0x533b3f(0x384) + _0x533b3f(0x246) + _0x533b3f(0x3f5) + _0x533b3f(0x3c7) + _0x533b3f(0x1c4)), console[_0x533b3f(0x3a8)](_0x533b3f(0x330) + _0x533b3f(0x3db) + _0x533b3f(0x232) + _0x533b3f(0x212) + _0x533b3f(0x324) + _0x533b3f(0x220)), console[_0x533b3f(0x3a8)]('==========' + _0x533b3f(0x32d) + _0x533b3f(0x32d) + _0x533b3f(0x32d) + '======'), process['exit'](0x1));
(!CLIENT_ID || !GUILD_ID) && (console[_0x533b3f(0x3a8)](_0x533b3f(0x1ef) + _0x533b3f(0x160) + '_ID\x20hoặc\x20G' + _0x533b3f(0x1e1) + _0x533b3f(0x158)), process[_0x533b3f(0x26c)](0x1));
const client = new Client({
    'intents': [GatewayIntentBits[_0x533b3f(0x1cb)], GatewayIntentBits[_0x533b3f(0x241) + _0x533b3f(0x379)], GatewayIntentBits[_0x533b3f(0x3ff) + 'tent'], GatewayIntentBits[_0x533b3f(0x1ca) + 'rs'], GatewayIntentBits[_0x533b3f(0x3e2) + _0x533b3f(0x1dc)], GatewayIntentBits['DirectMess' + _0x533b3f(0x359)]],
    'partials': [Partials[_0x533b3f(0x1bd)], Partials['Message'], Partials[_0x533b3f(0x36d)]]
  }),
  pendingGuilds = new Map(),
  userTokens = new Map(),
  awaitingToken = new Map(),
  COLORS = {
    'INFO': '#3498db',
    'SUCCESS': _0x533b3f(0x364),
    'WARNING': '#f39c12',
    'ERROR': _0x533b3f(0x14b)
  },
  loadJSON = _0x2cc59e => {
    const _0x7912de = _0x533b3f;
    try {
      if (!_0x5a0996['existsSync'](_0x2cc59e)) return _0x5a0996[_0x7912de(0x1b8) + 'ync'](_0x2cc59e, '{}', _0x7912de(0x198)), {};
      const _0x486879 = _0x5a0996[_0x7912de(0x13c) + 'nc'](_0x2cc59e, _0x7912de(0x198))[_0x7912de(0x3c9)]();
      return _0x486879 ? JSON[_0x7912de(0x1ba)](_0x486879) : {};
    } catch (_0x398aa9) {
      return console['error'](_0x7912de(0x245) + _0x7912de(0x263) + _0x2cc59e + ':', _0x398aa9[_0x7912de(0x1e0)]), {};
    }
  },
  saveJSON = (_0x4b4ee6, _0x391b57) => {
    const _0x421eb8 = _0x533b3f;
    try {
      _0x5a0996['writeFileS' + _0x421eb8(0x262)](_0x4b4ee6, JSON['stringify'](_0x391b57, null, 0x2), _0x421eb8(0x198));
    } catch (_0x4e0353) {
      console[_0x421eb8(0x3a8)](_0x421eb8(0x245) + '\x20ghi\x20' + _0x4b4ee6 + ':', _0x4e0353['message']);
    }
  },
  safeReply = async (_0x460a63, _0x6ef6b0) => {
    const _0xb2f97f = _0x533b3f;
    try {
      if (_0x460a63[_0xb2f97f(0x2b8)] || _0x460a63[_0xb2f97f(0x235)]) return await _0x460a63[_0xb2f97f(0x1ae)](_0x6ef6b0);
      return await _0x460a63[_0xb2f97f(0x29c)](_0x6ef6b0);
    } catch (_0x5504e4) {
      console[_0xb2f97f(0x3a8)](_0xb2f97f(0x24c) + ']', _0x5504e4['message']);
    }
  }, safeLeave = async (_0x143cfb, _0x93b6b4 = '') => {
    const _0x2d7ecd = _0x533b3f;
    try {
      await _0x143cfb[_0x2d7ecd(0x2af)](), console[_0x2d7ecd(0x1a8)](_0x2d7ecd(0x32e) + _0x2d7ecd(0x3ea) + _0x143cfb[_0x2d7ecd(0x3cd)] + _0x2d7ecd(0x1b7) + _0x93b6b4);
    } catch (_0x15fec4) {
      console[_0x2d7ecd(0x3a8)]('[ANTI-RAID' + _0x2d7ecd(0x3cb) + 'ể\x20rời\x20\x22' + _0x143cfb[_0x2d7ecd(0x3cd)] + '\x22:', _0x15fec4[_0x2d7ecd(0x1e0)]);
    }
  };

function createEmbed(_0x1ced62, _0x461a91, _0x142e5f, _0x79d4ef = null, _0x223df9 = []) {
  const _0x58f55c = _0x533b3f,
    _0x1bfe64 = new EmbedBuilder()['setTitle'](_0x1ced62)[_0x58f55c(0x3c2) + _0x58f55c(0x32f)](_0x461a91)[_0x58f55c(0x1a5)](_0x142e5f)[_0x58f55c(0x358) + 'mp']();
  if (_0x79d4ef) _0x1bfe64['setAuthor']({
    'name': _0x79d4ef[_0x58f55c(0x3cd)],
    'iconURL': _0x79d4ef['iconURL']
  });
  if (_0x223df9[_0x58f55c(0x17a)] > 0x0) _0x1bfe64[_0x58f55c(0x306)](_0x223df9);
  return _0x1bfe64;
}

function createProcessingEmbed(_0x358e73, _0x3dec76 = 0x0) {
  const _0x34078e = _0x533b3f,
    _0xcd724 = [_0x34078e(0x14a) + _0x34078e(0x254), '⌛\x20Đang\x20Việ' + _0x34078e(0x2dd), _0x34078e(0x14a) + _0x34078e(0x1c8), _0x34078e(0x21f) + _0x34078e(0x1a4)],
    _0x2fb45e = [_0x34078e(0x228) + _0x34078e(0x3e8) + _0x34078e(0x326) + '.', _0x34078e(0x149) + _0x34078e(0x346) + '..', _0x34078e(0x3d9) + 'văn\x20bản...', _0x34078e(0x13b) + _0x34078e(0x37b) + _0x34078e(0x369)];
  return new EmbedBuilder()[_0x34078e(0x25b)](_0xcd724[_0x3dec76])[_0x34078e(0x3c2) + _0x34078e(0x32f)](_0x34078e(0x149) + '\x20file\x20`' + _0x358e73 + (_0x34078e(0x152) + _0x34078e(0x3d8)))[_0x34078e(0x1a5)](COLORS[_0x34078e(0x215)])['addFields']({
    'name': _0x34078e(0x2a1),
    'value': _0x2fb45e[_0x3dec76],
    'inline': !![]
  }, {
    'name': 'File',
    'value': _0x358e73,
    'inline': !![]
  })[_0x34078e(0x322)]({
    'text': _0x34078e(0x1c7) + _0x34078e(0x310) + _0x34078e(0x15e)
  })['setTimesta' + 'mp']();
}

function createTokenRequestEmbed() {
  const _0x13208a = _0x533b3f;
  return new EmbedBuilder()['setColor']('#f39c12')['setTitle'](_0x13208a(0x341) + 'ni\x20API\x20Tok' + 'en')[_0x13208a(0x3c2) + 'tion'](_0x13208a(0x2bb) + 'h`\x20sử\x20dụng' + '\x20**Google\x20' + _0x13208a(0x389) + _0x13208a(0x2d3) + _0x13208a(0x3fb) + (_0x13208a(0x1e8) + _0x13208a(0x396) + _0x13208a(0x21d) + _0x13208a(0x3f2) + _0x13208a(0x2cd) + _0x13208a(0x1a6)) + (_0x13208a(0x357) + _0x13208a(0x2bc) + _0x13208a(0x3f3) + _0x13208a(0x2f3)) + (_0x13208a(0x284) + ':\x20https://' + 'aistudio.g' + _0x13208a(0x207) + _0x13208a(0x398) + '\x0a') + (_0x13208a(0x2d0) + _0x13208a(0x1f6) + '\x20khoản\x20Goo' + _0x13208a(0x278)) + (_0x13208a(0x3ce) + _0x13208a(0x3f1) + _0x13208a(0x345)) + ('4️⃣\x20Copy\x20key' + _0x13208a(0x368) + _0x13208a(0x34b) + 'ken\x22**\x20bên' + _0x13208a(0x3aa)) + (_0x13208a(0x1f5) + '**\x20Token\x20c' + _0x13208a(0x1d3) + _0x13208a(0x15a) + _0x13208a(0x229) + _0x13208a(0x296) + _0x13208a(0x269)))[_0x13208a(0x322)]({
    'text': _0x13208a(0x224) + _0x13208a(0x29e) + _0x13208a(0x350) + '\x20riêng\x20để\x20' + _0x13208a(0x297)
  })['setTimesta' + 'mp']();
}
async function vietnameseTranslation(_0x8b9c4b, _0x175668, _0x29d56e) {
  const _0x40ab7e = _0x533b3f;
  let _0x3aff6c = '';
  switch (_0x175668) {
    case _0x40ab7e(0x1ed):
      _0x3aff6c = _0x40ab7e(0x24b) + _0x40ab7e(0x1be) + _0x40ab7e(0x328) + _0x40ab7e(0x25e) + '\x20tiếng\x20Việ' + 't.\x20Chỉ\x20dịc' + _0x40ab7e(0x314) + _0x40ab7e(0x36b) + 'n,\x20không\x20d' + _0x40ab7e(0x2d4) + _0x40ab7e(0x3bb) + _0x40ab7e(0x210) + _0x40ab7e(0x1b4) + _0x40ab7e(0x2ff) + _0x40ab7e(0x213) + '.\x20Nội\x20dung' + ':\x0a' + _0x8b9c4b;
      break;
    case _0x40ab7e(0x28c):
    case '.yaml':
      _0x3aff6c = _0x40ab7e(0x24b) + 'ile\x20YAML\x20n' + _0x40ab7e(0x328) + 'g\x20Anh\x20sang' + _0x40ab7e(0x317) + 't.\x20Chỉ\x20dịc' + _0x40ab7e(0x205) + _0x40ab7e(0x3ec) + _0x40ab7e(0x168) + _0x40ab7e(0x184) + _0x40ab7e(0x393) + _0x40ab7e(0x181) + 'n\x20cấu\x20trúc' + _0x40ab7e(0x223) + _0x40ab7e(0x22f) + _0x8b9c4b;
      break;
    case '.propertie' + 's':
      _0x3aff6c = 'Hãy\x20dịch\x20f' + 'ile\x20proper' + _0x40ab7e(0x33f) + _0x40ab7e(0x237) + _0x40ab7e(0x39d) + 'iệt.\x20Chỉ\x20d' + _0x40ab7e(0x240) + _0x40ab7e(0x2f0) + '\x20dấu\x20=,\x20kh' + 'ông\x20dịch\x20k' + _0x40ab7e(0x354) + 'ung:\x0a' + _0x8b9c4b;
      break;
    default:
      _0x3aff6c = 'Hãy\x20dịch\x20f' + _0x40ab7e(0x332) + _0x40ab7e(0x18f) + '\x20sang\x20tiến' + _0x40ab7e(0x270) + _0x40ab7e(0x1a3) + _0x40ab7e(0x373) + _0x40ab7e(0x1ad) + _0x40ab7e(0x397) + _0x40ab7e(0x394) + _0x40ab7e(0x287) + _0x8b9c4b;
  }
  const _0xa9b6b1 = await _0x29d56e[_0x40ab7e(0x2cb) + _0x40ab7e(0x21b)](_0x3aff6c);
  return _0xa9b6b1[_0x40ab7e(0x188)][_0x40ab7e(0x2cc)]();
}
async function handleVhCommand(_0x34e40f, _0x5395fd) {
  const _0xdd02b4 = _0x533b3f;
  try {
    const _0xfcaaf6 = _0x34e40f[_0xdd02b4(0x3d0)][_0xdd02b4(0x1f8) + 'ent'](_0xdd02b4(0x3a5));
    if (!_0xfcaaf6) return _0x34e40f[_0xdd02b4(0x1ae)]({
      'embeds': [createEmbed('Lỗi\x20Yêu\x20Cầ' + 'u', _0xdd02b4(0x1c7) + _0xdd02b4(0x2da) + _0xdd02b4(0x17f) + _0xdd02b4(0x3e0), COLORS[_0xdd02b4(0x137)])]
    });
    const _0x4499ea = _0xfcaaf6[_0xdd02b4(0x3cd)][_0xdd02b4(0x31c)](_0xfcaaf6[_0xdd02b4(0x3cd)][_0xdd02b4(0x209) + 'f']('.'))[_0xdd02b4(0x154) + 'e'](),
      _0x18328e = [_0xdd02b4(0x2e0), _0xdd02b4(0x1ed), '.yml', _0xdd02b4(0x271), _0xdd02b4(0x281) + 's', _0xdd02b4(0x377)];
    if (!_0x18328e[_0xdd02b4(0x366)](_0x4499ea)) return _0x34e40f[_0xdd02b4(0x1ae)]({
      'embeds': [createEmbed(_0xdd02b4(0x3fa) + _0xdd02b4(0x2db) + 'rợ', _0xdd02b4(0x3ee) + _0xdd02b4(0x33e) + _0xdd02b4(0x2a7) + _0xdd02b4(0x3c6) + _0xdd02b4(0x3bf) + _0xdd02b4(0x2f1) + _0xdd02b4(0x3ba), COLORS[_0xdd02b4(0x137)])]
    });
    const _0xdf51e9 = await fetch(_0xfcaaf6[_0xdd02b4(0x329)]),
      _0x5f1b16 = await _0xdf51e9['text']();
    await _0x34e40f[_0xdd02b4(0x1ae)]({
      'embeds': [createProcessingEmbed(_0xfcaaf6[_0xdd02b4(0x3cd)], 0x0)]
    });
    let _0x2b81e5 = 0x0;
    const _0xba0797 = setInterval(async () => {
        const _0x3b7a4a = _0xdd02b4;
        _0x2b81e5 = (_0x2b81e5 + 0x1) % 0x4;
        try {
          await _0x34e40f[_0x3b7a4a(0x1ae)]({
            'embeds': [createProcessingEmbed(_0xfcaaf6[_0x3b7a4a(0x3cd)], _0x2b81e5)]
          });
        } catch {}
      }, 0xbb8),
      _0xecf4bf = new GoogleGenerativeAI(_0x5395fd),
      _0x4d8024 = _0xecf4bf[_0xdd02b4(0x28f) + 'iveModel']({
        'model': _0xdd02b4(0x2bf) + '-flash'
      }),
      _0x1c3dd9 = await vietnameseTranslation(_0x5f1b16, _0x4499ea, _0x4d8024);
    clearInterval(_0xba0797);
    const _0x22989c = './temp',
      _0x29ff86 = _0x22989c + _0xdd02b4(0x2bd) + _0xfcaaf6[_0xdd02b4(0x3cd)];
    if (!_0x5a0996['existsSync'](_0x22989c)) _0x5a0996['mkdirSync'](_0x22989c, {
      'recursive': !![]
    });
    _0x5a0996[_0xdd02b4(0x1b8) + _0xdd02b4(0x262)](_0x29ff86, _0x1c3dd9, 'utf-8');
    const _0x326868 = new AttachmentBuilder(_0x29ff86, {
      'name': _0xdd02b4(0x2a9) + _0xfcaaf6[_0xdd02b4(0x3cd)]
    });
    try {
      await _0x34e40f[_0xdd02b4(0x3c1)][_0xdd02b4(0x14f)]({
        'embeds': [createEmbed(_0xdd02b4(0x2ed) + _0xdd02b4(0x13e), _0xdd02b4(0x2e4) + _0xfcaaf6[_0xdd02b4(0x3cd)] + (_0xdd02b4(0x22a) + 'việt\x20hóa\x20t' + _0xdd02b4(0x1a0) + _0xdd02b4(0x282) + _0xdd02b4(0x370) + _0xdd02b4(0x31a) + _0xdd02b4(0x155) + _0xdd02b4(0x36c)), COLORS[_0xdd02b4(0x38c)], {
          'name': _0x34e40f[_0xdd02b4(0x3c1)][_0xdd02b4(0x169)],
          'iconURL': _0x34e40f[_0xdd02b4(0x3c1)][_0xdd02b4(0x3b8) + _0xdd02b4(0x272)]()
        }, [{
          'name': 'File\x20Gốc',
          'value': _0xfcaaf6[_0xdd02b4(0x3cd)],
          'inline': !![]
        }, {
          'name': 'File\x20Việt\x20' + _0xdd02b4(0x3b1),
          'value': 'VH_' + _0xfcaaf6[_0xdd02b4(0x3cd)],
          'inline': !![]
        }, {
          'name': _0xdd02b4(0x3af),
          'value': _0x4499ea,
          'inline': !![]
        }])],
        'files': [_0x326868]
      }), await _0x34e40f[_0xdd02b4(0x1ae)]({
        'embeds': [createEmbed(_0xdd02b4(0x143) + '!', 'File\x20đã\x20đư' + _0xdd02b4(0x1eb) + '\x20**tin\x20nhắ' + _0xdd02b4(0x3e1) + _0xdd02b4(0x172), COLORS[_0xdd02b4(0x38c)])]
      });
    } catch {
      await _0x34e40f[_0xdd02b4(0x1ae)]({
        'embeds': [createEmbed('⚠️\x20Không\x20Th' + _0xdd02b4(0x182), _0xdd02b4(0x291) + _0xdd02b4(0x3f7) + 'tin\x20nhắn\x20r' + _0xdd02b4(0x3e3) + _0xdd02b4(0x26a) + _0xdd02b4(0x3d6) + _0xdd02b4(0x2d7) + _0xdd02b4(0x180) + '!', COLORS[_0xdd02b4(0x303)])]
      });
    }
    try {
      _0x5a0996[_0xdd02b4(0x1d7)](_0x29ff86);
    } catch {}
  } catch (_0x5ad3e1) {
    console['error'](_0xdd02b4(0x31f), _0x5ad3e1[_0xdd02b4(0x1e0)]), await _0x34e40f[_0xdd02b4(0x1ae)]({
      'embeds': [createEmbed('❌\x20Đã\x20Xảy\x20R' + _0xdd02b4(0x33d), _0xdd02b4(0x298) + _0xdd02b4(0x337) + 'c\x20kiểm\x20tra' + _0xdd02b4(0x34c) + 'ey\x20Gemini!', COLORS['ERROR'])]
    });
  }
}

function _0x5143() {
  const _0x228a2b = ['XRdHU5TPigZdOcbWAgK', 'C2v0uMvXDwLYzq', 'C2XPy2u', 'yxzHDgfY', 'rMXHz3m', 'w1zixsbm4BUxAtO', 'xcTCkYaQkd86wW', 'W6bUAcb2ACoQBG', 'C2v0rM9VDgvY', 'C29YDa', 'B3bLCNmVyxbWBa', 'y2fJAgu', 'CSo6yYbMAwXLlI4', '8j+oIsbgDw4GjIbjBG', 'W6b5ihtHU6SGDgNHUR9U', 'DxjS', 'ihBdOca', 's2JdTg5N', '4P2mieTOW7rUzYbuAa', 'pt09pt09pt09pq', 'w0foveKTuKfjra', 'DgLVBG', 'tog6PxKGDg9Rzw4G', 'z+g7OsbTDxrL', 'AwXLig7dOhKGDog7QW', 'rMLSzsbJ4BQNBIb2', 'uMvQzwn0Aw9Uxq', '4BUdigjHBIbUz8AW4BUD', 'C3rHDgvpyMPLyW', 'Aog7RsbS4BQHAsbOB+g6TW', 'BwvTyMvYCW', '4BUNysa', 'CMvHC29U', 'm++4J+kdOW', 'BKD1AwXKq29TBq', 'ysbm4BUxAq', 'oIbGlNr4DgaGya', 'DgLLCYb04BURihrP', '4BQNBIb1BMjHBG', '8j+uKsbd4BQNBIbhzw1P', '8j+tMIbiXRdHU5TUzYbK4BQR', 'no+4J+kdOW', 'ig7dOhKH', 'ieTLEsiQkGO', 'ig7HU5LPigr1BMCU', 'lI9HBgXVD2vKxW', 'C3rHCNrZv2L0Aa', 'BwvZC2fNzunYzq', '8j+mKcbbueKGugLUzW', 'kIlINiuGqwrKifrV', 'igZHUQfPiefqssbl', '4BQHBIb2W6bVimsrW6j5', 'D2fYBMLUz3m', 'Aw5MB2aGyc84yG', 'ysb0Aw4GBMJHUQ9U', 'C3rYAw5N', 's0voigTOW7rUzYa', 'Aw5PiefqssbuBW', 'zxLZlIbo4BUzAsbK', 'mtiZndu2nZG5ma', 'zxj2zxiIkIOGDa', 'kIRWN5olieJgSog7M25Nia', 'C2v0vgLTzxn0yq', 'ywDLCW', 'xsbevvNHU4zuici', 'imsrXRdHU6nJoIaQkG', 'BSoGEsdeKCoJigJHUR90', 'w0foveKTq0XptG', 'C2vYDMvY', 'ihjVBguGA2JdOwm', 'yc92AgaG4OcuifzP', 'iIbI4BUFAsa', 'B21Tyw5KCYe', 'igpHU6DHia', 'iZjLy2m3mq', 'mtG5mtaYmJiX', 'Aw5JBhvKzxm', 'Aw9U', 'ihBdOcbUAog6Pw4GkG', 'lI4U', 'ihlHU5nPihrO4BUTigW', 'DhlHU4SGDSsdBIbI4BQJ', 'BMCGvMNHU4D0lG', 'vxnLCG', '4P2miepdSYbS4BUxAsb4', 'W6bUAcbJW7rUzYek', 'igVdQg0GySoQBIbK', 'AgvSCga', '8j+tHsboz8oGEsb04BQHBW', 'W6mGy29KzsWGDmoQ', 'xsdINiuGXjddOYbN4BUTAq', 'icH0Aw4GBMJHUQ9U', 'DgvZDa', 'lMnVBMy', 'z2v0sw50zwDLCG', 'z2vZ', 'kIOGy2JgSgeGy8oZ', 'DgHP4BUhBIbMAwXL', '4P2mieTOW7rUzYb0Aa', '4BQ/DsbRAmo0BMCGyq', 'r+g7OsbTDxrL', 'AcbGl3zOyc4', 't0rNEe53lKDArq', 'ihBdOg8GXjhdSYekuW', 'txv0zsb0AmoGBMG', 'yxv0Ag9Y', 'smoJEsbT4BUFigzPBa', 'yxuGA2HPig5O4BQT', '4BUrAse', 'C2v0vgH1BwjUyq', 'vhvUzYdeKEg7K25Nia', 'r2vTAw5PiefjkG', 'zxj2zxiGBEg7M2KH', 'qMfUtwvTyMvYCW', 'u1vdq0vtuW', 'ywrKDg9Rzw5F', 'BMLJA25HBwu', 'zYbWAog6O2KGBSo6Da', 'C3rHBxa', '8j+pOca', '4PYfiefKzcbuB2TL', 'B2rLlcbIAEg6V24U', '4BQRBI4GtUg7MwKGzhu', 'ihbSDwDPBIbnAq', 'y3vUzYbJ4BQLCcaQ', 'BIWGXjhgSog7Nw5Nigq', 'yxbWl2fWAwTLEq', 'igjHBIe', 'tog7SweGy2JHU41Uidm', 'l3zOycbUz2f5iq', 'wCoQDsbJ4BQNDsbXDq', 'BMCGDgNHUR9UzYbw', 'tog7SweGy2JHU41Uidi', 'y29UzMLN', 'ihDHCM5Z', 'z+g7RwKGXjhgSog7O2mGra', 'C2v0twLUvMfSDq', 'kMFHU61Piefqssbl', 'z2v0twvTyMvY', 'zMLSzq', '4PYfiepdSYb0Aog7GYbS', 'zMLSDgvY', 'zxjYB3i', 'yw5KCW', 'igtgSog7M2KkcG', 'phq6', 'zxKQkIbJ4BUNysbI', 'mtuZmdeYovDXC3nLuq', '4P2mielHUQfUigTOW7rU', 'XjdHU4TUAcbe4BQHBMC', '8j+mKsbt4BQLCa', 'smoZyq', 'XRdHU6nJigpHUQvWihf1', '8j+tMYboAwnRBMfTzq', 'vog7Lw5NoIa', '4PQG77IpiejVDcdeKCAW4BUJyW', 'Bg9NAw4', 'zhuGBweGBwf5', 'zgLZCgXHEuf2yq', 'igJHU4CGXjhgSog7O2mGBW', 'BMzG', 'BCoJignVzguSigi', 'vgJHU51PigDPyw4G', '4BUrAsaQkG', 'ywXSycbGl2nVAq', 'ycbGlNbYB3bLCG', 'ugXHEwLUzW', 'DxnLCG', 'C2v0rgvZy3jPCa', 'zog7Pw5NigZHU4DUAca', 'zwfYya', 'vog6Ow8GySoSBMGGyW', 'BwXGigaUEwfTBa', 'ptX0B2TLBIbJ4BUN', '4BUdig11DguGBMFgSa', 'DhjPBq', '4P2mimsqW6mGvog7QYbdAa', 'xsblAmo0BMCGDgG', 'q+g6O25OigpdOw8GDa', 'BMfTzq', 'm++4J+kdOYboAog6Pw4GkIOI', 'BIbXDCoHig3HU5TP', 'B3b0Aw9UCW', 'qM90ig7dS2K', 'wgvTigrHBMGGCW', 'zsbJB25MAwCGtq', 'AsbI4BUFAtOG', 'mtq1mde0m0fjvKrutG', 'BIbZzxj2zxiGDa', 'iIaO', 'zYdeKEg7O2KUlI4', 'XjbHBMCGzog7I2nOia', 'y29PBMzSAxa', 'Dog6OwK6igH0DhbZ', '4PYfielHUQfUimsrW6mGXje', 'DgLTzw91Da', 'vgLUig5O4BQVBG', 'B3vUDa', 'DMNHU4D0igJdS2eU', 'BIbYACoQBMCQkIa', 'r3vPBgrwB2LJzq', 'ACoQBMCIkIOGDog7QW', 'ig5NAgKGBMFHU50G', '8j+oSsbnywDPyYa4lq', 'AxndAgf0sw5WDq', 'zMv0y2G', 'DmoTy2GGy+g6PxuGDa', 'zhm6', 'xsbs4BUDAsaI', 'rgfUz2vY', 'DSsdBIbI4BQJBIWGAW', 'C2v0vg9Rzw4', 'q2JHU4KGAog7LYb0CUg7OW', 's+g6V3qGCxxHUQm6icO', 'BNrZ', 'q3jLyxrLiefqsq', 'igpHU6DHihjPW6PUzW', 'ssblzxKGBwNHU4vU', 'qMfUig3HU5L0ihrO', 'XjfP4BUbBIbut0TftG', 'jf0Qkq', 'iKnOBYbWAmoPCca', 'yMfUycbGl3vUyG', 'z2v0ywrTAw4', 'XjdHU4TUAcbe4BQHBMCG', 'AmoZysbMAwXLlGO', 'zNvUy3rPB24GkG', 'Dw5JyxvNAhrfEa', 'DMKTvK4', 'twvZC2fNzunVBG', '4P2mifnLCNzLCIdeKq', '8j+rPsbuAmoGBMGGDMK', 'rvjst1i', 'AsbUW6bViq', '4PYfimsqW6mGzhv54BUhDa', 'cIaGielHU59PoIa', 'XjbHBMCGAg/dOg4G', 'CMvHzezPBgvtEq', 'ywrKu3rYAw5NtW', 'ieHVW6bUiftHUQv0iq', 'zxHLy3v0B3i', 'lcaUEw1SlcaUlG', 'W7LUzYbS4BUhBMGGya', 'DxnLCMLK', '4PYfieHVW6bUiftHUQv0', 'u+g7Ksb0Aw4GBMJHUQ8', 'BMCGBog6OwKGBog7H24', 'ywrKvxnLCK9WDa', 'xcGGkLWP', 'cLtHU5vUzYb3yxjU', 'XjbHBMCGEog7RsbSW70', '4O+Zimsqyw5NifzP4BUh', 'i2u3ngmZyW', 'ktOG', 'xsbcB3qGDSoGBYa', 's2NHU4nTihrYysaQ', 'C2vUza', '4P2mieTOW7rUzYbbza', 'vKXulJHkD19KvG', 'yc4GvNvPigZdSM4', '4BQTCcbbueKGs2v5', 'Dg9mB3DLCKnHCW', 'W6PUiglHUQnUifrP4BQ/', '8j+tQsdeKmoJieFHU61PieG', '8j+oRsbsB2XLCW', 'B25Nic5LBNyH', 'xsbhDwLSzcdeKCoJ', 'BMCGCgHPW6PUigG', 'ihvUyMfUiq', 'ihrP4BQ/Ccb0AgvV', 'EsdeKCAW4BUJyYbHDwq', 'ACoIEsbSW6f0lI4U', 'AsbXDxNHU4fUkse', 'AEg6V3uGq0Xjru5u', 'zw50CMLLCW', 'y+g6P24Gr2vTAw5P', 'vxnLCIbjrdOG', 'tKuG4Ocuia', '4BUdihJdS2eGDgLUia', 'lIbu4BUXihlHU51PigC', 'B3b0Aw9Umq', 'Amo0BMCGzog7I2nOia', 'DxnLCM5HBwu', '4BQHAse', 'zog6Q24', '8j+BOE+4JYbnB2rLCMf0Aq', 'z8o1igZHU4DUAa', 'mtyXmgfsBufTua', 'Cg9ZAxrPB24', 'kIOGDgLUig5O4BQV', 'ihzPW6PU', 'y+g7P2eGyUg6Ow4H', 'rv0Gs2JdTg5Nihq', 'C2v0u3r5Bgu', 'zMv0y2HbDwrPDa', '8j+tHsbu4BQHBYbSW7PJ', 'yxjUC2aGyc9JBa', 'C2v0tgfIzwW', '4PYfimsqW6mGDog6Ow8GyG', 'BgvUz3rO', 'y291BNrLCG', '4PYfifnLCNzLCIbU', 'zMXVB3i', 'A2LJAW', 'DcbMAwXLimsr4BUdia', '4BQ3DcbeAxnJB3jK', 'ieDP4BUVig5NDxNdQG', '4BUdieFHU61Piern', 'CKfKza', 'A2v5CYWGBCoJigm', 'AsbbueKGvg9Rzq', 'kIOGXjhdOYdeKCAW4BUJyW', 'yc93yxjUAw5NCW', 'CMvZCg9UC2u', 'Acb2AEg7Hw4U', 'AwnVBLvsta', 'r+g7OsbIyw4', 'ogjHBgW', '8j+oSIbc4BQHBIbNAwvV', 'tMFgSog7NwKGy+g6P24G', 'ihrP4BQ/BMCGqw5O', '8j+FOsbi4BUpAsbS4BQHAsa', 't3b0Aw9U', 'BIbcB3q', 'C2v0tMfTzq', 'qM90imsrW6mGCUg7NwK', '8j+pKYdeKgfUzYbWAw4', 'XRdHU6nJigZgShuGDgG', 'DgLUig5O4BQVBIbY', 'DxrMltG', 'vNvPigZdSM5NicO', 'XjhdOYb44BUTigZdVs4', 'tg9NCW', 'mE+4J+kdOW', '8j+uKsboAog6RxaGr2vT', '4PYficOQ', 'z8oSiq', 'AmoGBMGGy8o0BMCH', 'mtq0ndu3odGWna', 'yxbWCM92zv8', 'W7rUzYbK4BUly2GGBq', 'DcbiW7nHlI4U', 'C2v0q29SB3i', 'AEg6V3aGDog7PwmUcGO', '4BQJEsbYysbRAgKG', 'Bg9N', '8j+uLYbm4BQLEsbRzxKG', '8j+tQcbuAmoQBsbI4BUFAq', 'yw1VDw50', 'CMfUzg9T', 'BIbOW6bTlcbIAEg6VW', 'zwrPDfjLCgX5', 'z3vPBgq', 'mJuWmtzwD2H3yNy', 'BM93', '4P2mimsqW6j5igTOW7rU', 'xsbu4BUQieni4BUqssa', 'igtHUQTUlIbhAEg7RYa', 'Cg9SBa', 'AxqGBg9NigpHU6DH', 'iI4Gtmo9igrVoIa', 'D3jPDgvgAwXLuW', 'yM90', 'CgfYC2u', 'B3DUzxjjza', 'C2L6zq', 'q2HHBM5LBa', 'AwXLiePtt04GBG', 'A2v5cGO', 'zw0GBog7H25O', 'iglHU59Pia', 'tvrrme9eAZfpra', 'Aw5WDxq', 'ysbI4BQHBJ4', 'Bxv0zq', 'zxn0yw1W', 'vNvPigZdSM5Nimsr', 'DcbiW7nHlI4', 'EgnLChrPB25D', 'r3vPBgrnzw1Izq', 'r3vPBgrZ', 'ACoQBMCGBSoGEsdeKq', 's2NHU4nTihrYysbW', 'yMfU', '4P2mimsqW6mGsog7P3K', 'B3b0Aw9UmW', 'Bw9KzxjHDg9Y', 'yw5GigaVBxv0zq', 'Aog7IsbSXRb1ihrYBW', 'EgvT', 'zMLUza', 'mc05ys16qs1AxW', 'Dw5SAw5Ru3LUyW', 'wmoZysb04BQLDcbJ4BQJ', 'AwXLignVBMzPzW', 'r2LLBYb4W7PJihG', 'Dw5Iyw4', 'u3rHDgvZ', '4PYfimsqW6mGz+g7OsbIyq', '8j+rPca', 'kIOGDog7QYbJAog7KwK', 'BwvZC2fNzq', 'vuLmrf9jrcb0CG', 'wtnpvgn4txPbmq', '4BUDAsbUW6b5iq', 'B25Jzq', '4BUzBMCGDog6OwKGkIO', 'ihbOACoQBIbOAEg7HW', 'wgvTigJgSog7M25Nia', 'pIbc4BQHBIbJ4BQNBIa', 'zhvYyxrPB24', 'xsdINyWGs2JdTg5Nia', '4BUJyYbN4BUTAsb2W6bV', 'w3vUAgfUzgXLza', 'lMPZB24', '8j+uPYbuAEg7H24GW61JAa', 'w0zbvefmxsbuAa', 'tog7SweGy2JHU41Uide', 'z2v0vxnLCG', 'ywrKsw50zwDLCG', '4BUdiglHUQnVig3HUQ10iq', 'zwPLy3rPB24', '4PQG77IpicOQtmAWDsddVtO', 'CcbI4BQXBMCGDmoGAq', 'DgfN', 'z2v0qxr0ywnOBq', 'zYbS4BQHAsbS4BUhBMG', 'W6XUAcbJAog7Jw4H', 'ys16qs1AxYrDwW', '4PYfimsqW6mGA2LJAYa', '4PYfifrVA2vUimsqW6m', 'vog6Ow8GyUg7N2KG', 'Aw5Ly3jHzNqGka', 'BIbZW6bUzYe', 'kIOH', '4PYfieTOW7rUzYbJW7m', 'wmoZysb0Aw4GBMG', 'kIOkcG', 'AcbNACoHihrY4BUlia', 'B2XL', 'B29NBguUy29TlW', '4BQLDcbJ4BQJigpHUQnUAa', 'BgfZDeLUzgv4tW', 'ks4kcG', 'C2LKzxm', 'C2v0sw1Hz2u', 'ihvUBxv0zse', 'DxnLCMLUzM8', 'ChjLBwL1BvrPzq', 'AEg6V24SimsrXRdHU51UzW', 's2JdTg5NigpdSYbS', 'lMnVBs9KzxzLBa', 'ihrYW7PJiePtt04', 'DgLTzxn0yw1W', 'su5gtW', 'CgvYBwLZC2LVBG', 'y3jLyxrLzfrPBq', 'ysbI4BQHBIdeKCoJimsr', 'nNfhrhPvEG', 'odu4mZK1DwPTwfH6', 'BNrLBNq', 'XjhHU4mGBMJHUQ1WihrV', 'kKfqssblzxKQkG', 'l2HLBhaGXjhHU4mGEa', '4OYBimsqyw5NifzP4BUh', 'AwnHDgLVBNm', 'BwjLCNm', 'lI93yxjUCY5QCW', 'ifLbtuWUie7HU5LP', 'vg9Rzw4GC+g6VsdeKq', 'DguGy2HVicOQ', 'D2fYBG', 'Bw9KzxjHDgfIBa', 'XjbHBMCGCgJdOM4G', 'AEg7H24GDog6OwKSigS', 'ycdeKCoJimsrXRdHU6nJia', '4PYfimsqW6mGyMfUicO', 'igJHUQfUigHV4BQ3yYa', 'C2f5', '4BQVBse', 'igr1BMC6cG', 'Aog7O3aGBog7HYbOB+g6TW', 's2JdTg5NigpdSW', 'oI8VzgLZy29Yza', 'A2vUlGO', 'oIbuW6bPigTOB+g6OW', 'zgvMzxjYzwq', 'BMzSAxbGigaVCG', '4BQ/BMCGqw5OihnH', 'zw50t3b0Aw9U', 'DxnLCNm', 'mJy5mJa4mdbLquPgqLi', 'y8wPigHV4BQ3yYbS4BUx', 'DgJHU7fJigHP4BUhBIa', 'z2v0', 'DxbKyxrL', 'BSoGBYe', '4BUly2GGCgJHUQDUigC', 'r3vPBgrnzxnZyq', 'suq6ia', 'igpdOw8Gy+g7P2eGkG', 'Aog6R24H', 'w0Ptt05DieZHU5DP', 'zsaUzw52ihBdOca', 'y29UC3rYDwn0BW', 'z2v0u3rYAw5N', 'W6fJAcb3yxjUCW', 'EmoZysb3yxjUCW', 'smoJEsbK4BUly2GGzG', 'w3nHzMvszxbSEq', 'y3jLyxrLre0', 'W6PTicOQr2vTAw4', 'Aw50zxjHy3rPBW', 'CxvLC3rPB24', '4PYfimsq4BUtBMCGW50', 'mtK1otCYoerpEgXTvq', '4BQVyYbS4BQVBs4UlG', 'DcbiW7nH', '4PYfimsqW6mGEmoZysb0', 'khbOW7P0kq', '4P2mimsq4BURBMCGBCAHiq', 'ywn0Aw9U', 'Dsa1ihbOW7P0ig4', 'igVdVsbJB21Tyw4', 'C2v0vgL0Bgu', '4PYfimsqW6mGXjheG25Nia', 'AM9PBMvKvgLTzq', 'zYbbBMGGC2fUzW', '4BUhDcbOW7nHigzPBa', '4P2tiepdONuGAog7J2K', 'CMvQzwn0', 'Ew5J', 'imsr4BUnyYa', '4P2mimsqW6mGDog7QYbJAa', 'qUg7IYb04BURignO4BUrAq', 'BwfW', 'DwLSzc4', 'ChjLBwL1Bvn1yG', 'XkLUAcb2AEg7Hw4U', 'ihrOW6bUAcb2ACoQ', 'CgLUzW', 'zxHPDa', '4BUdigTPy2SGBMFgSa', 'y2HHAw4', 'Bsb0Aog6PxKGDgJdOa', 'zYbwAEg7H3qUieTO', 'lNLHBwW', 'DgfYvvjm', '4BUByYdeKCoZihlHU5nPiq', 'tsbJAg8G', 'A2vU', 'y2f0y2G', 'CgJdUNqGA2JdTg5N', 'z2XLcG', 'C2TPChrVA2vUxW', 'BMGGDMNdQM4GBSoG', 'yc9HDMf0yxjGia', 'ycbGl3bVBgXG', 'Dw5TDxrL', 'As1pyZi5yJuYvq', 'vgJdTg5NihrPBIa', 'BIaOms0XmdaP', 'lNbYB3bLCNrPzq', 'cKzPBguGXjhdRw5O', 'ywrKq29TCg9Uzq', 'mE+4J+kdOYbuCNv5igpHUQ1W', 'W70Gzg8', 'AmoPCcbOB+g6OxqGXje', 'BMC6cG', 'z8AW4BUDAsbUW6b5iq', '8j+tIIbcW6XUAcbJAog7Jq', 'Dw5Oyw5KBgvKuG', '4PYfifnLCNzLCIdeKq', 'lNLTBa', 'mtmXmdGYmhrVswPsEq', 'C2f1ig5OW6KH', 'z2v0r2vUzxjHDa', 'igTPy2SH', 'smoJEsbI4BQTDcaQkG', 'zYbJW7mGCxv54BUbBG', 'DcdeKEg6PxKH', 'tmo9igrV', 'C2vYDMvYAw5MBW', 'Amo0BMCGBmAWDsb2', 'yUg6O28GBEg6Rxq', 'vNvPigZdSM5Nihq', '4PQG77IpiepHUQnUAcbJW6fV', 'zgvIDq', 'icOQ', 'CMvWBhK', 'igpdSYbWAog6O24GAa', 'XRdHU6nJigFHU61Pihf1', 'Aog7Jw4', 'yxbWBhK', 'vhlHUQfUzYbuAmoHAq', 'u3vJy2vZCW', 'igpHUQnUAcbJW6fVia', 'yYdeKEg6T3qH', 'qM90imsrXRdHU6nJiha', 'kIOGlYa', 'lMPZB25GigaUEq', '4P2mieTOW7rUzYb0W6W', 'vKHF', 'C2v0q3vZDg9Tsq', 'AgfZ', 'A2LJA2fIBgu', 's2LJAYbT4BUzDcb0', 'AxncDxr0B24', 'BgvHDMu', 'BIb04BQHAsWGA2JdTa', 'ycbGl2nSzwfYDW', 'C3bSAxq', 'CIb0CM9UzYbKyq', 'AmoGBMGGDMNdQM4', 'BIbJAg8Gsuq6ia', 'iglHUQfUimsrW6mGC+g6Tq', 'kIOGzhv54BUhDc4', 'CMvWBgLLza', 'BIbY4BUtAse', 'iokaLca', 'pIbm4BUhBMGGyc92', 'zog6Q24GBog6PxKGqva', 'l1zixW', 'ihbOW7P0cKZdVsbK', 'z2vTAw5PltiUma', 'CYaO', 'ihJdS2eGDgLUig4', 'rv0Gs2LJA2vKia', 'qMfSBa', '4PYfiejpvcbptKXj', '4PYfienO4BQVyYbJAog6RW', 'zsKGE30', '4O+ZiftHU7eGXjhHU5LUzYa', 'yc9RAwnRycbGlW', 'C2nYAxb0Aw9UqW', 'BKnYzwf0zq', 'z2vUzxjHDgvdBW', 'Dgv4Da', 'ig3dRg5Oimsr4BUdihq', 'oLi+', 'ihrO4BUXyYbOAEg7H24', 'mU+4J+kdOYdeKmsdBMCGBMJHUQ0', 'uxvHEsbS4BQHAsbZ', 'AsbUW6b5iq', 'kIdeKEg7GYb2AEg7H3qG', '4BUly2GGA2v5CYWG', 'z2DLCG', 'DenVBw1HBMq', 'CM9UzYbJW6bPimsr', 'D2HPBguGkhrYDq', 'BY5NB29NBguUyW', 'W61UAcbRW6HTig3HU5K', 's2JdTg5NieJHU5CGva', 'W6bUAcb2ACoQBIbZ', 'DcbiW7nHlG', 'Bsb0Aog6PxKGDxnL', 'zM9GigaVDxnLCG', 'lNr4Da', 'z3vPBgqGBEg7M2K6', 'B3b0Aw9UmG', 'igaVDMHGigTOAq', 'rMLSzsbG', 'zgvSzxrL', 'CM9SBa', '8j+FOsblAmoZig7dS2KU', 'imsrXRdHU6nJigr1EEg7HW', 'igJdOg5Oimsr4BUzBMC', 'Aw5PDa', 'Aog7GYbRAwnRia', 'Bog7H25Oiq', '8j+oIsbwAEg7H3qGsmoZyq', 'CM9Szxm', 'Dog7QYbJAog7KwKGC2e', 'ACoHihrY4BUlihnHDq', 'DgLLC2aGyc5JBW', 'ACoQBMCGDog7QYb0Aa', 'ihbOW606kIOk', 'B3b0Aw9Una', 'kIOktmo9igrVoIa', 'ChrPB24', 'BwvTyMvYq291BG', '4PYfimsqW6mGEmoZysaQ', 'q2JHU4KGz+g7RwKGDg8', '8j+mLsboz+g7Rwe', 'AM9PBG', '8j+wVo+4JYbbDMf0yxiGyW', 'y2XLyxi', 'ycbGl3vUBxv0zq', 'BMD1ECoQBIbJ4BQLDq', '4PYfimsqW6mGrhv54BUhDa', 'CMvHzhK', 'ywrKqxr0ywnOBq', 'v0fstKLorW', 'twfUywDLtwvZCW', '4PQG77IpifNdQNuGy+g6P3uG', 'ywrKrMLLBgrZ', 'A8o9ihnSyxnOigm', 'C2v0', 'AgvSCa', 'w0vsuK9sxsaV', '8j+gLcbjra', '8j+sRcbuCUg6OYbS4BUDAq', 'Aw5N', 'DhH0lcaUANnVBG', 'igpHU6DHiglHUQfUiq', '4BUJAsb0CM9UzYbN', 'tw9KzxjHDgvnzq', 'q8oIDsbO4BUpAq', '8j+pKYbqB25Niq', 'AcbJW6fJigDPW6eG', 'y29UDgvUDa', 'B20VyxbWl2fWAq', 'ihrP4BQ/BMCGvMNHU4C', 'igr1EEg7H3qGDhlgSa', 'lIOQia'];
  _0x5143 = function() {
    return _0x228a2b;
  };
  return _0x5143();
}
client['on']('guildCreat' + 'e', async _0x5df2e1 => {
  const _0x2dd817 = _0x533b3f,
    _0x4dcd1e = loadJSON(ALLOWED_FILE);
  if (_0x4dcd1e[_0x5df2e1['id']]) {
    console[_0x2dd817(0x1a8)]('[ANTI-RAID' + _0x2dd817(0x159) + _0x2dd817(0x2e8) + 't:\x20\x22' + _0x5df2e1['name'] + '\x22');
    return;
  }
  console[_0x2dd817(0x1a8)](_0x2dd817(0x32e) + _0x2dd817(0x14d) + _0x2dd817(0x2e1) + '\x20\x22' + _0x5df2e1['name'] + _0x2dd817(0x3d7) + _0x5df2e1['id'] + ')');
  let _0x1ea607 = 'Không\x20rõ';
  try {
    const _0x5bf3ed = await _0x5df2e1[_0x2dd817(0x175) + _0x2dd817(0x19b)]({
        'type': 0x1c,
        'limit': 0x5
      }),
      _0x4a3f0a = _0x5bf3ed[_0x2dd817(0x161)][_0x2dd817(0x1d5)](_0x4bc432 => _0x4bc432['target']?.['id'] === CLIENT_ID);
    if (_0x4a3f0a?.['executor']) _0x1ea607 = _0x4a3f0a[_0x2dd817(0x13f)]['tag'] + '\x20(' + _0x4a3f0a['executor']['id'] + ')';
  } catch {
    console[_0x2dd817(0x226)]('[ANTI-RAID' + ']\x20Không\x20lấ' + _0x2dd817(0x15d) + _0x2dd817(0x1b6) + '\x20\x22' + _0x5df2e1[_0x2dd817(0x3cd)] + '\x22');
  }
  const _0x5c722a = new EmbedBuilder()[_0x2dd817(0x1a5)](0xff6600)[_0x2dd817(0x25b)](_0x2dd817(0x3b5) + '\x20mời\x20vào\x20S' + _0x2dd817(0x38a))[_0x2dd817(0x387) + 'il'](client[_0x2dd817(0x3c1)]['displayAva' + _0x2dd817(0x272)]({
      'dynamic': !![],
      'size': 0x100
    }))[_0x2dd817(0x306)]({
      'name': '🤖\x20Bot',
      'value': client['user'][_0x2dd817(0x1f7)],
      'inline': !![]
    }, {
      'name': '🆔\x20Bot\x20ID',
      'value': client['user']['id'],
      'inline': !![]
    }, {
      'name': '​',
      'value': '​',
      'inline': ![]
    }, {
      'name': '🏠\x20Server',
      'value': _0x5df2e1['name'],
      'inline': !![]
    }, {
      'name': '🆔\x20Server\x20I' + 'D',
      'value': _0x5df2e1['id'],
      'inline': !![]
    }, {
      'name': _0x2dd817(0x136) + 'ên',
      'value': '' + _0x5df2e1[_0x2dd817(0x2f7) + 't'],
      'inline': !![]
    }, {
      'name': _0x2dd817(0x1aa),
      'value': _0x1ea607,
      'inline': ![]
    })[_0x2dd817(0x322)]({
      'text': _0x2dd817(0x2c7) + _0x2dd817(0x2ef) + _0x2dd817(0x259) + _0x2dd817(0x37d) + 'i\x20phản\x20hồi' + '.'
    })['setTimesta' + 'mp'](),
    _0x1929d1 = new ActionRowBuilder()[_0x2dd817(0x283) + 'nts'](new ButtonBuilder()['setCustomI' + 'd']('approve_' + _0x5df2e1['id'])['setLabel'](_0x2dd817(0x251))[_0x2dd817(0x174)](ButtonStyle[_0x2dd817(0x2a2)]), new ButtonBuilder()[_0x2dd817(0x2aa) + 'd']('reject_' + _0x5df2e1['id'])['setLabel']('❌\x20Không')[_0x2dd817(0x174)](ButtonStyle['Danger']));
  let _0x5b126b = 0x0;
  for (const _0x3e1ae4 of OWNER_IDS) {
    try {
      const _0x13e839 = await client[_0x2dd817(0x239)][_0x2dd817(0x3e7)](_0x3e1ae4, {
          'force': !![]
        }),
        _0x167d27 = await _0x13e839[_0x2dd817(0x24d)]();
      await _0x167d27[_0x2dd817(0x14f)]({
        'embeds': [_0x5c722a],
        'components': [_0x1929d1]
      }), _0x5b126b++, console['log'](_0x2dd817(0x32e) + _0x2dd817(0x374) + '\x20DM\x20→\x20' + _0x13e839[_0x2dd817(0x1f7)]);
    } catch (_0xfd2154) {
      console[_0x2dd817(0x3a8)](_0x2dd817(0x32e) + _0x2dd817(0x1ea) + _0x2dd817(0x3a1) + _0x2dd817(0x274) + _0x3e1ae4 + ':\x20' + _0xfd2154[_0x2dd817(0x1e0)]);
    }
  }
  if (_0x5b126b === 0x0) {
    console[_0x2dd817(0x3a8)](_0x2dd817(0x32e) + ']\x20Không\x20li' + 'ên\x20hệ\x20được' + '\x20owner\x20nào' + _0x2dd817(0x166) + _0x2dd817(0x267)), await safeLeave(_0x5df2e1, 'Không\x20liên' + _0x2dd817(0x3b9) + 'wner');
    return;
  }
  pendingGuilds[_0x2dd817(0x308)](_0x5df2e1['id'], {
    'approvals': new Set(),
    'rejections': new Set(),
    'timeout': setTimeout(async () => {
      const _0x2b58ec = _0x2dd817,
        _0x180ac0 = loadJSON(ALLOWED_FILE);
      !_0x180ac0[_0x5df2e1['id']] && (pendingGuilds[_0x2b58ec(0x2e5)](_0x5df2e1['id']), await safeLeave(_0x5df2e1, 'Timeout\x205\x20' + _0x2b58ec(0x277) + _0x2b58ec(0x29d) + 'ồi'));
    }, 0x5 * 0x3c * 0x3e8)
  });
}), client['on'](_0x533b3f(0x24f) + _0x533b3f(0x2ca), async _0x4f1ce2 => {
  const _0x3a7f22 = _0x533b3f;
  if (_0x4f1ce2[_0x3a7f22(0x2ae)]()) {
    const {
      customId: _0x511211
    } = _0x4f1ce2, _0x99ab92 = _0x4f1ce2[_0x3a7f22(0x3c1)]['id'];
    if (_0x511211[_0x3a7f22(0x348)](_0x3a7f22(0x1a2)) || _0x511211[_0x3a7f22(0x348)]('reject_')) {
      const [_0x2c7038, _0x524434] = _0x511211[_0x3a7f22(0x2b2)]('_');
      if (!OWNER_IDS['includes'](_0x99ab92)) return _0x4f1ce2[_0x3a7f22(0x29c)]({
        'content': '❌\x20Bạn\x20khôn' + _0x3a7f22(0x292) + _0x3a7f22(0x2cf) + _0x3a7f22(0x2e9) + _0x3a7f22(0x344),
        'flags': 0x40
      });
      const _0x1b7874 = pendingGuilds[_0x3a7f22(0x23d)](_0x524434),
        _0x53eac9 = loadJSON(ALLOWED_FILE);
      if (_0x53eac9[_0x524434]) return _0x4f1ce2[_0x3a7f22(0x29c)]({
        'content': _0x3a7f22(0x17c) + 'ày\x20đã\x20được' + _0x3a7f22(0x318) + _0x3a7f22(0x273),
        'flags': 0x40
      });
      if (!_0x1b7874 && !_0x53eac9[_0x524434]) return _0x4f1ce2[_0x3a7f22(0x29c)]({
        'content': _0x3a7f22(0x305) + _0x3a7f22(0x35c) + _0x3a7f22(0x22c) + _0x3a7f22(0x19a),
        'flags': 0x40
      });
      const _0x4911f0 = client['guilds']['cache'][_0x3a7f22(0x23d)](_0x524434),
        _0x39bb09 = _0x4911f0 ? _0x4911f0['name'] : _0x3a7f22(0x242) + _0x524434;
      if (_0x2c7038 === 'approve') {
        _0x53eac9[_0x524434] = {
          'approvedAt': Date[_0x3a7f22(0x1b1)](),
          'approvedBy': _0x4f1ce2[_0x3a7f22(0x3c1)][_0x3a7f22(0x1f7)]
        }, saveJSON(ALLOWED_FILE, _0x53eac9);
        _0x1b7874 && (clearTimeout(_0x1b7874[_0x3a7f22(0x3dd)]), pendingGuilds[_0x3a7f22(0x2e5)](_0x524434));
        try {
          await _0x4f1ce2[_0x3a7f22(0x23e)]({
            'embeds': [new EmbedBuilder()[_0x3a7f22(0x1a5)](0xff00)[_0x3a7f22(0x25b)](_0x3a7f22(0x300) + '!')[_0x3a7f22(0x3c2) + _0x3a7f22(0x32f)](_0x3a7f22(0x2a5) + _0x3a7f22(0x286) + _0x3a7f22(0x1e5) + _0x39bb09 + ('**.\x0aDuyệt\x20' + 'bởi:\x20') + _0x4f1ce2[_0x3a7f22(0x3c1)]['tag'])[_0x3a7f22(0x358) + 'mp']()],
            'components': []
          });
        } catch {
          await _0x4f1ce2['reply']({
            'content': _0x3a7f22(0x139) + _0x3a7f22(0x29b) + _0x39bb09 + _0x3a7f22(0x201),
            'flags': 0x40
          });
        }
        for (const _0x409c12 of OWNER_IDS) {
          if (_0x409c12 === _0x99ab92) continue;
          try {
            const _0x10e3f0 = await client[_0x3a7f22(0x239)]['fetch'](_0x409c12, {
              'force': !![]
            });
            await (await _0x10e3f0[_0x3a7f22(0x24d)]())['send']({
              'embeds': [new EmbedBuilder()[_0x3a7f22(0x1a5)](0xff00)['setTitle'](_0x3a7f22(0x28b) + 'ã\x20được\x20duy' + 'ệt')[_0x3a7f22(0x3c2) + 'tion']('**' + _0x39bb09 + (_0x3a7f22(0x186) + _0x3a7f22(0x29b)) + _0x4f1ce2[_0x3a7f22(0x3c1)][_0x3a7f22(0x1f7)] + _0x3a7f22(0x2b7))[_0x3a7f22(0x358) + 'mp']()]
            });
          } catch {}
        }
        console[_0x3a7f22(0x1a8)]('[ANTI-RAID' + _0x3a7f22(0x35a) + _0x39bb09 + _0x3a7f22(0x361) + _0x4f1ce2[_0x3a7f22(0x3c1)][_0x3a7f22(0x1f7)]);
      } else {
        if (_0x2c7038 === _0x3a7f22(0x261)) {
          _0x1b7874 && (clearTimeout(_0x1b7874['timeout']), pendingGuilds['delete'](_0x524434));
          try {
            await _0x4f1ce2['update']({
              'embeds': [new EmbedBuilder()['setColor'](0xff0000)[_0x3a7f22(0x25b)](_0x3a7f22(0x3ca) + _0x3a7f22(0x386))[_0x3a7f22(0x3c2) + _0x3a7f22(0x32f)](_0x3a7f22(0x194) + _0x3a7f22(0x29b) + _0x39bb09 + ('**.\x0aTừ\x20chố' + _0x3a7f22(0x3d4)) + _0x4f1ce2[_0x3a7f22(0x3c1)][_0x3a7f22(0x1f7)])['setTimesta' + 'mp']()],
              'components': []
            });
          } catch {
            await _0x4f1ce2[_0x3a7f22(0x29c)]({
              'content': _0x3a7f22(0x264) + _0x3a7f22(0x3bd) + _0x39bb09 + _0x3a7f22(0x201),
              'flags': 0x40
            });
          }
          for (const _0x5019ae of OWNER_IDS) {
            if (_0x5019ae === _0x99ab92) continue;
            try {
              const _0x2f59e7 = await client[_0x3a7f22(0x239)][_0x3a7f22(0x3e7)](_0x5019ae, {
                'force': !![]
              });
              await (await _0x2f59e7[_0x3a7f22(0x24d)]())[_0x3a7f22(0x14f)]({
                'embeds': [new EmbedBuilder()['setColor'](0xff0000)[_0x3a7f22(0x25b)](_0x3a7f22(0x400) + 'ã\x20bị\x20từ\x20ch' + 'ối')[_0x3a7f22(0x3c2) + _0x3a7f22(0x32f)]('**' + _0x39bb09 + ('**\x20đã\x20bị\x20*' + '*') + _0x4f1ce2['user']['tag'] + (_0x3a7f22(0x1df) + '.'))[_0x3a7f22(0x358) + 'mp']()]
              });
            } catch {}
          }
          if (_0x4911f0) await safeLeave(_0x4911f0, _0x3a7f22(0x265) + _0x3a7f22(0x1c1) + _0x4f1ce2[_0x3a7f22(0x3c1)][_0x3a7f22(0x1f7)]);
          console[_0x3a7f22(0x1a8)](_0x3a7f22(0x32e) + _0x3a7f22(0x1b3) + '\x22' + _0x39bb09 + _0x3a7f22(0x361) + _0x4f1ce2['user']['tag']);
        }
      }
      return;
    }
    if (_0x511211[_0x3a7f22(0x348)](_0x3a7f22(0x38d))) {
      const _0x591d5b = _0x511211[_0x3a7f22(0x2b2)]('_')[0x1];
      if (_0x99ab92 !== _0x591d5b) return _0x4f1ce2['reply']({
        'content': _0x3a7f22(0x1b2) + _0x3a7f22(0x38f) + '\x20của\x20bạn!',
        'flags': 0x40
      });
      try {
        const _0x3114be = new EmbedBuilder()[_0x3a7f22(0x1a5)](COLORS[_0x3a7f22(0x38c)])[_0x3a7f22(0x25b)](_0x3a7f22(0x19d) + _0x3a7f22(0x353) + _0x3a7f22(0x275))[_0x3a7f22(0x3c2) + _0x3a7f22(0x32f)](_0x3a7f22(0x199) + _0x3a7f22(0x3a3) + _0x3a7f22(0x3ac) + _0x3a7f22(0x34d) + _0x3a7f22(0x375) + _0x3a7f22(0x15c) + _0x3a7f22(0x20a) + (_0x3a7f22(0x1a9) + _0x3a7f22(0x3db) + '://aistudi' + _0x3a7f22(0x2d9) + _0x3a7f22(0x316) + _0x3a7f22(0x1bf)) + ('⏳\x20Bạn\x20có\x20*' + '*2\x20phút**\x20' + _0x3a7f22(0x21c) + _0x3a7f22(0x233)) + ('🔒\x20Token\x20ch' + 'ỉ\x20dùng\x20cho' + _0x3a7f22(0x1e6) + _0x3a7f22(0x2b0) + 'ng\x20lưu\x20vĩn' + _0x3a7f22(0x189)))[_0x3a7f22(0x322)]({
          'text': _0x3a7f22(0x2f9) + 'ken\x20trong\x20' + _0x3a7f22(0x197) + _0x3a7f22(0x1cc) + _0x3a7f22(0x1f3)
        });
        await _0x4f1ce2[_0x3a7f22(0x3c1)]['send']({
          'embeds': [_0x3114be]
        }), awaitingToken['set'](_0x99ab92, {
          'timeout': setTimeout(() => {
            const _0x1c4311 = _0x3a7f22;
            awaitingToken[_0x1c4311(0x2e5)](_0x99ab92);
          }, 0x2 * 0x3c * 0x3e8)
        }), await _0x4f1ce2[_0x3a7f22(0x23e)]({
          'embeds': [new EmbedBuilder()[_0x3a7f22(0x1a5)](COLORS[_0x3a7f22(0x38c)])['setTitle'](_0x3a7f22(0x156) + 'ướng\x20Dẫn!')[_0x3a7f22(0x3c2) + _0x3a7f22(0x32f)](_0x3a7f22(0x14e) + '*tin\x20nhắn\x20' + 'riêng**\x20từ' + '\x20bot\x20và\x20nh' + _0x3a7f22(0x153) + _0x3a7f22(0x381) + _0x3a7f22(0x385) + 'p\x20xong,\x20dù' + _0x3a7f22(0x145) + _0x3a7f22(0x37f))[_0x3a7f22(0x358) + 'mp']()],
          'components': []
        });
      } catch {
        await _0x4f1ce2['update']({
          'embeds': [new EmbedBuilder()[_0x3a7f22(0x1a5)](COLORS[_0x3a7f22(0x137)])[_0x3a7f22(0x25b)](_0x3a7f22(0x32c) + 'ể\x20Gửi\x20DM')[_0x3a7f22(0x3c2) + 'tion']('Hãy\x20bật\x20**' + '\x22Cho\x20phép\x20' + 'tin\x20nhắn\x20r' + _0x3a7f22(0x2f2) + _0x3a7f22(0x2dc) + _0x3a7f22(0x356) + _0x3a7f22(0x2d7) + 'ặt\x20Discord' + _0x3a7f22(0x36a) + _0x3a7f22(0x16a))[_0x3a7f22(0x358) + 'mp']()],
          'components': []
        });
      }
      return;
    }
    if (_0x511211['startsWith'](_0x3a7f22(0x279))) {
      const _0x16d1df = _0x511211['split']('_')[0x1];
      if (_0x99ab92 !== _0x16d1df) return _0x4f1ce2[_0x3a7f22(0x29c)]({
        'content': _0x3a7f22(0x1b2) + _0x3a7f22(0x38f) + _0x3a7f22(0x30f),
        'flags': 0x40
      });
      await _0x4f1ce2[_0x3a7f22(0x23e)]({
        'embeds': [new EmbedBuilder()['setColor'](COLORS[_0x3a7f22(0x137)])[_0x3a7f22(0x25b)](_0x3a7f22(0x1cf))[_0x3a7f22(0x3c2) + _0x3a7f22(0x32f)]('Bạn\x20cần\x20th' + _0x3a7f22(0x24e) + _0x3a7f22(0x185) + 'n**\x20để\x20sử\x20' + _0x3a7f22(0x3c3) + '`/vh`.\x0aDùn' + _0x3a7f22(0x1f9) + _0x3a7f22(0x2e3) + _0x3a7f22(0x2b6) + _0x3a7f22(0x200))[_0x3a7f22(0x358) + 'mp']()],
        'components': []
      });
      return;
    }
    return;
  }
  if (!_0x4f1ce2[_0x3a7f22(0x3e6) + _0x3a7f22(0x2d6)]()) return;
  const {
    commandName: _0x55e315,
    user: _0x31af89,
    member: _0x31ac3e,
    channel: _0x14d458,
    guild: _0x269efc
  } = _0x4f1ce2;
  try {
    if (_0x55e315 === 'vh') {
      const _0x1d6641 = userTokens[_0x3a7f22(0x23d)](_0x31af89['id']);
      if (!_0x1d6641) {
        const _0x3fe4ed = new ActionRowBuilder()['addCompone' + _0x3a7f22(0x3f0)](new ButtonBuilder()[_0x3a7f22(0x2aa) + 'd'](_0x3a7f22(0x38d) + _0x31af89['id'])[_0x3a7f22(0x178)](_0x3a7f22(0x392) + 'n')[_0x3a7f22(0x174)](ButtonStyle['Success']), new ButtonBuilder()[_0x3a7f22(0x2aa) + 'd']('skiptoken_' + _0x31af89['id'])[_0x3a7f22(0x178)](_0x3a7f22(0x150) + 'd')['setStyle'](ButtonStyle[_0x3a7f22(0x3eb)]));
        return safeReply(_0x4f1ce2, {
          'embeds': [createTokenRequestEmbed()],
          'components': [_0x3fe4ed],
          'flags': 0x40
        });
      }
      await _0x4f1ce2['deferReply']({
        'flags': 0x40
      }), await handleVhCommand(_0x4f1ce2, _0x1d6641);
      return;
    }
    if (_0x55e315 === 'kick') {
      if (!_0x31ac3e[_0x3a7f22(0x216) + 's'][_0x3a7f22(0x2ab)](PermissionsBitField[_0x3a7f22(0x31e)]['KickMember' + 's'])) return safeReply(_0x4f1ce2, {
        'content': _0x3a7f22(0x3ae) + _0x3a7f22(0x292) + _0x3a7f22(0x290),
        'flags': 0x40
      });
      const _0x14ccf4 = _0x4f1ce2[_0x3a7f22(0x3d0)][_0x3a7f22(0x3a4)](_0x3a7f22(0x3c1)),
        _0x54f272 = _0x4f1ce2[_0x3a7f22(0x3d0)][_0x3a7f22(0x248)](_0x3a7f22(0x33a)) || _0x3a7f22(0x211) + _0x3a7f22(0x285);
      if (!_0x14ccf4?.[_0x3a7f22(0x2ac)]) return safeReply(_0x4f1ce2, {
        'content': _0x3a7f22(0x37c) + _0x3a7f22(0x26d) + 'ời\x20này!',
        'flags': 0x40
      });
      await _0x14ccf4[_0x3a7f22(0x17e)](_0x54f272), await safeReply(_0x4f1ce2, {
        'content': _0x3a7f22(0x1fc) + '**' + _0x14ccf4[_0x3a7f22(0x3c1)][_0x3a7f22(0x1f7)] + _0x3a7f22(0x2f5) + _0x54f272
      });
    } else {
      if (_0x55e315 === _0x3a7f22(0x1ce)) {
        if (!_0x31ac3e[_0x3a7f22(0x216) + 's'][_0x3a7f22(0x2ab)](PermissionsBitField[_0x3a7f22(0x31e)][_0x3a7f22(0x38b)])) return safeReply(_0x4f1ce2, {
          'content': '❌\x20Bạn\x20khôn' + _0x3a7f22(0x292) + _0x3a7f22(0x399),
          'flags': 0x40
        });
        const _0x5297d1 = _0x4f1ce2[_0x3a7f22(0x3d0)][_0x3a7f22(0x3a4)](_0x3a7f22(0x3c1)),
          _0x4e344a = _0x4f1ce2[_0x3a7f22(0x3d0)][_0x3a7f22(0x248)](_0x3a7f22(0x33a)) || _0x3a7f22(0x211) + _0x3a7f22(0x285);
        if (!_0x5297d1?.['bannable']) return safeReply(_0x4f1ce2, {
          'content': _0x3a7f22(0x37c) + _0x3a7f22(0x335) + _0x3a7f22(0x2d2),
          'flags': 0x40
        });
        await _0x5297d1[_0x3a7f22(0x1ce)]({
          'reason': _0x4e344a
        }), await safeReply(_0x4f1ce2, {
          'content': _0x3a7f22(0x22b) + '*' + _0x5297d1[_0x3a7f22(0x3c1)][_0x3a7f22(0x1f7)] + _0x3a7f22(0x2f5) + _0x4e344a
        });
      } else {
        if (_0x55e315 === _0x3a7f22(0x1db)) {
          if (!_0x31ac3e[_0x3a7f22(0x216) + 's'][_0x3a7f22(0x2ab)](PermissionsBitField['Flags'][_0x3a7f22(0x38b)])) return safeReply(_0x4f1ce2, {
            'content': '❌\x20Bạn\x20khôn' + _0x3a7f22(0x292) + _0x3a7f22(0x15b),
            'flags': 0x40
          });
          const _0x594d50 = _0x4f1ce2[_0x3a7f22(0x3d0)][_0x3a7f22(0x248)](_0x3a7f22(0x142));
          try {
            await _0x269efc[_0x3a7f22(0x338)][_0x3a7f22(0x1db)](_0x594d50), await safeReply(_0x4f1ce2, {
              'content': _0x3a7f22(0x1dd) + _0x3a7f22(0x2b5) + '`' + _0x594d50 + '`'
            });
          } catch {
            await safeReply(_0x4f1ce2, {
              'content': _0x3a7f22(0x2a8) + _0x3a7f22(0x2de) + _0x3a7f22(0x2b3) + 'nh\x20sách\x20ba' + 'n!',
              'flags': 0x40
            });
          }
        } else {
          if (_0x55e315 === _0x3a7f22(0x1c5)) {
            if (!_0x31ac3e['permission' + 's'][_0x3a7f22(0x2ab)](PermissionsBitField[_0x3a7f22(0x31e)]['ModerateMe' + 'mbers'])) return safeReply(_0x4f1ce2, {
              'content': _0x3a7f22(0x3ae) + _0x3a7f22(0x292) + '\x20mute!',
              'flags': 0x40
            });
            const _0x162e86 = _0x4f1ce2[_0x3a7f22(0x3d0)]['getMember']('user'),
              _0x478329 = _0x4f1ce2[_0x3a7f22(0x3d0)][_0x3a7f22(0x378)](_0x3a7f22(0x1e9)),
              _0xce27e4 = _0x4f1ce2[_0x3a7f22(0x3d0)][_0x3a7f22(0x248)]('reason') || 'Không\x20có\x20l' + 'ý\x20do';
            if (!_0x162e86?.[_0x3a7f22(0x227) + 'e']) return safeReply(_0x4f1ce2, {
              'content': _0x3a7f22(0x37c) + _0x3a7f22(0x3c8) + _0x3a7f22(0x1e3),
              'flags': 0x40
            });
            await _0x162e86[_0x3a7f22(0x3dd)](_0x478329 * 0x3c * 0x3e8, _0xce27e4), await safeReply(_0x4f1ce2, {
              'content': '✅\x20Đã\x20mute\x20' + '**' + _0x162e86[_0x3a7f22(0x3c1)]['tag'] + '**\x20trong\x20' + _0x478329 + (_0x3a7f22(0x2be) + 'o:\x20') + _0xce27e4
            });
          } else {
            if (_0x55e315 === _0x3a7f22(0x27d)) {
              if (!_0x31ac3e[_0x3a7f22(0x216) + 's']['has'](PermissionsBitField[_0x3a7f22(0x31e)][_0x3a7f22(0x311) + _0x3a7f22(0x221)])) return safeReply(_0x4f1ce2, {
                'content': _0x3a7f22(0x3ae) + 'g\x20có\x20quyền' + _0x3a7f22(0x20d),
                'flags': 0x40
              });
              const _0x3f8d06 = _0x4f1ce2[_0x3a7f22(0x3d0)][_0x3a7f22(0x3a4)](_0x3a7f22(0x3c1));
              if (!_0x3f8d06?.[_0x3a7f22(0x227) + 'e']) return safeReply(_0x4f1ce2, {
                'content': _0x3a7f22(0x37c) + 'ể\x20unmute\x20n' + _0x3a7f22(0x288),
                'flags': 0x40
              });
              await _0x3f8d06[_0x3a7f22(0x3dd)](null), await safeReply(_0x4f1ce2, {
                'content': '✅\x20Đã\x20gỡ\x20mu' + _0x3a7f22(0x225) + _0x3f8d06[_0x3a7f22(0x3c1)]['tag'] + '**'
              });
            } else {
              if (_0x55e315 === _0x3a7f22(0x226)) {
                if (!_0x31ac3e[_0x3a7f22(0x216) + 's']['has'](PermissionsBitField[_0x3a7f22(0x31e)][_0x3a7f22(0x311) + _0x3a7f22(0x221)])) return safeReply(_0x4f1ce2, {
                  'content': '❌\x20Bạn\x20khôn' + _0x3a7f22(0x292) + '\x20cảnh\x20cáo!',
                  'flags': 0x40
                });
                const _0x3f5ca3 = _0x4f1ce2[_0x3a7f22(0x3d0)][_0x3a7f22(0x1f1)]('user'),
                  _0xa3b9ab = _0x4f1ce2[_0x3a7f22(0x3d0)]['getString'](_0x3a7f22(0x33a)),
                  _0x3d5c53 = loadJSON(WARN_FILE);
                if (!_0x3d5c53[_0x3f5ca3['id']]) _0x3d5c53[_0x3f5ca3['id']] = [];
                _0x3d5c53[_0x3f5ca3['id']]['push']({
                  'reason': _0xa3b9ab,
                  'moderator': _0x31af89[_0x3a7f22(0x1f7)],
                  'timestamp': Date[_0x3a7f22(0x1b1)]()
                }), saveJSON(WARN_FILE, _0x3d5c53), await safeReply(_0x4f1ce2, {
                  'content': '⚠️\x20Đã\x20cảnh\x20' + 'cáo\x20**' + _0x3f5ca3[_0x3a7f22(0x1f7)] + _0x3a7f22(0x2f5) + _0xa3b9ab + (_0x3a7f22(0x148) + 's:\x20**') + _0x3d5c53[_0x3f5ca3['id']][_0x3a7f22(0x17a)] + '**'
                });
              } else {
                if (_0x55e315 === _0x3a7f22(0x34e)) {
                  const _0x278bcf = _0x4f1ce2[_0x3a7f22(0x3d0)][_0x3a7f22(0x1f1)](_0x3a7f22(0x3c1)),
                    _0x58f662 = loadJSON(WARN_FILE),
                    _0x53356a = _0x58f662[_0x278bcf['id']];
                  if (!_0x53356a?.[_0x3a7f22(0x17a)]) return safeReply(_0x4f1ce2, {
                    'content': _0x3a7f22(0x19e) + _0x278bcf['tag'] + (_0x3a7f22(0x37a) + _0x3a7f22(0x2a3) + _0x3a7f22(0x23f)),
                    'flags': 0x40
                  });
                  const _0x126f58 = _0x53356a[_0x3a7f22(0x266)]((_0x48dc70, _0x258f69) => '**' + (_0x258f69 + 0x1) + _0x3a7f22(0x319) + _0x48dc70[_0x3a7f22(0x33a)] + _0x3a7f22(0x13a) + _0x48dc70[_0x3a7f22(0x1d1)] + _0x3a7f22(0x2ba) + new Date(_0x48dc70[_0x3a7f22(0x214)])['toLocaleSt' + 'ring'](_0x3a7f22(0x3fe)))[_0x3a7f22(0x2fb)]('\x0a\x0a');
                  await safeReply(_0x4f1ce2, {
                    'embeds': [new EmbedBuilder()[_0x3a7f22(0x1a5)](0xffff00)[_0x3a7f22(0x25b)](_0x3a7f22(0x299) + _0x3a7f22(0x363) + _0x278bcf[_0x3a7f22(0x1f7)])[_0x3a7f22(0x3c2) + _0x3a7f22(0x32f)](_0x126f58)[_0x3a7f22(0x322)]({
                      'text': _0x3a7f22(0x3b4) + _0x53356a[_0x3a7f22(0x17a)] + _0x3a7f22(0x3a0)
                    })]
                  });
                } else {
                  if (_0x55e315 === 'clearwarns') {
                    if (!_0x31ac3e[_0x3a7f22(0x216) + 's'][_0x3a7f22(0x2ab)](PermissionsBitField[_0x3a7f22(0x31e)]['Administra' + 'tor'])) return safeReply(_0x4f1ce2, {
                      'content': _0x3a7f22(0x3ae) + _0x3a7f22(0x292) + '\x20xóa\x20warns' + '!',
                      'flags': 0x40
                    });
                    const _0x5bdcff = _0x4f1ce2[_0x3a7f22(0x3d0)]['getUser']('user'),
                      _0x39e1ec = loadJSON(WARN_FILE);
                    delete _0x39e1ec[_0x5bdcff['id']], saveJSON(WARN_FILE, _0x39e1ec), await safeReply(_0x4f1ce2, {
                      'content': _0x3a7f22(0x255) + _0x3a7f22(0x208) + _0x3a7f22(0x243) + '*' + _0x5bdcff['tag'] + '**'
                    });
                  } else {
                    if (_0x55e315 === 'clear') {
                      if (!_0x31ac3e[_0x3a7f22(0x216) + 's'][_0x3a7f22(0x2ab)](PermissionsBitField[_0x3a7f22(0x31e)][_0x3a7f22(0x304) + 'ages'])) return safeReply(_0x4f1ce2, {
                        'content': _0x3a7f22(0x3ae) + _0x3a7f22(0x292) + _0x3a7f22(0x2c1) + _0x3a7f22(0x244),
                        'flags': 0x40
                      });
                      const _0x4a865c = _0x4f1ce2[_0x3a7f22(0x3d0)][_0x3a7f22(0x378)](_0x3a7f22(0x1ab));
                      try {
                        const _0x54e594 = await _0x14d458['bulkDelete'](_0x4a865c, !![]);
                        await safeReply(_0x4f1ce2, {
                          'content': _0x3a7f22(0x2f8) + '*' + _0x54e594[_0x3a7f22(0x1bc)] + (_0x3a7f22(0x170) + 'n!'),
                          'flags': 0x40
                        });
                      } catch {
                        await safeReply(_0x4f1ce2, {
                          'content': _0x3a7f22(0x37c) + _0x3a7f22(0x165) + 'nhắn\x20(quá\x20' + _0x3a7f22(0x23b) + _0x3a7f22(0x15f),
                          'flags': 0x40
                        });
                      }
                    } else {
                      if (_0x55e315 === _0x3a7f22(0x31d)) {
                        const _0x634238 = _0x4f1ce2['options']['getUser'](_0x3a7f22(0x3c1)) || _0x31af89;
                        await safeReply(_0x4f1ce2, {
                          'embeds': [new EmbedBuilder()['setColor'](0x99ff)[_0x3a7f22(0x25b)](_0x3a7f22(0x2fc) + _0x3a7f22(0x339) + _0x634238[_0x3a7f22(0x1f7)])[_0x3a7f22(0x20c)](_0x634238[_0x3a7f22(0x3b8) + _0x3a7f22(0x272)]({
                            'dynamic': !![],
                            'size': 0x400
                          }))]
                        });
                      } else {
                        if (_0x55e315 === _0x3a7f22(0x295)) await safeReply(_0x4f1ce2, {
                          'embeds': [new EmbedBuilder()[_0x3a7f22(0x1a5)](0x99ff)[_0x3a7f22(0x25b)](_0x3a7f22(0x391) + _0x269efc[_0x3a7f22(0x3cd)])[_0x3a7f22(0x387) + 'il'](_0x269efc[_0x3a7f22(0x18a)]({
                            'dynamic': !![]
                          }))[_0x3a7f22(0x306)]({
                            'name': '👑\x20Owner',
                            'value': '<@' + _0x269efc[_0x3a7f22(0x1bb)] + '>',
                            'inline': !![]
                          }, {
                            'name': '👥\x20Thành\x20vi' + 'ên',
                            'value': '' + _0x269efc[_0x3a7f22(0x2f7) + 't'],
                            'inline': !![]
                          }, {
                            'name': _0x3a7f22(0x372),
                            'value': '<t:' + Math[_0x3a7f22(0x17d)](_0x269efc[_0x3a7f22(0x217) + _0x3a7f22(0x1c6)] / 0x3e8) + _0x3a7f22(0x2ce),
                            'inline': !![]
                          }, {
                            'name': '✨\x20Boost\x20Le' + 'vel',
                            'value': '' + _0x269efc[_0x3a7f22(0x20f) + 'r'],
                            'inline': !![]
                          }, {
                            'name': '💎\x20Số\x20Boost',
                            'value': '' + (_0x269efc[_0x3a7f22(0x268) + _0x3a7f22(0x2c9) + _0x3a7f22(0x3df)] || 0x0),
                            'inline': !![]
                          }, {
                            'name': _0x3a7f22(0x157),
                            'value': '' + _0x269efc['roles']['cache']['size'],
                            'inline': !![]
                          })['setFooter']({
                            'text': 'Server\x20ID:' + '\x20' + _0x269efc['id']
                          })[_0x3a7f22(0x358) + 'mp']()]
                        });
                        else {
                          if (_0x55e315 === _0x3a7f22(0x20e)) {
                            const _0x23e9f8 = _0x4f1ce2[_0x3a7f22(0x3d0)]['getUser'](_0x3a7f22(0x3c1)) || _0x31af89,
                              _0x5e2045 = await _0x269efc['members'][_0x3a7f22(0x3e7)](_0x23e9f8['id'])[_0x3a7f22(0x276)](() => null);
                            if (!_0x5e2045) return safeReply(_0x4f1ce2, {
                              'content': _0x3a7f22(0x2a8) + _0x3a7f22(0x26f) + _0x3a7f22(0x27a) + 'y!',
                              'flags': 0x40
                            });
                            const _0x3a64cd = _0x5e2045['roles'][_0x3a7f22(0x325)][_0x3a7f22(0x3a7)](_0x45277a => _0x45277a['id'] !== _0x269efc['id'])[_0x3a7f22(0x323)]((_0x287476, _0x115ef5) => _0x115ef5[_0x3a7f22(0x16f)] - _0x287476[_0x3a7f22(0x16f)])['map'](_0xa0e35d => '<@&' + _0xa0e35d['id'] + '>');
                            let _0x2888b5 = _0x3a64cd[_0x3a7f22(0x2fb)](',\x20') || 'Không\x20có\x20r' + _0x3a7f22(0x206);
                            if (_0x2888b5['length'] > 0x400) _0x2888b5 = _0x3a64cd[_0x3a7f22(0x31c)](0x0, 0x5)[_0x3a7f22(0x2fb)](',\x20') + (_0x3a7f22(0x32a) + (_0x3a64cd[_0x3a7f22(0x17a)] - 0x5) + (_0x3a7f22(0x35f) + _0x3a7f22(0x369)));
                            await safeReply(_0x4f1ce2, {
                              'embeds': [new EmbedBuilder()[_0x3a7f22(0x1a5)](0x99ff)[_0x3a7f22(0x25b)](_0x3a7f22(0x1de) + _0x23e9f8[_0x3a7f22(0x1f7)])['setThumbna' + 'il'](_0x23e9f8['displayAva' + _0x3a7f22(0x272)]({
                                'dynamic': !![]
                              }))[_0x3a7f22(0x306)]({
                                'name': _0x3a7f22(0x30b),
                                'value': _0x23e9f8['id'],
                                'inline': !![]
                              }, {
                                'name': _0x3a7f22(0x3b3),
                                'value': _0x5e2045[_0x3a7f22(0x38e)] || _0x3a7f22(0x231),
                                'inline': !![]
                              }, {
                                'name': '🤖\x20Bot',
                                'value': _0x23e9f8[_0x3a7f22(0x1b9)] ? 'Có' : _0x3a7f22(0x32b),
                                'inline': !![]
                              }, {
                                'name': _0x3a7f22(0x176),
                                'value': _0x3a7f22(0x3ab) + Math[_0x3a7f22(0x17d)](_0x23e9f8['createdTim' + _0x3a7f22(0x1c6)] / 0x3e8) + _0x3a7f22(0x2ce),
                                'inline': !![]
                              }, {
                                'name': '📥\x20Vào\x20serv' + 'er',
                                'value': _0x3a7f22(0x3ab) + Math[_0x3a7f22(0x17d)](_0x5e2045[_0x3a7f22(0x25d) + _0x3a7f22(0x390)] / 0x3e8) + _0x3a7f22(0x2ce),
                                'inline': !![]
                              }, {
                                'name': _0x3a7f22(0x157),
                                'value': _0x2888b5,
                                'inline': ![]
                              })[_0x3a7f22(0x322)]({
                                'text': _0x3a7f22(0x163) + _0x23e9f8['id']
                              })[_0x3a7f22(0x358) + 'mp']()]
                            });
                          } else {
                            if (_0x55e315 === _0x3a7f22(0x18c)) {
                              const _0x2c0132 = _0x4f1ce2[_0x3a7f22(0x3d0)][_0x3a7f22(0x248)](_0x3a7f22(0x250)),
                                _0x35e1eb = [_0x3a7f22(0x2c5) + _0x3a7f22(0x2b9), _0x3a7f22(0x202) + _0x3a7f22(0x3e4) + _0x3a7f22(0x19f), _0x3a7f22(0x3a6) + _0x3a7f22(0x22e), '🟡\x20Có\x20vẻ\x20tố' + _0x3a7f22(0x293), _0x3a7f22(0x190) + _0x3a7f22(0x28e), _0x3a7f22(0x2e7) + '..', '❌\x20Không\x20ch' + _0x3a7f22(0x253), _0x3a7f22(0x257), '❌\x20Không\x20đờ' + _0x3a7f22(0x138)];
                              await safeReply(_0x4f1ce2, {
                                'embeds': [new EmbedBuilder()[_0x3a7f22(0x1a5)](0x99ff)[_0x3a7f22(0x25b)](_0x3a7f22(0x3e5) + _0x3a7f22(0x2c3))['addFields']({
                                  'name': _0x3a7f22(0x260),
                                  'value': _0x2c0132
                                }, {
                                  'name': _0x3a7f22(0x30c),
                                  'value': _0x35e1eb[Math[_0x3a7f22(0x17d)](Math[_0x3a7f22(0x1ac)]() * _0x35e1eb[_0x3a7f22(0x17a)])]
                                })]
                              });
                            } else {
                              if (_0x55e315 === _0x3a7f22(0x3da)) await safeReply(_0x4f1ce2, {
                                'content': _0x3a7f22(0x3ef) + '*' + (Math['random']() < 0.5 ? _0x3a7f22(0x2fa) : _0x3a7f22(0x3b0)) + '**'
                              });
                              else {
                                if (_0x55e315 === _0x3a7f22(0x2e6)) {
                                  const _0x4886c6 = _0x4f1ce2[_0x3a7f22(0x3d0)][_0x3a7f22(0x378)](_0x3a7f22(0x20b)) || 0x6,
                                    _0x380351 = Math[_0x3a7f22(0x17d)](Math[_0x3a7f22(0x1ac)]() * _0x4886c6) + 0x1;
                                  await safeReply(_0x4f1ce2, {
                                    'content': _0x3a7f22(0x18d) + _0x3a7f22(0x35b) + _0x380351 + _0x3a7f22(0x2a6) + _0x4886c6
                                  });
                                } else {
                                  if (_0x55e315 === 'say') {
                                    const _0x2e228a = _0x4f1ce2[_0x3a7f22(0x3d0)][_0x3a7f22(0x248)](_0x3a7f22(0x1e0));
                                    await safeReply(_0x4f1ce2, {
                                      'content': '✅\x20Đã\x20gửi!',
                                      'flags': 0x40
                                    }), await _0x14d458[_0x3a7f22(0x14f)](_0x2e228a);
                                  } else {
                                    if (_0x55e315 === _0x3a7f22(0x1b5)) {
                                      const _0x348bc8 = _0x4f1ce2['options']['getString']('question'),
                                        _0x5264f4 = [_0x4f1ce2[_0x3a7f22(0x3d0)][_0x3a7f22(0x248)](_0x3a7f22(0x167)), _0x4f1ce2['options']['getString'](_0x3a7f22(0x2e2)), _0x4f1ce2[_0x3a7f22(0x3d0)][_0x3a7f22(0x248)](_0x3a7f22(0x1d0)), _0x4f1ce2[_0x3a7f22(0x3d0)][_0x3a7f22(0x248)](_0x3a7f22(0x2f4))]['filter'](Boolean),
                                        _0x54dd33 = [_0x3a7f22(0x19c), '2️⃣', _0x3a7f22(0x33b), _0x3a7f22(0x343)],
                                        _0x48ac0c = await _0x14d458['send']({
                                          'embeds': [new EmbedBuilder()[_0x3a7f22(0x1a5)](0x99ff)[_0x3a7f22(0x25b)](_0x3a7f22(0x289) + 'n')[_0x3a7f22(0x3c2) + _0x3a7f22(0x32f)]('**' + _0x348bc8 + _0x3a7f22(0x204) + _0x5264f4[_0x3a7f22(0x266)]((_0x3bcc2a, _0x57e386) => _0x54dd33[_0x57e386] + '\x20' + _0x3bcc2a)[_0x3a7f22(0x2fb)]('\x0a'))[_0x3a7f22(0x322)]({
                                            'text': _0x3a7f22(0x1fe) + _0x31af89['tag']
                                          })[_0x3a7f22(0x358) + 'mp']()]
                                        });
                                      for (let _0xa26f00 = 0x0; _0xa26f00 < _0x5264f4[_0x3a7f22(0x17a)]; _0xa26f00++) await _0x48ac0c['react'](_0x54dd33[_0xa26f00]);
                                      await safeReply(_0x4f1ce2, {
                                        'content': _0x3a7f22(0x179) + _0x3a7f22(0x1fa),
                                        'flags': 0x40
                                      });
                                    } else {
                                      if (_0x55e315 === _0x3a7f22(0x3f9)) await safeReply(_0x4f1ce2, {
                                        'content': _0x31ac3e[_0x3a7f22(0x2ee)][_0x3a7f22(0x325)][_0x3a7f22(0x2ab)](ADMIN_ROLE_ID) ? _0x3a7f22(0x3dc) + _0x3a7f22(0x3b2) + 'yền\x20admin!' : '❌\x20con\x20cac\x20' + _0x3a7f22(0x3b7)
                                      });
                                      else {
                                        if (_0x55e315 === _0x3a7f22(0x26b)) {
                                          await _0x4f1ce2['reply']({
                                            'content': _0x3a7f22(0x195) + 'g...'
                                          });
                                          const _0x5de38f = client['ws'][_0x3a7f22(0x26b)];
                                          await _0x4f1ce2[_0x3a7f22(0x1ae)]({
                                            'content': null,
                                            'embeds': [new EmbedBuilder()[_0x3a7f22(0x1a5)](_0x5de38f < 0x64 ? 0xff00 : _0x5de38f < 0xc8 ? 0xffff00 : 0xff0000)[_0x3a7f22(0x25b)](_0x3a7f22(0x313))[_0x3a7f22(0x306)]({
                                              'name': _0x3a7f22(0x34a),
                                              'value': Math['round'](_0x5de38f) + 'ms',
                                              'inline': !![]
                                            })]
                                          });
                                        } else _0x55e315 === _0x3a7f22(0x309) && await safeReply(_0x4f1ce2, {
                                          'embeds': [new EmbedBuilder()[_0x3a7f22(0x1a5)](0x99ff)[_0x3a7f22(0x25b)](_0x3a7f22(0x342) + _0x3a7f22(0x192))[_0x3a7f22(0x306)]({
                                            'name': _0x3a7f22(0x16c) + 'on',
                                            'value': _0x3a7f22(0x2c8) + _0x3a7f22(0x3f8) + _0x3a7f22(0x1d2) + _0x3a7f22(0x2fe) + '`\x20`/warn`\x20' + _0x3a7f22(0x187) + _0x3a7f22(0x2b1) + _0x3a7f22(0x177) + _0x3a7f22(0x3c4)
                                          }, {
                                            'name': _0x3a7f22(0x327) + 'fo',
                                            'value': _0x3a7f22(0x27b) + '`/serverin' + _0x3a7f22(0x2df) + _0x3a7f22(0x34f) + _0x3a7f22(0x3be) + _0x3a7f22(0x236) + 'oll`\x20`/say' + _0x3a7f22(0x27c)
                                          }, {
                                            'name': '🤖\x20AI',
                                            'value': _0x3a7f22(0x360) + _0x3a7f22(0x25f) + _0x3a7f22(0x3d3) + _0x3a7f22(0x1ff) + _0x3a7f22(0x162) + '\x20API\x20Key)'
                                          }, {
                                            'name': _0x3a7f22(0x1ee),
                                            'value': '`/ping`\x20`/' + _0x3a7f22(0x371)
                                          })['setFooter']({
                                            'text': 'Dùng\x20/\x20để\x20' + _0x3a7f22(0x16d)
                                          })[_0x3a7f22(0x358) + 'mp']()]
                                        });
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  } catch (_0x157b28) {
    console[_0x3a7f22(0x3a8)](_0x3a7f22(0x30a) + _0x55e315 + ':', _0x157b28), await safeReply(_0x4f1ce2, {
      'content': _0x3a7f22(0x36e) + _0x3a7f22(0x1a7) + _0x3a7f22(0x23c) + _0x3a7f22(0x2ec),
      'flags': 0x40
    });
  }
}), client['on'](_0x533b3f(0x349) + 'ate', async _0x3fc1a0 => {
  const _0x178622 = _0x533b3f;
  if (_0x3fc1a0[_0x178622(0x383)][_0x178622(0x1b9)]) return;
  if (!_0x3fc1a0[_0x178622(0x1af)]) {
    const _0x4fa8db = awaitingToken[_0x178622(0x23d)](_0x3fc1a0[_0x178622(0x383)]['id']);
    if (_0x4fa8db) {
      const _0x2e4ee9 = _0x3fc1a0[_0x178622(0x315)][_0x178622(0x3c9)]();
      clearTimeout(_0x4fa8db[_0x178622(0x3dd)]), awaitingToken['delete'](_0x3fc1a0[_0x178622(0x383)]['id']), userTokens[_0x178622(0x308)](_0x3fc1a0[_0x178622(0x383)]['id'], _0x2e4ee9), await _0x3fc1a0[_0x178622(0x29c)]({
        'embeds': [new EmbedBuilder()[_0x178622(0x1a5)](COLORS[_0x178622(0x38c)])[_0x178622(0x25b)](_0x178622(0x1fd) + '\x20Được\x20Lưu!')[_0x178622(0x3c2) + 'tion']('API\x20Key\x20củ' + _0x178622(0x218) + _0x178622(0x196) + _0x178622(0x36f) + _0x178622(0x2d1) + 'erver\x20và\x20d' + _0x178622(0x141) + _0x178622(0x39b))['setTimesta' + 'mp']()]
      });
      return;
    }
    return;
  }
  console[_0x178622(0x1a8)]('[' + _0x3fc1a0[_0x178622(0x1af)][_0x178622(0x3cd)] + ']\x20' + _0x3fc1a0['author'][_0x178622(0x1f7)] + ':\x20' + _0x3fc1a0[_0x178622(0x315)]);
}), client['on']('guildMembe' + _0x533b3f(0x183), async _0xff24d4 => {
  const _0x5e06ac = _0x533b3f,
    _0x1e296b = Date[_0x5e06ac(0x1b1)]() - _0xff24d4['user'][_0x5e06ac(0x217) + _0x5e06ac(0x1c6)];
  if (_0x1e296b < 0x3 * 0x18 * 0x3c * 0x3c * 0x3e8) try {
    await _0xff24d4[_0x5e06ac(0x17e)]('Anti-Clone' + _0x5e06ac(0x234) + _0x5e06ac(0x3cf)), console['log'](_0x5e06ac(0x35d) + _0x5e06ac(0x2c2) + _0xff24d4[_0x5e06ac(0x3c1)][_0x5e06ac(0x1f7)] + '\x20(' + Math[_0x5e06ac(0x17d)](_0x1e296b / 0x5265c00) + ('\x20ngày\x20tuổi' + ')'));
  } catch (_0x2a8cdb) {
    console[_0x5e06ac(0x3a8)](_0x5e06ac(0x35d) + _0x5e06ac(0x173) + _0x5e06ac(0x2eb) + _0xff24d4[_0x5e06ac(0x3c1)]['tag'] + ':', _0x2a8cdb[_0x5e06ac(0x1e0)]);
  }
}), client[_0x533b3f(0x1e4)](_0x533b3f(0x301), async () => {
  const _0x35b88a = _0x533b3f;
  console[_0x35b88a(0x1a8)](_0x35b88a(0x2c4) + _0x35b88a(0x164) + client[_0x35b88a(0x3c1)][_0x35b88a(0x1f7)]), console[_0x35b88a(0x1a8)]('✅\x20Owner\x20ID' + _0x35b88a(0x2c0) + OWNER_IDS['length'] + _0x35b88a(0x14c) + OWNER_IDS[_0x35b88a(0x2fb)](',\x20')), client[_0x35b88a(0x3c1)]['setActivit' + 'y'](_0x35b88a(0x21e) + _0x35b88a(0x1c0), {
    'type': ActivityType[_0x35b88a(0x3c0)]
  });
  const _0x1c5b8d = [new SlashCommandBuilder()[_0x35b88a(0x193)]('vh')['setDescrip' + _0x35b88a(0x32f)]('Việt\x20hóa\x20f' + _0x35b88a(0x1d9) + _0x35b88a(0x395) + 'necraft')[_0x35b88a(0x302) + _0x35b88a(0x238)](_0x5c1508 => _0x5c1508[_0x35b88a(0x193)](_0x35b88a(0x3a5))[_0x35b88a(0x3c2) + _0x35b88a(0x32f)](_0x35b88a(0x333) + 'iệt\x20hóa\x20(.' + _0x35b88a(0x30e) + _0x35b88a(0x140) + '.)')['setRequire' + 'd'](!![])), new SlashCommandBuilder()['setName'](_0x35b88a(0x17e))[_0x35b88a(0x3c2) + _0x35b88a(0x32f)](_0x35b88a(0x2ad) + _0x35b88a(0x2b4))['addUserOpt' + _0x35b88a(0x367)](_0x5827e9 => _0x5827e9[_0x35b88a(0x193)](_0x35b88a(0x3c1))['setDescrip' + _0x35b88a(0x32f)](_0x35b88a(0x18e) + _0x35b88a(0x17e))['setRequire' + 'd'](!![]))[_0x35b88a(0x13d) + _0x35b88a(0x2f6)](_0x1ba3ee => _0x1ba3ee[_0x35b88a(0x193)](_0x35b88a(0x33a))[_0x35b88a(0x3c2) + 'tion']('Lý\x20do')), new SlashCommandBuilder()[_0x35b88a(0x193)](_0x35b88a(0x1ce))[_0x35b88a(0x3c2) + _0x35b88a(0x32f)](_0x35b88a(0x3f4) + _0x35b88a(0x321))['addUserOpt' + 'ion'](_0x7dae07 => _0x7dae07[_0x35b88a(0x193)](_0x35b88a(0x3c1))['setDescrip' + _0x35b88a(0x32f)](_0x35b88a(0x18e) + _0x35b88a(0x1ce))['setRequire' + 'd'](!![]))['addStringO' + 'ption'](_0x636dd3 => _0x636dd3[_0x35b88a(0x193)](_0x35b88a(0x33a))[_0x35b88a(0x3c2) + _0x35b88a(0x32f)]('Lý\x20do')), new SlashCommandBuilder()[_0x35b88a(0x193)](_0x35b88a(0x1db))[_0x35b88a(0x3c2) + _0x35b88a(0x32f)](_0x35b88a(0x18b))['addStringO' + _0x35b88a(0x2f6)](_0x4e54e4 => _0x4e54e4[_0x35b88a(0x193)](_0x35b88a(0x142))[_0x35b88a(0x3c2) + _0x35b88a(0x32f)]('ID\x20người\x20c' + _0x35b88a(0x340))[_0x35b88a(0x31b) + 'd'](!![])), new SlashCommandBuilder()[_0x35b88a(0x193)](_0x35b88a(0x1c5))['setDescrip' + _0x35b88a(0x32f)](_0x35b88a(0x382) + _0x35b88a(0x171))['addUserOpt' + _0x35b88a(0x367)](_0x93e430 => _0x93e430[_0x35b88a(0x193)]('user')['setDescrip' + _0x35b88a(0x32f)](_0x35b88a(0x18e) + _0x35b88a(0x1c5))['setRequire' + 'd'](!![]))[_0x35b88a(0x1f2) + _0x35b88a(0x191)](_0x4b9c78 => _0x4b9c78[_0x35b88a(0x193)](_0x35b88a(0x1e9))[_0x35b88a(0x3c2) + 'tion'](_0x35b88a(0x3bc) + _0x35b88a(0x256))[_0x35b88a(0x31b) + 'd'](!![])[_0x35b88a(0x3a2) + 'e'](0x1)['setMaxValu' + 'e'](0x9d80))[_0x35b88a(0x13d) + _0x35b88a(0x2f6)](_0x1324cf => _0x1324cf[_0x35b88a(0x193)](_0x35b88a(0x33a))[_0x35b88a(0x3c2) + _0x35b88a(0x32f)]('Lý\x20do')), new SlashCommandBuilder()[_0x35b88a(0x193)](_0x35b88a(0x27d))[_0x35b88a(0x3c2) + _0x35b88a(0x32f)](_0x35b88a(0x37e))[_0x35b88a(0x146) + _0x35b88a(0x367)](_0x3bcae5 => _0x3bcae5[_0x35b88a(0x193)](_0x35b88a(0x3c1))[_0x35b88a(0x3c2) + 'tion'](_0x35b88a(0x18e) + _0x35b88a(0x331))[_0x35b88a(0x31b) + 'd'](!![])), new SlashCommandBuilder()[_0x35b88a(0x193)](_0x35b88a(0x226))[_0x35b88a(0x3c2) + _0x35b88a(0x32f)](_0x35b88a(0x3cc) + _0x35b88a(0x2b4))[_0x35b88a(0x146) + _0x35b88a(0x367)](_0xa07b92 => _0xa07b92[_0x35b88a(0x193)](_0x35b88a(0x3c1))[_0x35b88a(0x3c2) + _0x35b88a(0x32f)](_0x35b88a(0x18e) + 'cảnh\x20cáo')[_0x35b88a(0x31b) + 'd'](!![]))[_0x35b88a(0x13d) + 'ption'](_0x10024e => _0x10024e[_0x35b88a(0x193)](_0x35b88a(0x33a))[_0x35b88a(0x3c2) + _0x35b88a(0x32f)](_0x35b88a(0x294))['setRequire' + 'd'](!![])), new SlashCommandBuilder()[_0x35b88a(0x193)](_0x35b88a(0x34e))[_0x35b88a(0x3c2) + _0x35b88a(0x32f)](_0x35b88a(0x3d2) + _0x35b88a(0x249))[_0x35b88a(0x146) + 'ion'](_0x24ade9 => _0x24ade9[_0x35b88a(0x193)](_0x35b88a(0x3c1))[_0x35b88a(0x3c2) + 'tion']('Người\x20cần\x20' + _0x35b88a(0x1d4))[_0x35b88a(0x31b) + 'd'](!![])), new SlashCommandBuilder()[_0x35b88a(0x193)]('clearwarns')[_0x35b88a(0x3c2) + _0x35b88a(0x32f)](_0x35b88a(0x1d8) + _0x35b88a(0x3a0))[_0x35b88a(0x146) + _0x35b88a(0x367)](_0x417107 => _0x417107[_0x35b88a(0x193)]('user')['setDescrip' + _0x35b88a(0x32f)](_0x35b88a(0x18e) + _0x35b88a(0x24a))[_0x35b88a(0x31b) + 'd'](!![])), new SlashCommandBuilder()[_0x35b88a(0x193)](_0x35b88a(0x2fd))['setDescrip' + _0x35b88a(0x32f)](_0x35b88a(0x203) + 'ắn')[_0x35b88a(0x1f2) + 'Option'](_0x2d9e9c => _0x2d9e9c['setName'](_0x35b88a(0x1ab))[_0x35b88a(0x3c2) + _0x35b88a(0x32f)](_0x35b88a(0x144) + _0x35b88a(0x280))['setRequire' + 'd'](!![])[_0x35b88a(0x3a2) + 'e'](0x1)['setMaxValu' + 'e'](0x64)), new SlashCommandBuilder()['setName']('avatar')['setDescrip' + _0x35b88a(0x32f)]('Xem\x20avatar')['addUserOpt' + _0x35b88a(0x367)](_0x2cf82a => _0x2cf82a[_0x35b88a(0x193)]('user')[_0x35b88a(0x3c2) + 'tion'](_0x35b88a(0x18e) + _0x35b88a(0x1d4))), new SlashCommandBuilder()[_0x35b88a(0x193)]('serverinfo')[_0x35b88a(0x3c2) + 'tion'](_0x35b88a(0x27f) + _0x35b88a(0x35e)), new SlashCommandBuilder()[_0x35b88a(0x193)](_0x35b88a(0x20e))[_0x35b88a(0x3c2) + _0x35b88a(0x32f)](_0x35b88a(0x27f) + _0x35b88a(0x3c1))[_0x35b88a(0x146) + _0x35b88a(0x367)](_0x2ff258 => _0x2ff258[_0x35b88a(0x193)](_0x35b88a(0x3c1))[_0x35b88a(0x3c2) + _0x35b88a(0x32f)](_0x35b88a(0x18e) + 'xem')), new SlashCommandBuilder()[_0x35b88a(0x193)](_0x35b88a(0x18c))[_0x35b88a(0x3c2) + _0x35b88a(0x32f)]('Magic\x208-Ba' + 'll')['addStringO' + _0x35b88a(0x2f6)](_0x11abd7 => _0x11abd7[_0x35b88a(0x193)](_0x35b88a(0x250))[_0x35b88a(0x3c2) + _0x35b88a(0x32f)](_0x35b88a(0x312))['setRequire' + 'd'](!![])), new SlashCommandBuilder()['setName'](_0x35b88a(0x3da))[_0x35b88a(0x3c2) + _0x35b88a(0x32f)](_0x35b88a(0x388) + 'xu'), new SlashCommandBuilder()['setName'](_0x35b88a(0x2e6))[_0x35b88a(0x3c2) + 'tion'](_0x35b88a(0x1da) + 'ắc')['addInteger' + 'Option'](_0x41a99a => _0x41a99a['setName'](_0x35b88a(0x20b))[_0x35b88a(0x3c2) + _0x35b88a(0x32f)]('Số\x20mặt')[_0x35b88a(0x3a2) + 'e'](0x2)['setMaxValu' + 'e'](0x64)), new SlashCommandBuilder()['setName'](_0x35b88a(0x22d))[_0x35b88a(0x3c2) + _0x35b88a(0x32f)](_0x35b88a(0x3d1))[_0x35b88a(0x13d) + _0x35b88a(0x2f6)](_0xcf55f6 => _0xcf55f6[_0x35b88a(0x193)](_0x35b88a(0x1e0))[_0x35b88a(0x3c2) + _0x35b88a(0x32f)](_0x35b88a(0x3de))[_0x35b88a(0x31b) + 'd'](!![])), new SlashCommandBuilder()[_0x35b88a(0x193)]('poll')[_0x35b88a(0x3c2) + _0x35b88a(0x32f)](_0x35b88a(0x3c5) + _0x35b88a(0x29f))[_0x35b88a(0x13d) + _0x35b88a(0x2f6)](_0x540a51 => _0x540a51[_0x35b88a(0x193)](_0x35b88a(0x250))[_0x35b88a(0x3c2) + _0x35b88a(0x32f)](_0x35b88a(0x312))[_0x35b88a(0x31b) + 'd'](!![]))[_0x35b88a(0x13d) + _0x35b88a(0x2f6)](_0x2a0d18 => _0x2a0d18[_0x35b88a(0x193)](_0x35b88a(0x167))['setDescrip' + _0x35b88a(0x32f)](_0x35b88a(0x1f0))[_0x35b88a(0x31b) + 'd'](!![]))['addStringO' + 'ption'](_0x6e83e2 => _0x6e83e2[_0x35b88a(0x193)](_0x35b88a(0x2e2))[_0x35b88a(0x3c2) + _0x35b88a(0x32f)](_0x35b88a(0x39e))[_0x35b88a(0x31b) + 'd'](!![]))['addStringO' + _0x35b88a(0x2f6)](_0x577c84 => _0x577c84[_0x35b88a(0x193)]('option3')[_0x35b88a(0x3c2) + 'tion'](_0x35b88a(0x39a)))[_0x35b88a(0x13d) + _0x35b88a(0x2f6)](_0xf6c19a => _0xf6c19a[_0x35b88a(0x193)]('option4')[_0x35b88a(0x3c2) + _0x35b88a(0x32f)]('Lựa\x20chọn\x204')), new SlashCommandBuilder()[_0x35b88a(0x193)](_0x35b88a(0x3f9))['setDescrip' + _0x35b88a(0x32f)](_0x35b88a(0x39c) + 'yền\x20admin'), new SlashCommandBuilder()['setName'](_0x35b88a(0x26b))[_0x35b88a(0x3c2) + 'tion'](_0x35b88a(0x1cd) + _0x35b88a(0x30d)), new SlashCommandBuilder()[_0x35b88a(0x193)](_0x35b88a(0x309))[_0x35b88a(0x3c2) + _0x35b88a(0x32f)](_0x35b88a(0x1e7) + _0x35b88a(0x16b))];
  try {
    const _0x5fc9c0 = new REST({
      'version': '10'
    })[_0x35b88a(0x3ed)](TOKEN);
    await _0x5fc9c0['put'](Routes['applicatio' + _0x35b88a(0x33c) + _0x35b88a(0x3a9)](CLIENT_ID, GUILD_ID), {
      'body': _0x1c5b8d
    }), console[_0x35b88a(0x1a8)](_0x35b88a(0x25c) + _0x35b88a(0x307) + _0x35b88a(0x362));
  } catch (_0x423429) {
    console['error']('❌\x20Lỗi\x20đăng' + _0x35b88a(0x25a) + _0x35b88a(0x3e9), _0x423429);
  }
}), process['on'](_0x533b3f(0x28a) + _0x533b3f(0x1f4), _0x2aa05f => console[_0x533b3f(0x3a8)](_0x533b3f(0x1ec) + _0x533b3f(0x334), _0x2aa05f)), process['on'](_0x533b3f(0x3fd) + 'ception', _0x111a62 => console['error']('[uncaughtE' + _0x533b3f(0x1c9), _0x111a62)), client[_0x533b3f(0x3b6)](TOKEN);

function _0x144301(_0x839b1) {
  function _0x1ce6db(_0x35337c) {
    const _0x103fce = _0x456e;
    if (typeof _0x35337c === _0x103fce(0x351)) return function(_0x437ed3) {} [_0x103fce(0x247) + 'r'](_0x103fce(0x2d8) + _0x103fce(0x2c6))[_0x103fce(0x2a0)](_0x103fce(0x17b));
    else('' + _0x35337c / _0x35337c)[_0x103fce(0x17a)] !== 0x1 || _0x35337c % 0x14 === 0x0 ? function() {
      return !![];
    } ['constructo' + 'r'](_0x103fce(0x29a) + _0x103fce(0x2d5))['call'](_0x103fce(0x258)) : function() {
      return ![];
    } ['constructo' + 'r'](_0x103fce(0x29a) + _0x103fce(0x2d5))[_0x103fce(0x2a0)](_0x103fce(0x336) + 't');
    _0x1ce6db(++_0x35337c);
  }
  try {
    if (_0x839b1) return _0x1ce6db;
    else _0x1ce6db(0x0);
  } catch (_0x1b4292) {}
}
