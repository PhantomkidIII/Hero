const { command, isPrivate } = require("../lib/");
const axios = require("axios");
const FormData = require("form-data");
const fetch = require("node-fetch");

command(
  {
    pattern: "rmbg2",
    fromMe: isPrivate,
    desc: "Upload an image, audio, or video file and remove background",
    type: "tools",
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
    pattern: "rmbg3",
    fromMe: isPrivate,
    desc: "Upload an image, audio, or video file and remove background",
    type: "tools",
  },
  async (message, match, m) => {
    if (!message.reply_message) return;

    const isImage = message.reply_message.image;
    const isVideo = message.reply_message.video;
    const isAudio = message.reply_message.audio;

    if (!isImage && !isVideo && !isAudio) return;

    // Send a loading message while processing
    const loadingMessage = await message.reply("Processing, please wait...");

    // Download the file
    const buff = await m.quoted.download();
    
    // Determine file extension
    let extension = '';
    if (isImage) {
      extension = '.jpg';
    } else if (isVideo) {
      extension = '.mp4';
    } else if (isAudio) {
      extension = '.mp3';
    }

    // Create FormData to send to the API
    const formData = new FormData();
    formData.append('file', buff, { filename: 'file' + extension });

    // Send file to the API and remove background
    let fileUrl = '';
    try {
      const uploadResponse = await axios.post('https://itzpire.com/tools/upload', formData, {
        headers: {
          ...formData.getHeaders(),
        },
      });
      if (uploadResponse.data.fileInfo && uploadResponse.data.fileInfo.url) {
        fileUrl = uploadResponse.data.fileInfo.url;
      }
    } catch (e) {
      // Ignore errors during upload
    }

    if (fileUrl) {
      const rmbgApiUrl = `https://api.ryzendesu.vip/api/ai/removebg?url=${encodeURIComponent(fileUrl)}`;
      try {
        const rmbgResponse = await fetch(rmbgApiUrl);

        const contentType = rmbgResponse.headers.get('content-type');
        if (contentType && contentType.startsWith('image')) {
          const imageBuffer = await rmbgResponse.buffer();
          await message.sendMessage(
            message.jid,
            imageBuffer,
            {
              mimetype: "image/jpeg",
              caption: "Background removed successfully!",
            },
            "image"
          );
        } else if (contentType && contentType.includes('application/json')) {
          const data = await rmbgResponse.json();
          const photoUrl = data.result;
          await message.sendMessage(
            message.jid,
            { url: photoUrl },
            {
              mimetype: "image/jpeg",
              caption: "Background removed successfully!",
            },
            "image"
          );
        }
      } catch (e) {
        // Ignore errors during background removal
      }
    }

    // Delete the loading message after processing
    await loadingMessage.delete();
  }
);