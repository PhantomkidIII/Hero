const { command, isPrivate } = require("../lib/");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");

// Function to save buffer to a temporary file and return the path
const buffToFile = async (buffer) => {
  const filePath = path.join(__dirname, `temp_${Date.now()}.tmp`);
  fs.writeFileSync(filePath, buffer);
  return filePath;
};

command(
  {
    pattern: "upload",
    fromMe: isPrivate,
    desc: "Upload image, video, or audio to widipe API and get a URL",
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

      // Save the buffer to a temporary file
      inputPath = await buffToFile(mediaBuffer);
      console.log(`File saved to: ${inputPath}`);

      // Prepare the form data with the file stream
      let formData = new FormData();
      formData.append("file", fs.createReadStream(inputPath), path.basename(inputPath));

      // Log headers for debugging
      console.log("FormData Headers:", formData.getHeaders());

      // Send a POST request to the API with the file
      let response = await axios({
        method: "post",
        url: "https://widipe.com/api/upload.php",
        data: formData,
        headers: {
          ...formData.getHeaders(),
        },
        responseType: "json",  // Adjust depending on the expected response type
      });

      console.log("Response Data:", response.data); // Log the response for debugging

      // Check if the response is valid and contains the URL
      if (response.data.status && response.data.result && response.data.result.url) {
        const fileUrl = response.data.result.url;
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