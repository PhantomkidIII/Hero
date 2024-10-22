const {
  command,
  isPrivate,
} = require("../lib");
const fetch = require("node-fetch");

command(
  {
    pattern: "waifu",
    fromMe: isPrivate,
    desc: "Fetch waifu image",
    type: "anime",
  },
  async (message) => {
    try {
      // Call the waifu API to fetch the image URL
      const apiUrl = 'https://api.waifu.pics/sfw/waifu';
      const response = await fetch(apiUrl);

      // Check if the API call was successful
      if (!response.ok) {
        return await message.sendMessage(message.jid, `Error: ${response.status} ${response.statusText}`);
      }

      // Parse the JSON response to get the image URL
      const data = await response.json();
      if (!data.url) {
        return await message.sendMessage(message.jid, "An error occurred while fetching the waifu image.");
      }

      const imageUrl = data.url;

      // Send the image to the user using the URL
      return await message.sendMessage(
        message.jid,
        { url: imageUrl },
        {
          mimetype: "image/jpeg",
          caption: "𝐍𝐄𝐗𝐔𝐒-𝐁𝐎𝐓 Waifu Image",
        },
        "image"
      );
    } catch (error) {
      console.error(error);
      return await message.sendMessage(message.jid, "Failed to fetch waifu image.");
    }
  }
);