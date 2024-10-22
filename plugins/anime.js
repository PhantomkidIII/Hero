const {
  command,
  isPrivate,
} = require("../lib");
const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");

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

      // Download the image and save it to a temporary file
      const imageResponse = await fetch(imageUrl);
      const buffer = await imageResponse.buffer();
      const tempFilePath = path.join(__dirname, 'temp_waifu_image.jpg');

      // Write the image to a temporary file
      fs.writeFileSync(tempFilePath, buffer);

      // Send the image to the user
      await message.sendMessage(
        message.jid,
        fs.readFileSync(tempFilePath),
        {
          mimetype: "image/jpeg",
          caption: "𝐍𝐄𝐗𝐔𝐒-𝐁𝐎𝐓 Waifu Image",
        },
        "image"
      );

      // Delete the temporary file after sending
      fs.unlinkSync(tempFilePath);
    } catch (error) {
      console.error(error);
      return await message.sendMessage(message.jid, "Failed to fetch waifu image.");
    }
  }
);