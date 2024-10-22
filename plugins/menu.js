const plugins = require("../lib/plugins");
const { command, isPrivate } = require("../lib");
const { OWNER_NAME } = require("../config");

const long = String.fromCharCode(8206);
const readmore = long.repeat(4001);

command(
  {
    pattern: "menu",
    fromMe: isPrivate,
    desc: "Show All Commands or specific category menu",
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

    // If a specific category is provided (like "aimenu"), filter commands
    let categoryFilter = match?.toLowerCase();
    let categories = {};
    plugins.commands.forEach((command) => {
      if (command.pattern instanceof RegExp && !command.dontAddCommandList) {
        const cmd = command.pattern.toString().split(/\W+/)[1];
        const type = command.type ? command.type.toLowerCase() : "misc";
        if (!categories[type]) categories[type] = [];
        categories[type].push(cmd.trim());
      }
    });

    let menu = `
┏❐━━━━━━━━━━━━━━━꧂
    *𝐍𝐄𝐗𝐔𝐒-𝐁𝐎𝐓*
┗❐━━━━━━━━━━━━━━━꧂
${greeting}
👑 *Developer:* King 👑
🧑‍💻 *User:* ${OWNER_NAME}
🔢 *Total Commands:* ${plugins.commands.length}
┗❐━━━━━━━━━━━━━━━꧂
`;

    if (categoryFilter && categories[categoryFilter]) {
      // Show commands under the specific category
      menu += `\n🔥✨━━━━━━━━━━━━✨🔥\n`;
      menu += `🌀 *${categoryFilter.toUpperCase()}* 🌀\n`;
      categories[categoryFilter].sort().forEach((cmd) => {
        menu += `  ❄️ ${cmd} 🌟\n`;
      });
    } else if (!categoryFilter) {
      // Show all categories and commands
      Object.keys(categories)
        .sort()
        .forEach((category) => {
          menu += `\n🔥✨━━━━━━━━━━━━✨🔥\n`;
          menu += `🌀 *${category.toUpperCase()}* 🌀\n`;
          categories[category].sort().forEach((cmd) => {
            menu += `  ❄️ ${cmd} 🌟\n`;
          });
        });
    } else {
      // If no matching category is found
      menu += `\n❌ *Category not found!* ❌\n`;
    }

    // Send image with the menu as caption
    const imageUrl = "https://i.imgur.com/4mLOG7q.jpeg"; // Image URL
    await message.sendMessage(message.jid, imageUrl, { caption: menu }, "image");
  }
);