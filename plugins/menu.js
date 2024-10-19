const plugins = require("../lib/plugins");
const { command, isPrivate, clockString, pm2Uptime } = require("../lib");
const process = require("process")
const { OWNER_NAME, BOT_NAME } = require("../config");
const { hostname } = require("os");
const translate = require('@vitalets/google-translate-api');
const acrcloud = require("acrcloud");
const fs = require("fs");
const acr = new acrcloud({
  host: "identify-eu-west-1.acrcloud.com",
  access_key: process.env.ACR_A,
  access_secret: process.env.ACR_S
});
const long = String.fromCharCode(8206);
const readmore = long.repeat(4001);
const {
    downloadContentFromMessage,
    BufferJSON,
    WA_DEFAULT_EPHEMERAL,
    generateWAMessageFromContent,
    proto,
    generateWAMessageContent,
    prepareWAMessageMedia,
    areJidsSameUser,
    InteractiveMessage,
    getContentType,
    jidDecode,
    delay
} = require('@whiskeysockets/baileys')
const config = require("../config")
async function findMusic(file){
return new Promise((resolve,reject)=>{
acr.identify(file).then(result => {
  var data = result.metadata?.music[0];
  resolve(data);
});
});
}
function runtime(seconds) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor(seconds % (3600 * 24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);
    var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " hr, " : " hrs, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " min, " : " mins, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " sec" : " secs") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
}
command(
  {
    pattern: "menu",
    fromMe: isPrivate,
    desc: "Show All Commands",
    dontAddCommandList: true,
    type: "user",
  },
  async (message, match) => {
    if (match) {
      plugins.commands.forEach((i) => {
        if (i.pattern instanceof RegExp && i.pattern.test(message.prefix + match)) {
          const cmdName = i.pattern.toString().split(/\W+/)[1];
          message.reply(`\`\`\`Command: ${message.prefix}${cmdName.trim()}
Description: ${i.desc}\`\`\``);
        }
      });
    } else {
      let [date, time] = new Date().toLocaleString("en-IN", { timeZone: "Africa/Lagos" }).split(",");
      
      // Stylish menu header
      let menu = `
✦✧━━ *NEXUS-BOT* ━━✧✦
🌟 *BY:* STAR KING
📅 *DATE:* ${date}
🕒 *TIME:* ${time}
🔢 *TOTAL COMMANDS:* ${plugins.commands.length}
`;

      let categories = {};

      plugins.commands.forEach((command) => {
        if (command.pattern instanceof RegExp && !command.dontAddCommandList) {
          const cmd = command.pattern.toString().split(/\W+/)[1];
          const type = command.type ? command.type.toLowerCase() : "misc";
          if (!categories[type]) categories[type] = [];
          categories[type].push(cmd.trim());
        }
      });

      Object.keys(categories).sort().forEach((category) => {
        menu += `\n✦ *${category.toUpperCase()}*\n`;
        categories[category].sort().forEach((cmd) => {
          menu += `  ➤ ${cmd}\n`;
        });
      });

      // Send image with the menu as caption
      const imageUrl = "https://i.imgur.com/4mLOG7q.jpeg"; // Image URL
      await message.sendMessage(message.jid, imageUrl, { caption: menu }, "image");
    }   
  }
);
