const { command, formatp, isPrivate, clockString, pm2Uptime } = require("../lib");
const config = require("../config");
const process = require("process");
const { OWNER_NAME, BOT_NAME } = require("../config");
const { hostname } = require("os");
const plugins = require("../lib/plugins");
const os = require("os");

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
    desc: "send a button message menu",
    usage: ".menu",
    type: "user",
  },
  async (message, match, m) => {
      const prefix = config.HANDLERS; // Dynamic prefix
      let [date, time] = new Date()
        .toLocaleString("en-IN", { timeZone: "Africa/Lagos" })
        .split(",");

      let heder = `
╭════════════════ ⪩
┃  〘 *☬ ʜᴏᴛᴀʀᴏ-ᴍᴅ ☬* 〙
╰════════════════ ⪨
╭════════════════ ⪩
┃   *Oᴡɴᴇʀ : ${OWNER_NAME}*
┃   *Time  : ${time}*
┃   *Dᴀᴛᴇ : ${date}*
┃   *Pʟᴜɢɪɴꜱ : ${plugins.commands.length}*
┃   *MODE : ${config.WORK_TYPE}*
┃   *Pʀᴇꜰɪx : ${prefix}*
┃   *Rᴜɴᴛɪᴍᴇ : ${runtime(process.uptime())}*
╰════════════════ ⪨
`;

    // Step 1: Send the image separately
    await message.sendMessage(
      message.jid, 
      { image: { url: "https://i.imgur.com/Y0pLkKX.jpeg" }, caption: "☬ ʜᴏᴛᴀʀᴏ-ᴍᴅ By Tᴀɪʀᴀ Mᴀᴋɪɴᴏ" }
    );

    // Step 2: Send the button menu
    const buttons = [
        {
            buttonId: `${prefix}list`, // Dynamic prefix for the button ID
            buttonText: { displayText: "MENU 📃" },
            type: 1,
        },
        {
            buttonId: `${prefix}repo`, // Button for Repo
            buttonText: { displayText: "Repo" },
            type: 1,
            url: "https://github.com/anonphoenix007/HOTARO-MD"
        },
        {
            buttonId: `${prefix}channel`, // Button for Channel
            buttonText: { displayText: "Channel" },
            type: 1,
            url: "https://whatsapp.com/channel/0029VaY0Zq32P59piTo5rg0K"
        },
        {
            buttonId: `${prefix}author`, // Button for Author
            buttonText: { displayText: "Author" },
            type: 1,
            url: "https://wa.me/2347080968564"
        }
    ];

    const buttonMessage = {
        text: heder,
        footer: "By : Tᴀɪʀᴀ Mᴀᴋɪɴᴏ",
        buttons: buttons,
        headerType: 1
    };
    
    await message.sendMessage(message.jid, buttonMessage);
  }
);
