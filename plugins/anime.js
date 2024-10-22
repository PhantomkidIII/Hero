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
      // Call the waifu API to fetch the image
      const apiUrl = 'https://api.waifu.pics/sfw/waifu';
      const response = await fetch(apiUrl);

      // Check if the API call was successful
      if (!response.ok) {
        return await message.sendMessage(`Error: ${response.status} ${response.statusText}`);
      }

      // Parse the JSON response
      const data = await response.json();
      const imageUrl = data.url;

      // Send the image to the user
      return await message.sendMessage(
        { image: { url: imageUrl }, caption: "𝐍𝐄𝐗𝐔𝐒-𝐁𝐎𝐓 Waifu Image" }
      );
    } catch (error) {
      console.error(error);
      return await message.sendMessage("Failed to fetch waifu image.");
    }
  }
);