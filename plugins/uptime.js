const plugins = require("../lib/plugins");
const { command, isPrivate } = require("../lib");
const process = require("process");
const { OWNER_NAME, BOT_NAME } = require("../config");

command(
  {
    pattern: "uptime",
    fromMe: isPrivate,
    desc: "Check uptime of bot",
    type: "user",
  },
  async (message, match) => {
    const uptimeInSeconds = process.uptime();
    const hours = Math.floor(uptimeInSeconds / 3600);
    const minutes = Math.floor((uptimeInSeconds % 3600) / 60);
    const seconds = Math.floor(uptimeInSeconds % 60);
    
    const caption = `*Uptime:* ${hours}h ${minutes}m ${seconds}s\n\n 𝐍𝐄𝐗𝐔𝐒-𝐁𝐎𝐓`;

    await message.client.sendMessage(message.jid, {
      image: { url: "https://i.imgur.com/4mLOG7q.jpeg" },
      caption: caption,
    });
  }
);