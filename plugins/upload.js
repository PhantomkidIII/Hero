const { command, isPrivate } = require("../lib/");
const axios = require("axios");
const FormData = require("form-data");

// Function to map MIME types to file extensions
const getExtensionFromMimeType = (mimeType, messageType) => {
  if (mimeType) {
    switch (mimeType) {
      case "image/jpeg":
        return "jpg";
      case "image/png":
        return "png";
      case "video/mp4":
        return "mp4";
      case "audio/mpeg":
        return "mp3";
      case "audio/ogg":
        return "ogg";
      default:
        return "bin"; // Default to .bin for unrecognized MIME types
    }
  }

  // Fallbacks based on message type if mimeType is missing
  switch (messageType) {
    case "image":
      return "jpg";  // Default to .jpg for images
    case "video":
      return "mp4";  // Default to .mp4 for videos
    case "audio":
      return "mp3";  // Default to .mp3 for audio
    default:
      return "bin";  // Catch-all fallback for other types
  }
};

command(
  {
    pattern: "upload",
    fromMe: isPrivate,
    desc: "Upload image, video, or audio to Itzpire API and get a URL",
    type: "media",
  },
  async (message, match, m) => {
    // Check if the replied message is an image, video, or audio
    if (!message.reply_message || (!message.reply_message.image && !message.reply_message.video && !message.reply_message.audio)) {
      return await message.reply("Reply to an image, video, or audio to upload.");
    }

    try {
      // Download the media from the quoted message as a buffer
      let mediaBuffer = await message.reply_message.download();
      if (!mediaBuffer) {
        return await message.reply("Failed to download media.");
      }

      // Get the mimeType and messageType from the quoted message
      const mimeType = message.reply_message.mimetype;
      const messageType = message.reply_message.image
        ? "image"
        : message.reply_message.video
        ? "video"
        : "audio"; // Determine if the message contains image, video, or audio

      // Get the file extension based on the mimeType or messageType
      const extension = getExtensionFromMimeType(mimeType, messageType);

      // Prepare the form data with the file buffer
      let formData = new FormData();
      formData.append("file", mediaBuffer, {
        filename: `temp_${Date.now()}.${extension}`,
        contentType: mimeType || `application/octet-stream`
      });

      // Send a POST request to the Itzpire API with the file
      let response = await axios({
        method: "post",
        url: "https://itzpire.com/tools/upload",
        data: formData,
        headers: {
          ...formData.getHeaders(),
        },
        responseType: "json",  // Ensure the response is in JSON format
      });

      console.log("Response Data:", response.data); // Log the response for debugging

      // Check if the response is valid and contains the file info
      if (response.data.status === "success" && response.data.fileInfo && response.data.fileInfo.url) {
        const fileUrl = response.data.fileInfo.url;
        await message.reply(`Uploaded successfully! Here is your URL: ${fileUrl}`);
      } else {
        await message.reply("Failed to upload the file. Please check the API response.");
      }

    } catch (error) {
      // Check if error response exists
      if (error.response) {
        console.error("Error response data:", error.response.data); // Log error details
        await message.reply(`Error: ${error.response.data.message || 'Request failed'}`);
      } else {
        console.error("Error occurred during upload:", error);
        await message.reply("An error occurred while uploading. Please try again.");
      }
    }
  }
);