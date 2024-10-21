const { command, isPrivate } = require("../lib/");
const axios = require("axios");
const FormData = require("form-data");
const fetch = require("node-fetch");

command(
  {
    pattern: "rmbg",
    fromMe: isPrivate,
    desc: "Upload an image, audio, or video file and remove background",
    type: "ai",
  },
  async (message, match, m) => {
    if (!message.reply_message) 
      return await message.reply("Reply to an image, video, or audio file");

    // Check if the replied message is an image, video, or audio
    const isImage = message.reply_message.image;
    const isVideo = message.reply_message.video;
    const isAudio = message.reply_message.audio;

    if (!isImage && !isVideo && !isAudio)
      return await message.reply("Reply to a valid image, video, or audio file");

    // Send loading message
    await message.reply("Processing your request, please wait...");

    // Download the file
    let buff = await m.quoted.download();
    
    // Determine the file extension based on the type of the file
    let extension = '';
    if (isImage) {
      extension = '.jpg'; // Assuming default for images
    } else if (isVideo) {
      extension = '.mp4'; // Assuming default for videos
    } else if (isAudio) {
      extension = '.mp3'; // Assuming default for audio
    }

    // Create FormData to send to the API
    const formData = new FormData();
    formData.append('file', buff, { filename: 'file' + extension });

    try {
      // Send the file to the API
      const uploadResponse = await axios.post('https://itzpire.com/tools/upload', formData, {
        headers: {
          ...formData.getHeaders(),
        },
      });

      // Check the response from the API
      if (uploadResponse.data.status === "success" && uploadResponse.data.fileInfo && uploadResponse.data.fileInfo.url) {
        let fileUrl = uploadResponse.data.fileInfo.url;

        // Prevent appending extension if it already exists
        if (!fileUrl.endsWith(extension)) {
          fileUrl += extension;
        }

        // Proceed to remove background from the image using the file URL
        const rmbgApiUrl = `https://api.ryzendesu.vip/api/ai/removebg?url=${encodeURIComponent(fileUrl)}`;
        
        // Fetch the response from the rmbg API
        const rmbgResponse = await fetch(rmbgApiUrl);

        // Check for a successful response
        if (!rmbgResponse.ok) {
          return await message.sendMessage(message.jid, `Error: ${rmbgResponse.status} ${rmbgResponse.statusText}`);
        }

        // Get the content type of the response
        const contentType = rmbgResponse.headers.get('content-type');

        if (contentType && contentType.startsWith('image')) {
          // If the response is an image, send it directly
          const imageBuffer = await rmbgResponse.buffer(); // Get the image as a buffer
          return await message.sendMessage(
            message.jid,
            imageBuffer,
            {
              mimetype: "image/jpeg",
              caption: "Background removed successfully!",
            },
            "image"
          );
        } else if (contentType && contentType.includes('application/json')) {
          // If the response is JSON, parse it and get the image URL
          const data = await rmbgResponse.json();
          if (data.status !== 200) {
            return await message.sendMessage(message.jid, "An error occurred while fetching the data.");
          }

          const photoUrl = data.result;

          // Send the photo URL to the user
          return await message.sendMessage(
            message.jid,
            { url: photoUrl },
            {
              mimetype: "image/jpeg",
              caption: "Background removed successfully!",
            },
            "image"
          );
        } else {
          // Handle unexpected content types
          return await message.sendMessage(message.jid, "Unexpected content type received from the API.");
        }
      } else {
        await message.reply("Failed to upload the file. Please try again.");
      }
    } catch (error) {
      console.error(error);
      await message.reply("An error occurred during the process.");
    }
  }
);
command(
  {
    pattern: "toanime",
    fromMe: isPrivate,
    desc: "Convert an image to anime style or upload a file",
    type: "ai",
  },
  async (message, match, m) => {
    if (!message.reply_message) 
      return await message.reply("Reply to an image, video, or audio file.");

    // Check if the replied message is an image, video, or audio
    const isImage = message.reply_message.image;
    const isVideo = message.reply_message.video;
    const isAudio = message.reply_message.audio;

    if (!isImage && !isVideo && !isAudio)
      return await message.reply("Reply to a valid image, video, or audio file.");

    // Send loading message
    await message.reply("Uploading your file, please wait...");

    // Download the file
    let buff = await m.quoted.download();
    
    // Determine the file extension based on the type of the file
    let extension = '';
    if (isImage) {
      extension = '.jpg'; // Assuming default for images
    } else if (isVideo) {
      extension = '.mp4'; // Assuming default for videos
    } else if (isAudio) {
      extension = '.mp3'; // Assuming default for audio
    }

    // Create FormData to send to the API
    const formData = new FormData();
    formData.append('file', buff, { filename: 'file' + extension });

    try {
      // Send the file to the upload API
      const response = await axios.post('https://itzpire.com/tools/upload', formData, {
        headers: {
          ...formData.getHeaders(),
        },
      });

      // Check the response from the upload API
      if (response.data.status === "success" && response.data.fileInfo && response.data.fileInfo.url) {
        let fileUrl = response.data.fileInfo.url;

        // Prevent appending extension if it already exists
        if (!fileUrl.endsWith(extension)) {
          fileUrl += extension;
        }

        // If the file is an image, proceed to convert it to anime-style
        if (isImage) {
          await message.reply("Converting image to anime style, please wait...");
          
          // Convert the image to anime-style using the API
          const animeResponse = await fetch(`https://itzpire.com/tools/photo2anime2?url=${encodeURIComponent(fileUrl)}&type=version%200.4`);
          const animeData = await animeResponse.json(); // Parse the JSON

          // Handle the anime conversion response
          if (animeData.status === "success") {
            const animeImageUrl = animeData.result.img;

            // Send the converted anime image
            await message.sendMessage(
              message.jid,
              { url: animeImageUrl },
              {
                mimetype: "image/jpeg",
                caption: "Here is your anime-style image!",
              },
              "image"
            );
          } else {
            await message.reply("Failed to convert the image to anime style. Please try again.");
          }
        } else {
          // If not an image, simply return the uploaded file URL
          await message.sendMessage(
            message.jid, 
            `File uploaded successfully! Here is the URL: ${fileUrl}`
          );
        }
      } else {
        await message.reply("Failed to upload the file. Please try again.");
      }
    } catch (error) {
      console.error(error);
      await message.reply("An error occurred while processing the file.");
    }
  }
);