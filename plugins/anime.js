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
command(
  {
    pattern: "neko",
    fromMe: isPrivate,
    desc: "Fetch Neko image",
    type: "anime",
  },
  async (message) => {
    try {
      // Call the waifu API to fetch the image URL
      const apiUrl = 'https://api.waifu.pics/sfw/neko';
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
          caption: "𝐍𝐄𝐗𝐔𝐒-𝐁𝐎𝐓 Neko Image",
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
const cmdnames = [
  'akira', 'akiyama', 'anna', 'asuna', 'ayuzawa', 'boruto', 'chitanda', 'chitoge', 
  'deidara', 'doraemon', 'elaina', 'emilia', 'asuna', 'erza', 'gremory', 'hestia', 
  'hinata', 'inori', 'itachi', 'isuzu', 'itori', 'kaga', 'kagura', 'kakasih', 'kaori', 
  'kaneki', 'kosaki', 'kotori', 'kuriyama', 'kuroha', 'kurumi', 'madara', 'mikasa', 
  'miku', 'minato', 'naruto', 'natsukawa', 'nezuko', 'nishimiya', 
  'onepiece', 'pokemon', 'rem', 'rize', 'sagiri', 'sakura', 'sasuke', 'shina', 'shinka', 
  'shizuka', 'shota', 'tomori', 'toukachan', 'tsunade', 'yatogami', 'yuki'
];

cmdnames.forEach((cmdname) => {
  command(
    {
      pattern: cmdname,
      fromMe: true,
      desc: `Fetch ${cmdname} image`,
      type: "anime",
    },
    async (message) => {
      try {
        const apiUrl = `https://raw.githubusercontent.com/STAR-KING0/database/main/anime/${cmdname}.json`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
          return await message.sendMessage(message.jid, `Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (data && data.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.length);
          const imageUrl = data[randomIndex];

          await message.sendMessage(
            message.jid,
            imageUrl,
            {
              mimetype: "image/jpeg",
              caption: `𝐍𝐄𝐗𝐔𝐒-𝐁𝐎𝐓 ${cmdname.charAt(0).toUpperCase() + cmdname.slice(1)} Image`,
            },
            "image"
          );
        } else {
          return await message.sendMessage(message.jid, `An error occurred while fetching the ${cmdname} image.`);
        }
      } catch (error) {
        console.error(error);
        return await message.sendMessage(message.jid, `Failed to fetch ${cmdname} image.`);
      }
    }
  );
});
command(
  {
    pattern: "anisearch",  // Accepts text input for searching anime
    fromMe: isPrivate,
    desc: "Fetch anime details",
    type: "anime",
  },
  async (message, match) => {
    try {
      if (!match) {
        return await message.sendMessage(message.jid, "Please provide an anime name to search.");
      }

      // Use the Kitsu API to search for anime based on user input
      const searchQuery = encodeURIComponent(match.trim());
      const apiUrl = `https://kitsu.io/api/edge/anime?filter[text]=${searchQuery}`;
      const response = await fetch(apiUrl);

      // Check if the API call was successful
      if (!response.ok) {
        return await message.sendMessage(message.jid, `Error: ${response.status} ${response.statusText}`);
      }

      // Parse the JSON response
      const data = await response.json();
      if (!data.data || data.data.length === 0) {
        return await message.sendMessage(message.jid, "No anime found with that name.");
      }

      // Extract the first anime result
      const anime = data.data[0].attributes;
      const title = anime.canonicalTitle || "No title available";
      const synopsis = anime.synopsis || "No synopsis available";
      const posterImage = anime.posterImage ? anime.posterImage.original : null;

      // Build the message with anime details
      let messageText = `*Title:* ${title}\n\n`;
      messageText += `*Synopsis:* ${synopsis}`;

      // Send the message with optional poster image
      if (posterImage) {
        const imageResponse = await fetch(posterImage);
        const buffer = await imageResponse.buffer();
        const tempFilePath = path.join(__dirname, 'temp_anime_poster.jpg');

        // Write the image to a temporary file
        fs.writeFileSync(tempFilePath, buffer);

        // Send the image along with the anime details
        await message.sendMessage(
          message.jid,
          fs.readFileSync(tempFilePath),
          {
            mimetype: "image/jpeg",
            caption: messageText,
          },
          "image"
        );

        // Delete the temporary file after sending
        fs.unlinkSync(tempFilePath);
      } else {
        // If there's no poster image, just send the text message
        await message.sendMessage(message.jid, messageText);
      }
    } catch (error) {
      console.error(error);
      return await message.sendMessage(message.jid, "Failed to fetch anime details.");
    }
  }
);