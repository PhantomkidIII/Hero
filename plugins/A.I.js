const { command, isPrivate } = require("../lib/");
const axios = require("axios");
const fetch = require("node-fetch");
const FormData = require("form-data");
command(
  {
    pattern: "bing",
    fromMe: isPrivate,
    desc: "Ask bing anything.",
    type: "ai",
  },
  async (message, match) => {
    try {
      // Extract the query from the message
      const query = match ? match.trim() : null;
      if (!query) {
        return await message.reply("Please provide a query, e.g., `.bing What is life?`.");
      }

      // Define the API URL
      const apiUrl = `https://itzpire.com/ai/bing-ai?model=Precise&q=${encodeURIComponent(query)}`;
      const response = await fetch(apiUrl);

      // Check if the API response is successful
      if (!response.ok) {
        return await message.reply(`*_Error: ${response.status} ${response.statusText}_*`);
      }

      // Get the result from the API response
      const data = await response.json();
      const resultText = data.result; // Extract the result

      // Send the final response
      await message.reply(`*Response:* \n\n${resultText}`);
    } catch (error) {
      // Handle any errors
      await message.reply(`Failed to get a response. Error: ${error.message}`);
      console.error("Error fetching AI response:", error);
    }
  }
);
command(
  {
    pattern: "gpt",
    fromMe: isPrivate,
    desc: "Ask Gpt anything.",
    type: "ai",
  },
  async (message, match) => {
    try {
      // Extract the query from the message
      const query = match ? match.trim() : null;
      if (!query) {
        return await message.reply("Please provide a query, e.g., `.gpt What is life?`.");
      }

      // Define the API URL
      const apiUrl = `https://widipe.com/gpt4?text=${encodeURIComponent(query)}`;
      const response = await fetch(apiUrl);

      // Check if the API response is successful
      if (!response.ok) {
        return await message.reply(`*_Error: ${response.status} ${response.statusText}_*`);
      }

      // Get the result from the API response
      const data = await response.json();
      const resultText = data.result; // Extract the result

      // Send the final response
      await message.reply(`*Response:* \n\n${resultText}`);
    } catch (error) {
      // Handle any errors
      await message.reply(`Failed to get a response. Error: ${error.message}`);
      console.error("Error fetching AI response:", error);
    }
  }
);
command(
  {
    pattern: "gemini",
    fromMe: isPrivate,
    desc: "Ask Gemini anything.",
    type: "ai",
  },
  async (message, match) => {
    try {
      // Extract the query from the message
      const query = match ? match.trim() : null;
      if (!query) {
        return await message.reply("Please provide a query, e.g., `.Gemini What is life?`.");
      }

      // Define the API URL with the user's query
      const apiUrl = `https://api.ryzendesu.vip/api/ai/gemini?text=${encodeURIComponent(query)}`;
      const response = await fetch(apiUrl);

      // Check if the API response is successful
      if (!response.ok) {
        return await message.reply(`*_Error: ${response.status} ${response.statusText}_*`);
      }

      // Get the result from the API response
      const data = await response.json();
      const resultText = data.success ? data.answer : "Sorry, I couldn't understand your request."; // Handle success and error

      // Send the final response
      await message.reply(`*Response:* \n\n${resultText}`);
    } catch (error) {
      // Handle any errors
      await message.reply(`Failed to get a response. Error: ${error.message}`);
      console.error("Error fetching AI response:", error);
    }
  }
);
command(
  {
    pattern: "simi",
    fromMe: isPrivate,
    desc: "Ask ChatGPT anything.",
    type: "ai",
  },
  async (message, match) => {
    try {
      // Extract the query from the message
      const query = match ? match.trim() : null;
      if (!query) {
        return await message.reply("Please provide a query, e.g., `.Simi What’s the weather today?`.");
      }

      // Define the API URL with the user's query
      const apiUrl = `https://api.ryzendesu.vip/api/ai/chatgpt?text=${encodeURIComponent(query)}`;
      const response = await fetch(apiUrl);

      // Check if the API response is successful
      if (!response.ok) {
        return await message.reply(`*_Error: ${response.status} ${response.statusText}_*`);
      }

      // Get the result from the API response
      const data = await response.json();
      const resultText = data.success ? data.response : "Sorry, I couldn't understand your request."; // Handle success and error

      // Send the final response
      await message.reply(`*Response:* \n\n${resultText}`);
    } catch (error) {
      // Handle any errors
      await message.reply(`Failed to get a response. Error: ${error.message}`);
      console.error("Error fetching AI response:", error);
    }
  }
);
command(
  {
    pattern: "lumina",
    fromMe: isPrivate,
    desc: "Ask ChatGPT anything.",
    type: "ai",
  },
  async (message, match) => {
    try {
      // Extract the query from the message
      const query = match ? match.trim() : null;
      if (!query) {
        return await message.reply("Please provide a query, e.g., `.Lumina What’s the weather today?`.");
      }

      // Define the API URL with the user's query
      const apiUrl = `https://api.ryzendesu.vip/api/ai/chatgpt?text=${encodeURIComponent(query)}`;
      const response = await fetch(apiUrl);

      // Check if the API response is successful
      if (!response.ok) {
        return await message.reply(`*_Error: ${response.status} ${response.statusText}_*`);
      }

      // Get the result from the API response
      const data = await response.json();
      const resultText = data.success ? data.response : "Sorry, I couldn't understand your request."; // Handle success and error

      // Send the final response
      await message.reply(`*Response:* \n\n${resultText}`);
    } catch (error) {
      // Handle any errors
      await message.reply(`Failed to get a response. Error: ${error.message}`);
      console.error("Error fetching AI response:", error);
    }
  }
);
command(
  {
    pattern: "blackbox-ai",
    fromMe: isPrivate,
    desc: "Ask Simi anything.",
    type: "ai",
  },
  async (message, match) => {
    try {
      // Extract the query from the message
      const query = match ? match.trim() : null;
      if (!query) {
        return await message.reply("Please provide a query, e.g., `.blackbox What is life?`.");
      }

      // Define the API URL with the user's query
      const apiUrl = `https://api.ryzendesu.vip/api/ai/blackbox?chat=${encodeURIComponent(query)}&options=gpt-4o`;
      const response = await fetch(apiUrl);

      // Check if the API response is successful
      if (!response.ok) {
        return await message.reply(`*_Error: ${response.status} ${response.statusText}_*`);
      }

      // Get the result from the API response
      const data = await response.json();
      const resultText = data.response; // Adjusted to match the provided response format

      // Send the final response
      await message.reply(`*Response:* \n\n${resultText}`);
    } catch (error) {
      // Handle any errors
      await message.reply(`Failed to get a response. Error: ${error.message}`);
      console.error("Error fetching AI response:", error);
    }
  }
);
const { command, isPrivate } = require("../lib/");
const axios = require("axios");
const FormData = require("form-data");

