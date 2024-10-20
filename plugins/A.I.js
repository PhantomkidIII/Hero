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
command(
  {
    pattern: "dalle",
    fromMe: isPrivate,
    desc: "Generate image from text",
    type: "image",
  },
  async (message, match) => {
    match = match || message.reply_message.text;
    if (!match) return await message.reply("Provide me a text");

    try {
      // Call the API to generate the image from the text
      const apiUrl = `https://widipe.com/v1/text2img?text=${encodeURIComponent(match)}`;
      
      // Fetch the response from the API
      const response = await fetch(apiUrl);

      // Check for a successful response
      if (!response.ok) {
        return await message.reply(`Error: ${response.status} ${response.statusText}`);
      }

      // Get the content type of the response
      const contentType = response.headers.get('content-type');

      if (contentType && contentType.startsWith('image')) {
        // If the response is an image, send it directly
        const imageBuffer = await response.buffer(); // Get the image as a buffer
        return await message.reply(
          imageBuffer,
          {
            mimetype: "image/jpeg",
            caption: "𝐍𝐄𝐗𝐔𝐒-𝐁𝐎𝐓 Image Generated",
          },
          "image"
        );
      } else if (contentType && contentType.includes('application/json')) {
        // If the response is JSON, parse it and get the image URL
        const data = await response.json();
        if (data.status !== 200) {
          return await message.reply("An error occurred while fetching the data.");
        }

        const photoUrl = data.result;

        // Send the photo URL to the user
        return await message.reply(
          { url: photoUrl },
          {
            mimetype: "image/jpeg",
            caption: "𝐍𝐄𝐗𝐔𝐒-𝐁𝐎𝐓 Image Generated",
          },
          "image"
        );
      } else {
        // Handle unexpected content types
        return await message.reply("Unexpected content type received from the API.");
      }
    } catch (error) {
      console.error(error);
      return await message.reply("Failed to generate image.");
    }
  }
);
command(
  {
    pattern: "img",
    fromMe: isPrivate,
    desc: "Generate image from text",
    type: "image",
  },
  async (message, match) => {
    match = match || message.reply_message.text;
    if (!match) return await message.reply("Provide me a text");

    try {
      // Call the API to generate the image from the text
      const apiUrl = `https://widipe.com/bingimg?text=${encodeURIComponent(match)}`;
      
      // Fetch the response from the API
      const response = await fetch(apiUrl);

      // Check for a successful response
      if (!response.ok) {
        return await message.reply(`Error: ${response.status} ${response.statusText}`);
      }

      // Parse the JSON response
      const data = await response.json();
      if (!data.status || data.result.length === 0) {
        return await message.reply("No images found or an error occurred.");
      }

      // Send only the first image from the result array
      const imageUrl = data.result[0]; // Get the first image link
      await message.reply(
        { url: imageUrl },
        {
          mimetype: "image/jpeg",
          caption: "𝐍𝐄𝐗𝐔𝐒-𝐁𝐎𝐓 Image Generated", // Changed caption to match your bot's name
        },
        "image"
      );
    } catch (error) {
      console.error(error);
      return await message.reply("Failed to generate image.");
    }
  }
);