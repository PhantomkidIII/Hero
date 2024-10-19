const { command, isPrivate } = require("../lib/");
const axios = require("axios");
const FormData = require("form-data");

command(
  {
    pattern: "upload",
    fromMe: isPrivate,
    desc: "Upload an image, audio, or video file",
    type: "any",
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
      const response = await axios.post('https://itzpire.com/tools/upload', formData, {
        headers: {
          ...formData.getHeaders(),
        },
      });

      // Check the response from the API
      if (response.data.status === "success" && response.data.fileInfo && response.data.fileInfo.url) {
        let fileUrl = response.data.fileInfo.url;

        // Prevent appending extension if it already exists
        if (!fileUrl.endsWith(extension)) {
          fileUrl += extension;
        }

        // Send back the URL with the appropriate extension
        await message.sendMessage(
          message.jid, 
          `File uploaded successfully! Here is the URL: ${fileUrl}`
        );
      } else {
        await message.reply("Failed to upload the file. Please try again.");
      }
    } catch (error) {
      console.error(error);
      await message.reply("An error occurred while uploading the file.");
    }
  }
);