command(
  {
    pattern: "removebg",
    fromMe: isPrivate,
    desc: "Upload an image, audio, or video file",
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

    // Download the file
    let buff = await m.quoted.download();
    
    // Create FormData to send to the API
    const formData = new FormData();
    formData.append('file', buff, { filename: 'file.jpg' }); // assuming the file is an image for bg removal

    try {
      // Send the file to the upload API
      const uploadResponse = await axios.post('https://itzpire.com/tools/upload', formData, {
        headers: {
          ...formData.getHeaders(),
        },
      });

      // Check the response from the upload API
      if (uploadResponse.data.status === "success" && uploadResponse.data.fileInfo && uploadResponse.data.fileInfo.url) {
        let fileUrl = uploadResponse.data.fileInfo.url;

        // Send the URL to the removebg API
        const removeBgResponse = await axios.get(`https://widipe.com/removebg?url=${encodeURIComponent(fileUrl)}`);

        // Check the response from the removebg API
        if (removeBgResponse.data && removeBgResponse.data.result && removeBgResponse.data.result.urls) {
          const finalImageUrl = removeBgResponse.data.result.urls;

          // Send back the image to the user using the specified format
          return await message.sendMessage(
            message.jid,
            { url: finalImageUrl },
            {
              mimetype: "image/jpeg",
              caption: "𝐍𝐄𝐗𝐔𝐒-𝐁𝐎𝐓 Image Generated",
            },
            "image"
          );
        } else {
          return await message.sendMessage(message.jid, "Failed to process the image. Please try again.");
        }
      } else {
        return await message.sendMessage(message.jid, "Failed to upload the file. Please try again.");
      }
    } catch (error) {
      console.error(error);
      return await message.sendMessage(message.jid, "An error occurred while processing your request.");
    }
  }
);