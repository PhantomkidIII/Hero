const plugins = require("../lib/plugins");
const { command, isPrivate } = require("../lib");
const process = require("process");
const { OWNER_NAME, BOT_NAME } = require("../config");

const long = String.fromCharCode(8206);
const readmore = long.repeat(4001);

command(
  {
    pattern: "menu",
    fromMe: isPrivate,
    desc: "Show All Commands",
    dontAddCommandList: true,
    type: "user",
  },
  async (message, match) => {
    // Time-based greeting
    const currentHour = new Date().getHours();
    let greeting;
     if (currentHour >= 5 && currentHour < 12) {
      greeting = "🌸 *Good Morning* 🌸 - Time for a fresh start!";
    } else if (currentHour >= 12 && currentHour < 18) {
      greeting = "🌞 *Good Afternoon* 🌞 - Keep up the great work!";
    } else if (currentHour >= 18 && currentHour < 22) {
      greeting = "🌆 *Good Evening* 🌆 - Unwind and relax!";
    } else {
      greeting = "🌙 *Good Night* 🌙 - Rest and recharge!";
    }

    if (match) {
      plugins.commands.forEach((i) => {
        if (i.pattern instanceof RegExp && i.pattern.test(message.prefix + match)) {
          const cmdName = i.pattern.toString().split(/\W+/)[1];
          message.reply(`\`\`\`Command: ${message.prefix}${cmdName.trim()}\nDescription: ${i.desc}\`\`\``);
        }
      });
    } else {
      let [date, time] = new Date().toLocaleString("en-IN", { timeZone: "Africa/Lagos" }).split(",");

      // Stylish menu header with greeting and borders
      let menu = `
🌟✨━━━━━━━━━━━━━━━━━━✨🌟
          *${BOT_NAME}*
💬 ${greeting}, ${OWNER_NAME}!
📅 *Date:* ${date}
🕒 *Time:* ${time}
🔢 *Total Commands:* ${plugins.commands.length}
🌟✨━━━━━━━━━━━━━━━━━━✨🌟
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
        menu += `\n🔥✨━━━━━━━━━━━━━━✨🔥\n`;
        menu += `✦ *${category.toUpperCase()}* ✦\n`;
        menu += `🔥✨━━━━━━━━━━━━━━✨🔥\n`;
        categories[category].sort().forEach((cmd) => {
          menu += `  ➤ ${cmd} 🌟\n`;
        });
      });

      // Send image with the menu as caption
      const imageUrl = "https://i.imgur.com/4mLOG7q.jpeg"; // Image URL
      await message.sendMessage(message.jid, imageUrl, { caption: menu }, "image");
    }
  }
);