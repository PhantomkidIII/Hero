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
        return await message.sendMessage(message.jid, `Error: ${response.status} ${response.statusText}`);
      }

      // Get the content type of the response
      const contentType = response.headers.get('content-type');

      if (contentType && contentType.startsWith('image')) {
        // If the response is an image, send it directly
        const imageBuffer = await response.buffer(); // Get the image as a buffer
        return await message.sendMessage(
          message.jid,
          imageBuffer,
          {
            mimetype: "image/jpeg",
            caption: "𝐍𝐄𝐗𝐔𝐒-𝐁𝐎𝐓 Waifu Image",
          },
          "image"
        );
      } else if (contentType && contentType.includes('application/json')) {
        // If the response is JSON, parse it and get the image URL
        const data = await response.json();
        if (!data.url) {
          return await message.sendMessage(message.jid, "An error occurred while fetching the data.");
        }

        const imageUrl = data.url;

        // Send the image to the user
        return await message.sendMessage(
          message.jid,
          { url: imageUrl },
          {
            mimetype: "image/jpeg",
            caption: "𝐍𝐄𝐗𝐔𝐒-𝐁𝐎𝐓 Waifu Image",
          },
          "image"
        );
      } else {
        // Handle unexpected content types
        return await message.sendMessage(message.jid, "Unexpected content type received from the API.");
      }
    } catch (error) {
      console.error(error);
      return await message.sendMessage(message.jid, "Failed to fetch waifu image.");
    }
  }
);