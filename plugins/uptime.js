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
command(
  {
    pattern: "alive",
    fromMe: isPrivate,
    desc: "Check uptime of bot",
    type: "user",
  },
  async (message, match) => {
    const uptimeInSeconds = process.uptime();
    const hours = Math.floor(uptimeInSeconds / 3600);
    const minutes = Math.floor((uptimeInSeconds % 3600) / 60);
    const seconds = Math.floor(uptimeInSeconds % 60);
    
    const caption = `*I'VE BEEN ALIVE FOR:* ${hours}h ${minutes}m ${seconds}s\n\n 𝐍𝐄𝐗𝐔𝐒-𝐁𝐎𝐓`;

    await message.client.sendMessage(message.jid, {
      image: { url: "https://i.imgur.com/4mLOG7q.jpeg" },
      caption: caption,
    });
  }
);
command(
  {
    pattern: "ping",
    fromMe: isPrivate,
    desc: "Check ping of bot",
    type: "user",
  },
  async (message, match) => {
    const start = Date.now();
    await await message.reply("Pinging...");
    const end = Date.now();
    const ping = end - start;

    const caption = `*Ping:* ${ping}ms\n\n 𝐍𝐄𝐗𝐔𝐒-𝐁𝐎𝐓`;

    // Send the caption directly as a string
    await await message.reply(caption);
  }
);
global.PRESENCE =
  process.env.PRESENCE && process.env.PRESENCE === "online"
    ? "available"
    : process.env.PRESENCE || "";
command(
 { 
  on: "text" 
 }, async (message, match, m, client) => {
  try {
    if (
      ["unavailable", "available", "composing", "recording", "paused"].includes(
        presence
      )
    )
      message.client.sendPresenceUpdate(presence, message.jid);
  } catch (e) {
    console.log(e);
  }
});