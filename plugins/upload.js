const { command, isPrivate } = require("../lib/");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");

// Function to map MIME types to file extensions
const getExtensionFromMimeType = (mimeType) => {
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
      return "bin"; // Fallback extension for unknown types
  }
};

// Function to save buffer to a temporary file with the correct extension
const buffToFile = async (buffer, extension) => {
  const filePath = path.join(__dirname, `temp_${Date.now()}.${extension}`);
  fs.writeFileSync(filePath, buffer);
  return filePath;
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

    let inputPath; // Initialize inputPath before the try block

    try {
      // Download the media from the quoted message
      let mediaBuffer = await m.quoted.download();
      if (!mediaBuffer) {
        return await message.reply("Failed to download media.");
      }

      // Get the mimeType from the quoted message
      const mimeType = message.reply_message.mimetype;
      // Get the file extension based on the mimeType
      const extension = getExtensionFromMimeType(mimeType);

      // Save the buffer to a temporary file with the correct extension
      inputPath = await buffToFile(mediaBuffer, extension);
      console.log(`File saved to: ${inputPath}`);

      // Prepare the form data with the file stream
      let formData = new FormData();
      formData.append("file", fs.createReadStream(inputPath), `temp_${Date.now()}.${extension}`);

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

      // Cleanup: remove the temporary file
      fs.unlinkSync(inputPath);
      
    } catch (error) {
      // Check if error response exists
      if (error.response) {
        console.error("Error response data:", error.response.data); // Log error details
        await message.reply(`Error: ${error.response.data.message || 'Request failed'}`);
      } else {
        console.error("Error occurred during upload:", error);
        await message.reply("An error occurred while uploading. Please try again.");
      }

      // Cleanup: ensure temporary file is removed if it was created
      if (inputPath && fs.existsSync(inputPath)) {
        fs.unlinkSync(inputPath);
      }
    }
  }
);