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

    // Prepare buttons
    const buttons = [
        {
            buttonId: `${prefix}menu`, // Dynamic prefix for the button ID
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

    // Step 1: Use the method to send an image with caption and buttons
    let content = "https://wallpaperaccess.com/full/5531321.jpg"; // Image URL
    const buttonMessage = {
        caption: heder, // The menu as the caption
        footer: "By : Tᴀɪʀᴀ Mᴀᴋɪɴᴏ",
        buttons: buttons,
        headerType: 4 // Header type 4 includes the image as the header
    };
    
    // Send the image with the buttons and caption
    await message.sendMessage(message.jid, content, buttonMessage, "image");
  }
);