/*
██╗  ██╗ ██████╗ ████████╗ █████╗ ██████╗  ██████╗       ███╗   ███╗██████╗ 
██║  ██║██╔═══██╗╚══██╔══╝██╔══██╗██╔══██╗██╔═══██╗      ████╗ ████║██╔══██╗
███████║██║   ██║   ██║   ███████║██████╔╝██║   ██║█████╗██╔████╔██║██║  ██║
██╔══██║██║   ██║   ██║   ██╔══██║██╔══██╗██║   ██║╚════╝██║╚██╔╝██║██║  ██║
██║  ██║╚██████╔╝   ██║   ██║  ██║██║  ██║╚██████╔╝      ██║ ╚═╝ ██║██████╔╝
╚═╝  ╚═╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝       ╚═╝     ╚═╝╚═════╝
 By : Taira Makino
 Github : https://github.com/anonphoenix007
 WhatsApp : https://wa.me/2347080968564
*/                                                                                                                                                    
const isVPS = !(__dirname.startsWith("/HOTARO-MD") || __dirname.startsWith("/skl"));
const isHeroku = __dirname.startsWith("/HOTARO-MD");
const isKoyeb = __dirname.startsWith("/HOTARO-MD");
const isRailway = __dirname.startsWith("/HOTARO-MD");
const { Sequelize } = require("sequelize");
const fs = require("fs");
//require("dotenv").config();
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

const toBool = (x) => x === "true";

