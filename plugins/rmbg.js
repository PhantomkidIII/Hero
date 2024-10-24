const { command, isPrivate } = require("../lib/");
const axios = require("axios");
const FormData = require("form-data");
const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");

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
    pattern: "colorize",
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
        const rmbgApiUrl = `https://api.ryzendesu.vip/api/ai/colorize?url=${encodeURIComponent(fileUrl)}`;
        
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
              caption: "Photo enhanced successfully!",
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
              caption: "Photo enhanced successfully!",
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
    pattern: "upscale",
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
        const rmbgApiUrl = `https://api.ryzendesu.vip/api/ai/upscaler?url=${encodeURIComponent(fileUrl)}`;
        
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
              caption: "Photo enhanced successfully!",
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
              caption: "Photo enhanced successfully!",
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
    pattern: "remini",
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
        const rmbgApiUrl = `https://api.ryzendesu.vip/api/ai/remini?url=${encodeURIComponent(fileUrl)}`;
        
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
              caption: "Photo enhanced successfully!",
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
              caption: "Photo enhanced successfully!",
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
    pattern: "greyscale",
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
        const rmbgApiUrl = `https://api.popcat.xyz/greyscale?image=${encodeURIComponent(fileUrl)}`;
        
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
              caption: "Photo enhanced successfully!",
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
              caption: "Photo enhanced successfully!",
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
    pattern: "blur",
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
        const rmbgApiUrl = `https://api.popcat.xyz/blur?image=${encodeURIComponent(fileUrl)}`;
        
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
              caption: "Photo enhanced successfully!",
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
              caption: "Photo enhanced successfully!",
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
    desc: "Upload an image, audio, or video file and convert it to anime style",
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
      // Send the file to the upload API
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

        // Proceed to convert the image to anime style using the new API
        const animeApiUrl = `https://itzpire.com/tools/photo2anime?url=${encodeURIComponent(fileUrl)}&type=version%202%20(%F0%9F%94%BA%20robustness,%F0%9F%94%BB%20stylization)`;
        
        // Fetch the response from the anime API
        const animeResponse = await fetch(animeApiUrl);

        // Check for a successful response
        if (!animeResponse.ok) {
          return await message.sendMessage(message.jid, `Error: ${animeResponse.status} ${animeResponse.statusText}`);
        }

        // Parse the response
        const data = await animeResponse.json();
        if (data.status !== "success") {
          return await message.sendMessage(message.jid, "An error occurred while fetching the anime image.");
        }

        const photoUrl = data.result.img;

        // Download the image and save it to a temporary file
        const imageResponse = await fetch(photoUrl);
        const buffer = await imageResponse.buffer();
        const tempFilePath = path.join(__dirname, 'temp_anime_image.jpg');

        // Write the image to a temporary file
        fs.writeFileSync(tempFilePath, buffer);

        // Send the anime-style photo to the user
        await message.sendMessage(
          message.jid,
          fs.readFileSync(tempFilePath),
          {
            mimetype: "image/jpeg",
            caption: "Here is your image converted to anime style!",
          },
          "image"
        );

        // Delete the temporary file after sending
        fs.unlinkSync(tempFilePath);

      } else {
        await message.reply("Failed to upload the file. Please try again.");
      }
    } catch (error) {
      console.error(error);
      await message.reply("An error occurred during the process.");
    }
  }
);