const DATABASE_URL = process.env.DATABASE_URL || "./assets/database.db";
const _auth = `\x32\x33\x34\x37\x30\x38\x30\x39\x36\x38\x35\x36\x34`;
const ACR_A = process.env.ACR_A || "ff489a0160188cf5f0750eaf486eee74";
const ACR_S = process.env.ACR_A || "ytu3AdkCu7fkRVuENhXxs9jsOW4YJtDXimAWMpJp";
global.presence = process.env.PRESENCE || "recording",//composing ,recording ,available ,unavailable 
global.website = "https://whatsapp.com/channel/0029VaY0Zq32P59piTo5rg0K"
module.exports = {
  ANTILINK: process.env.ANTI_LINK || "on", //on or off
  LOGS: toBool(process.env.LOGS) || true,
  ANTI_LINK_ACTION: process.env.ANTI_LINK_ACTION || "delete", //delete or kick
  SESSION_ID: process.env.SESSION_ID || "{"noiseKey":{"private":{"type":"Buffer","data":"gBJo/jxFLN+zzVGDsxKNzGNq9z351BjJ/nFIshKl0FQ="},"public":{"type":"Buffer","data":"+XD55R9hDO2ptdJEosHCnhBMqOaSMgSEgy3T2bAcnDI="}},"pairingEphemeralKeyPair":{"private":{"type":"Buffer","data":"mD9xHcLAuqTnHD+LXPtbWCZ7TJNknAu2N9stov3A+Eg="},"public":{"type":"Buffer","data":"GLlpXaFhkeNsBxCoKqEi/1L1qTQ6D7ePQOi9ziJdNAw="}},"signedIdentityKey":{"private":{"type":"Buffer","data":"yPqGbftJkRTOf3rq0gguHZB1xLzeCvGwpRhsuX20a1U="},"public":{"type":"Buffer","data":"EowkvKSJddnU+be8k9/9rOoG/xXJ2xw6qKcopgvAzVY="}},"signedPreKey":{"keyPair":{"private":{"type":"Buffer","data":"IKMqgZubDmHpNZ/AB/Gej6QYaNt4Npx+n3epaq7lR2A="},"public":{"type":"Buffer","data":"z0997zXvpb7qkj/kBugZwXdtS7Ify38uXWIQfyCT0hI="}},"signature":{"type":"Buffer","data":"xIGLdHyvGkeJZ22SAGE+BPCWuVVyDJ5AMpZu7zO/F5qFCbDdWLBSOZy/ny8DkX3MYfgue9e3OBJCRrXaCLsdCA=="},"keyId":1},"registrationId":157,"advSecretKey":"1doDy+MrcC6iuiDQCPj4Z4jnrVL7xq+HxLOLh6EcIzo=","processedHistoryMessages":[],"nextPreKeyId":31,"firstUnuploadedPreKeyId":31,"accountSyncCounter":0,"accountSettings":{"unarchiveChats":false},"deviceId":"MWSQgy9NRb6tpS5KiwIqXQ","phoneId":"81fa03d3-f4ad-4a8d-8432-b34cbecbaddf","identityId":{"type":"Buffer","data":"Al28MCgkr2FgjSk8eSauSvExeLw="},"registered":true,"backupToken":{"type":"Buffer","data":"p5DZp6gPvgXBbUBqFusZYKzE1Gw="},"registration":{},"pairingCode":"YLH26EZP","me":{"id":"2348100835767:7@s.whatsapp.net"},"account":{"details":"CNj+kpgCEPb2/LcGGAQgACgA","accountSignatureKey":"lCWwpHPCRbKbolajOPsWIpJZCj+/T2iBXSxKIo/Q3wM=","accountSignature":"6XiyBeubSZbcKqJBWeeHG3HxyQcUQ3xcjGJD0Yk6MC3yMTiMj58wLhGMvMmtwhwetBIrXdJMdpnR9d4+pXYkDA==","deviceSignature":"1WVQmTJMcf3LGqsPppVAzCMcx9mUf9ic37a+TFuX5PR3HBZc1H93zEuJghd+gooBLk9KguinNYBmJ4nFmhbUAA=="},"signalIdentities":[{"identifier":{"name":"2348100835767:7@s.whatsapp.net","deviceId":0},"identifierKey":{"type":"Buffer","data":"BZQlsKRzwkWym6JWozj7FiKSWQo/v09ogV0sSiKP0N8D"}}],"platform":"android","lastAccountSyncTimestamp":1728002947,"myAppStateKeyId":"AAAAANsm"}",//Session ID here
  LANG: process.env.LANG || "EN",//Only English currently supported
  HANDLERS: process.env.HANDLER === "false" || process.env.HANDLER === "null" ? "^" : "^[.]",
  RMBG_KEY: process.env.RMBG_KEY || false,
  PLATFORM:isHeroku?"Heroku":isRailway?"Railway":isKoyeb?"Koyeb":"Other server",isHeroku,isKoyeb,isVPS,isRailway,
  BRANCH: "main",
  WARN_COUNT: 3,
  PACKNAME: process.env.PACKNAME || "☬ ʜᴏᴛᴀʀᴏ-ᴍᴅ ☬",
  WELCOME_MSG: process.env.WELCOME_MSG || `Hi @user Welcome to @gname\n\n☬ ʜᴏᴛᴀʀᴏ-ᴍᴅ ☬`,
  GOODBYE_MSG: process.env.GOODBYE_MSG || `Hi @user It was Nice Seeing you\n\n☬ ʜᴏᴛᴀʀᴏ-ᴍᴅ ☬`,
  AUTHOR: process.env.AUTHOR || "Tᴀɪʀᴀ•Mᴀᴋɪɴᴏ",
  MODS: process.env.MODS || "2349123721026",//Add Sudo numbers here.
  SUDO: process.env.SUDO || "2349123721026",//Also sudo numbers
  HEROKU_APP_NAME: process.env.HEROKU_APP_NAME || "",
  HEROKU_API_KEY: process.env.HEROKU_API_KEY || "",
  OWNER_NUMBER: process.env.OWNER_NUMBER || "2349123721026",
  OWNER_NAME: process.env.OWNER_NAME || "Tᴀɪʀᴀ✧Mᴀᴋɪɴᴏ",
  HEROKU: toBool(process.env.HEROKU) || true,
  BOT_NAME: process.env.BOT_NAME || "☬ ʜᴏᴛᴀʀᴏ-ᴍᴅ ☬",
  PROCESSNAME: process.env.PROCESSNAME || "HOTARO-MD",
  WORK_TYPE: process.env.WORK_TYPE || "private",
  DELETED_LOG: toBool(process.env.DELETED_LOG) || false,
  DELETED_LOG_CHAT: process.env.DELETED_LOG_CHAT || false,
  REMOVEBG : process.env.REMOVEBG || false,
  DATABASE_URL: DATABASE_URL,
  STATUS_SAVER: toBool(process.env.STATUS_SAVER) || true, //make true to auto send status
  DATABASE:
    DATABASE_URL === "./assets/database.db"
      ? new Sequelize({
          dialect: "sqlite",
          storage: DATABASE_URL,
          logging: false,
        })
      : new Sequelize(DATABASE_URL, {
          dialect: "postgres",
          ssl: true,
          protocol: "postgres",
          dialectOptions: {
            native: true,
            ssl: { require: true, rejectUnauthorized: false },
          },
          logging: false,
        }),
};
