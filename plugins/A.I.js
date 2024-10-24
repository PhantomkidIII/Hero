const {
  command,
  isPrivate,
  isUrl,
  AddMp3Meta,
  getBuffer,
  toAudio,
} = require("../lib");
const axios = require("axios");
const fetch = require("node-fetch");
const FormData = require("form-data");
const cheerio = require('cheerio');
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
    type: "ai",
  },
  async (message, match) => {
    match = match || message.reply_message.text;
    if (!match) return await message.sendMessage(message.jid, "Provide me a text");

    try {
      // Call the API to generate the image from the text
      const apiUrl = `https://widipe.com/v1/text2img?text=${encodeURIComponent(match)}`;
      
      // Fetch the response from the API
      const response = await fetch(apiUrl);

      // Check for a successful response
      if (!response.ok) {
        return await message.sendMessage(message.jid, `Error: ${response.status} ${response.statusText}`);
      }

      // Get the content type of the response
      const contentType = response.headers.get('content-type');

      if (contentType && contentType.startsWith('image')) {
        // If the response is an image, send it directly
        const imageBuffer = await response.buffer(); // Get the image as a buffer
        return await message.sendMessage(
          message.jid,
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
          return await message.sendMessage(message.jid, "An error occurred while fetching the data.");
        }

        const photoUrl = data.result;

        // Send the photo URL to the user
        return await message.sendMessage(
          message.jid,
          { url: photoUrl },
          {
            mimetype: "image/jpeg",
            caption: "𝐍𝐄𝐗𝐔𝐒-𝐁𝐎𝐓 Image Generated",
          },
          "image"
        );
      } else {
        // Handle unexpected content types
        return await message.sendMessage(message.jid, "Unexpected content type received from the API.");
      }
    } catch (error) {
      console.error(error);
      return await message.sendMessage(message.jid, "Failed to generate image.");
    }
  }
);
command(
  {
    pattern: "dalle2",
    fromMe: isPrivate,
    desc: "Generate image from text",
    type: "ai",
  },
  async (message, match) => {
    match = match || message.reply_message.text;
    if (!match) return await message.sendMessage(message.jid, "Provide me a text");

    try {
      // Call the API to generate the image from the text
      const apiUrl = `https://api.ryzendesu.vip/api/ai/flux-diffusion?prompt=${encodeURIComponent(match)}`;
      
      // Fetch the response from the API
      const response = await fetch(apiUrl);

      // Check for a successful response
      if (!response.ok) {
        return await message.sendMessage(message.jid, `Error: ${response.status} ${response.statusText}`);
      }

      // Get the content type of the response
      const contentType = response.headers.get('content-type');

      if (contentType && contentType.startsWith('image')) {
        // If the response is an image, send it directly
        const imageBuffer = await response.buffer(); // Get the image as a buffer
        return await message.sendMessage(
          message.jid,
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
          return await message.sendMessage(message.jid, "An error occurred while fetching the data.");
        }

        const photoUrl = data.result;

        // Send the photo URL to the user
        return await message.sendMessage(
          message.jid,
          { url: photoUrl },
          {
            mimetype: "image/jpeg",
            caption: "𝐍𝐄𝐗𝐔𝐒-𝐁𝐎𝐓 Image Generated",
          },
          "image"
        );
      } else {
        // Handle unexpected content types
        return await message.sendMessage(message.jid, "Unexpected content type received from the API.");
      }
    } catch (error) {
      console.error(error);
      return await message.sendMessage(message.jid, "Failed to generate image.");
    }
  }
);
command(
  {
    pattern: "flux",
    fromMe: isPrivate,
    desc: "Generate image from text",
    type: "ai",
  },
  async (message, match) => {
    match = match || message.reply_message.text;
    if (!match) return await message.sendMessage(message.jid, "Provide me a text");

    try {
      // Call the API to generate the image from the text
      const apiUrl = `https://api.ryzendesu.vip/api/ai/text2img?prompt=${encodeURIComponent(match)}`;
      
      // Fetch the response from the API
      const response = await fetch(apiUrl);

      // Check for a successful response
      if (!response.ok) {
        return await message.sendMessage(message.jid, `Error: ${response.status} ${response.statusText}`);
      }

      // Get the content type of the response
      const contentType = response.headers.get('content-type');

      if (contentType && contentType.startsWith('image')) {
        // If the response is an image, send it directly
        const imageBuffer = await response.buffer(); // Get the image as a buffer
        return await message.sendMessage(
          message.jid,
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
          return await message.sendMessage(message.jid, "An error occurred while fetching the data.");
        }

        const photoUrl = data.result;

        // Send the photo URL to the user
        return await message.sendMessage(
          message.jid,
          { url: photoUrl },
          {
            mimetype: "image/jpeg",
            caption: "𝐍𝐄𝐗𝐔𝐒-𝐁𝐎𝐓 Image Generated",
          },
          "image"
        );
      } else {
        // Handle unexpected content types
        return await message.sendMessage(message.jid, "Unexpected content type received from the API.");
      }
    } catch (error) {
      console.error(error);
      return await message.sendMessage(message.jid, "Failed to generate image.");
    }
  }
);
command(
  {
    pattern: "ss",
    fromMe: isPrivate,
    desc: "Generate image from text",
    type: "ai",
  },
  async (message, match) => {
    match = match || message.reply_message.text;
    if (!match) return await message.sendMessage(message.jid, "Provide me a text");

    try {
      // Call the API to generate the image from the text
      const apiUrl = `https://api.screenshotmachine.com/?key=d11d36&url=${encodeURIComponent(match)}&dimension=1024x768`;
      
      // Fetch the response from the API
      const response = await fetch(apiUrl);

      // Check for a successful response
      if (!response.ok) {
        return await message.sendMessage(message.jid, `Error: ${response.status} ${response.statusText}`);
      }

      // Get the content type of the response
      const contentType = response.headers.get('content-type');

      if (contentType && contentType.startsWith('image')) {
        // If the response is an image, send it directly
        const imageBuffer = await response.buffer(); // Get the image as a buffer
        return await message.sendMessage(
          message.jid,
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
          return await message.sendMessage(message.jid, "An error occurred while fetching the data.");
        }

        const photoUrl = data.result;

        // Send the photo URL to the user
        return await message.sendMessage(
          message.jid,
          { url: photoUrl },
          {
            mimetype: "image/jpeg",
            caption: "𝐍𝐄𝐗𝐔𝐒-𝐁𝐎𝐓 Image Generated",
          },
          "image"
        );
      } else {
        // Handle unexpected content types
        return await message.sendMessage(message.jid, "Unexpected content type received from the API.");
      }
    } catch (error) {
      console.error(error);
      return await message.sendMessage(message.jid, "Failed to generate image.");
    }
  }
);
command(
  {
    pattern: "trt",
    fromMe: isPrivate,
    desc: "Translate text using the specified languages.",
    type: "ai",
  },
  async (message, match) => {
    try {
      // Extract the query from the message
      const query = match ? match.trim() : null;
      if (!query) {
        return await message.reply("Please provide text to translate, e.g., `.translate Hello`.");
      }

      // Define the API URL, assuming the target language is French for this example
      const apiUrl = `https://api.kastg.xyz/api/tool/translate?input=${encodeURIComponent(query)}&to=en&from=auto`;
      const response = await fetch(apiUrl);

      // Check if the API response is successful
      if (!response.ok) {
        return await message.reply(`*_Error: ${response.status} ${response.statusText}_*`);
      }

      // Get the result from the API response
      const data = await response.json();
      const result = data.result[0]; // Extract the result

      // Send the final translation result
      await message.reply(`*Translation:* \n\nFrom: ${result.from_language}\nTo: ${result.to_language}\nInput: ${result.input}\nOutput: ${result.output}`);
    } catch (error) {
      // Handle any errors
      await message.reply(`Failed to get a response. Error: ${error.message}`);
      console.error("Error fetching translation:", error);
    }
  }
);
command(
  {
    pattern: "aimoji",
    fromMe: isPrivate,
    desc: "Generate image from text",
    type: "ai",
  },
  async (message, match) => {
    match = match || message.reply_message.text;
    if (!match) return await message.sendMessage(message.jid, "Provide me a text");

    try {
      // Call the API to generate the image from the text
      const apiUrl = `https://api.ryzendesu.vip/api/ai/aimoji?prompt=${encodeURIComponent(match)}`;
      
      // Fetch the response from the API
      const response = await fetch(apiUrl);

      // Check for a successful response
      if (!response.ok) {
        return await message.sendMessage(message.jid, `Error: ${response.status} ${response.statusText}`);
      }

      // Get the content type of the response
      const contentType = response.headers.get('content-type');

      if (contentType && contentType.startsWith('image')) {
        // If the response is an image, send it directly
        const imageBuffer = await response.buffer(); // Get the image as a buffer
        return await message.sendMessage(
          message.jid,
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
          return await message.sendMessage(message.jid, "An error occurred while fetching the data.");
        }

        const photoUrl = data.result;

        // Send the photo URL to the user
        return await message.sendMessage(
          message.jid,
          { url: photoUrl },
          {
            mimetype: "image/jpeg",
            caption: "𝐍𝐄𝐗𝐔𝐒-𝐁𝐎𝐓 Image Generated",
          },
          "image"
        );
      } else {
        // Handle unexpected content types
        return await message.sendMessage(message.jid, "Unexpected content type received from the API.");
      }
    } catch (error) {
      console.error(error);
      return await message.sendMessage(message.jid, "Failed to generate image.");
    }
  }
);
command(
  {
    pattern: "vintageanime",
    fromMe: isPrivate,
    desc: "Generate image from text",
    type: "ai",
  },
  async (message, match) => {
    match = match || message.reply_message.text;
    if (!match) return await message.sendMessage(message.jid, "Provide me a text");

    try {
      // Call the API to generate the image from the text
      const apiUrl = `https://api.ryzendesu.vip/api/ai/waifu-diff?prompt=${encodeURIComponent(match)}&style=Vintage-Anime`;
      
      // Fetch the response from the API
      const response = await fetch(apiUrl);

      // Check for a successful response
      if (!response.ok) {
        return await message.sendMessage(message.jid, `Error: ${response.status} ${response.statusText}`);
      }

      // Get the content type of the response
      const contentType = response.headers.get('content-type');

      if (contentType && contentType.startsWith('image')) {
        // If the response is an image, send it directly
        const imageBuffer = await response.buffer(); // Get the image as a buffer
        return await message.sendMessage(
          message.jid,
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
          return await message.sendMessage(message.jid, "An error occurred while fetching the data.");
        }

        const photoUrl = data.result;

        // Send the photo URL to the user
        return await message.sendMessage(
          message.jid,
          { url: photoUrl },
          {
            mimetype: "image/jpeg",
            caption: "𝐍𝐄𝐗𝐔𝐒-𝐁𝐎𝐓 Image Generated",
          },
          "image"
        );
      } else {
        // Handle unexpected content types
        return await message.sendMessage(message.jid, "Unexpected content type received from the API.");
      }
    } catch (error) {
      console.error(error);
      return await message.sendMessage(message.jid, "Failed to generate image.");
    }
  }
);
command(
  {
    pattern: "softanime",
    fromMe: isPrivate,
    desc: "Generate image from text",
    type: "ai",
  },
  async (message, match) => {
    match = match || message.reply_message.text;
    if (!match) return await message.sendMessage(message.jid, "Provide me a text");

    try {
      // Call the API to generate the image from the text
      const apiUrl = `https://api.ryzendesu.vip/api/ai/waifu-diff?prompt=${encodeURIComponent(match)}&style=Soft-Anime`;
      
      // Fetch the response from the API
      const response = await fetch(apiUrl);

      // Check for a successful response
      if (!response.ok) {
        return await message.sendMessage(message.jid, `Error: ${response.status} ${response.statusText}`);
      }

      // Get the content type of the response
      const contentType = response.headers.get('content-type');

      if (contentType && contentType.startsWith('image')) {
        // If the response is an image, send it directly
        const imageBuffer = await response.buffer(); // Get the image as a buffer
        return await message.sendMessage(
          message.jid,
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
          return await message.sendMessage(message.jid, "An error occurred while fetching the data.");
        }

        const photoUrl = data.result;

        // Send the photo URL to the user
        return await message.sendMessage(
          message.jid,
          { url: photoUrl },
          {
            mimetype: "image/jpeg",
            caption: "𝐍𝐄𝐗𝐔𝐒-𝐁𝐎𝐓 Image Generated",
          },
          "image"
        );
      } else {
        // Handle unexpected content types
        return await message.sendMessage(message.jid, "Unexpected content type received from the API.");
      }
    } catch (error) {
      console.error(error);
      return await message.sendMessage(message.jid, "Failed to generate image.");
    }
  }
);
command(
  {
    pattern: "animewaifu",
    fromMe: isPrivate,
    desc: "Generate image from text",
    type: "ai",
  },
  async (message, match) => {
    match = match || message.reply_message.text;
    if (!match) return await message.sendMessage(message.jid, "Provide me a text");

    try {
      // Call the API to generate the image from the text
      const apiUrl = `https://api.ryzendesu.vip/api/ai/waifu-diff?prompt=${encodeURIComponent(match)}&style=Waifu`;
      
      // Fetch the response from the API
      const response = await fetch(apiUrl);

      // Check for a successful response
      if (!response.ok) {
        return await message.sendMessage(message.jid, `Error: ${response.status} ${response.statusText}`);
      }

      // Get the content type of the response
      const contentType = response.headers.get('content-type');

      if (contentType && contentType.startsWith('image')) {
        // If the response is an image, send it directly
        const imageBuffer = await response.buffer(); // Get the image as a buffer
        return await message.sendMessage(
          message.jid,
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
          return await message.sendMessage(message.jid, "An error occurred while fetching the data.");
        }

        const photoUrl = data.result;

        // Send the photo URL to the user
        return await message.sendMessage(
          message.jid,
          { url: photoUrl },
          {
            mimetype: "image/jpeg",
            caption: "𝐍𝐄𝐗𝐔𝐒-𝐁𝐎𝐓 Image Generated",
          },
          "image"
        );
      } else {
        // Handle unexpected content types
        return await message.sendMessage(message.jid, "Unexpected content type received from the API.");
      }
    } catch (error) {
      console.error(error);
      return await message.sendMessage(message.jid, "Failed to generate image.");
    }
  }
);
command(
  {
    pattern: "animeimage",
    fromMe: isPrivate,
    desc: "Generate image from text",
    type: "ai",
  },
  async (message, match) => {
    match = match || message.reply_message.text;
    if (!match) return await message.sendMessage(message.jid, "Provide me a text");

    try {
      // Call the API to generate the image from the text
      const apiUrl = `https://api.ryzendesu.vip/api/ai/waifu-diff?prompt=${encodeURIComponent(match)}&style=Anime`;
      
      // Fetch the response from the API
      const response = await fetch(apiUrl);

      // Check for a successful response
      if (!response.ok) {
        return await message.sendMessage(message.jid, `Error: ${response.status} ${response.statusText}`);
      }

      // Get the content type of the response
      const contentType = response.headers.get('content-type');

      if (contentType && contentType.startsWith('image')) {
        // If the response is an image, send it directly
        const imageBuffer = await response.buffer(); // Get the image as a buffer
        return await message.sendMessage(
          message.jid,
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
          return await message.sendMessage(message.jid, "An error occurred while fetching the data.");
        }

        const photoUrl = data.result;

        // Send the photo URL to the user
        return await message.sendMessage(
          message.jid,
          { url: photoUrl },
          {
            mimetype: "image/jpeg",
            caption: "𝐍𝐄𝐗𝐔𝐒-𝐁𝐎𝐓 Image Generated",
          },
          "image"
        );
      } else {
        // Handle unexpected content types
        return await message.sendMessage(message.jid, "Unexpected content type received from the API.");
      }
    } catch (error) {
      console.error(error);
      return await message.sendMessage(message.jid, "Failed to generate image.");
    }
  }
);
command(
  {
    pattern: "ghiblianime",
    fromMe: isPrivate,
    desc: "Generate image from text",
    type: "ai",
  },
  async (message, match) => {
    match = match || message.reply_message.text;
    if (!match) return await message.sendMessage(message.jid, "Provide me a text");

    try {
      // Call the API to generate the image from the text
      const apiUrl = `https://api.ryzendesu.vip/api/ai/waifu-diff?prompt=${encodeURIComponent(match)}&style=Studio-Ghibli`;
      
      // Fetch the response from the API
      const response = await fetch(apiUrl);

      // Check for a successful response
      if (!response.ok) {
        return await message.sendMessage(message.jid, `Error: ${response.status} ${response.statusText}`);
      }

      // Get the content type of the response
      const contentType = response.headers.get('content-type');

      if (contentType && contentType.startsWith('image')) {
        // If the response is an image, send it directly
        const imageBuffer = await response.buffer(); // Get the image as a buffer
        return await message.sendMessage(
          message.jid,
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
          return await message.sendMessage(message.jid, "An error occurred while fetching the data.");
        }

        const photoUrl = data.result;

        // Send the photo URL to the user
        return await message.sendMessage(
          message.jid,
          { url: photoUrl },
          {
            mimetype: "image/jpeg",
            caption: "𝐍𝐄𝐗𝐔𝐒-𝐁𝐎𝐓 Image Generated",
          },
          "image"
        );
      } else {
        // Handle unexpected content types
        return await message.sendMessage(message.jid, "Unexpected content type received from the API.");
      }
    } catch (error) {
      console.error(error);
      return await message.sendMessage(message.jid, "Failed to generate image.");
    }
  }
);
command(
  {
    pattern: "cuteanime",
    fromMe: isPrivate,
    desc: "Generate image from text",
    type: "ai",
  },
  async (message, match) => {
    match = match || message.reply_message.text;
    if (!match) return await message.sendMessage(message.jid, "Provide me a text");

    try {
      // Call the API to generate the image from the text
      const apiUrl = `https://api.ryzendesu.vip/api/ai/waifu-diff?prompt=${encodeURIComponent(match)}&style=Cute-Anime`;
      
      // Fetch the response from the API
      const response = await fetch(apiUrl);

      // Check for a successful response
      if (!response.ok) {
        return await message.sendMessage(message.jid, `Error: ${response.status} ${response.statusText}`);
      }

      // Get the content type of the response
      const contentType = response.headers.get('content-type');

      if (contentType && contentType.startsWith('image')) {
        // If the response is an image, send it directly
        const imageBuffer = await response.buffer(); // Get the image as a buffer
        return await message.sendMessage(
          message.jid,
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
          return await message.sendMessage(message.jid, "An error occurred while fetching the data.");
        }

        const photoUrl = data.result;

        // Send the photo URL to the user
        return await message.sendMessage(
          message.jid,
          { url: photoUrl },
          {
            mimetype: "image/jpeg",
            caption: "𝐍𝐄𝐗𝐔𝐒-𝐁𝐎𝐓 Image Generated",
          },
          "image"
        );
      } else {
        // Handle unexpected content types
        return await message.sendMessage(message.jid, "Unexpected content type received from the API.");
      }
    } catch (error) {
      console.error(error);
      return await message.sendMessage(message.jid, "Failed to generate image.");
    }
  }
);
command(
  {
    pattern: "tts",
    fromMe: isPrivate,
    desc: "Convert text to speech",
    type: "ai"
  },
  async (message, match) => {
    match = match || message.reply_message.text;
    if (!match) return await message.reply("Please provide a text input for TTS");

    let apiUrl = `https://api.kastg.xyz/api/ai/tts?input=${encodeURIComponent(match)}&lang=English&voice=Emily`;

    try {
      let response = await fetch(apiUrl);
      let json = await response.json();

      if (json.status === "true" && json.result[0] && json.result[0].url) {
        let audioUrl = json.result[0].url;
        let audioBuffer = await getBuffer(audioUrl);

        return await message.sendMessage(
          message.jid,
          audioBuffer,
          {
            mimetype: "audio/mpeg",
            filename: "tts_emily.mp3",
          },
          "audio"
        );
      } else {
        return await message.reply("Failed to generate TTS audio. Try again.");
      }
    } catch (error) {
      console.log(error);
      return await message.reply("An error occurred while processing the request.");
    }
  }
);
command(
  {
    pattern: "manga",
    fromMe: isPrivate,
    desc: "Generate manga chapter images from MangaNato",
    type: "anime",
  },
  async (message, match) => {
    match = match || message.reply_message.text;
    if (!match) return await message.sendMessage(message.jid, "Provide a manga title and chapter number, e.g., manga One Piece chapter 1120");

    try {
      // Extract the manga title and chapter number from the input
      const queryMatch = match.match(/(.+?)\s+chapter\s+(\d+)/i);
      if (!queryMatch) {
        return await message.sendMessage(message.jid, "Invalid query format. Use: manga <title> chapter <number>");
      }

      const mangaTitle = queryMatch[1].trim().replace(/\s+/g, '_').toLowerCase(); // Format for URL
      const chapterNumber = queryMatch[2];

      // Step 1: Search for manga on MangaNato
      const searchUrl = `https://manganato.com/search/story/${encodeURIComponent(mangaTitle)}`;
      const searchResponse = await axios.get(searchUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
          'Referer': 'https://manganato.com/',
        },
      });
      const searchHtml = searchResponse.data;
      const $ = cheerio.load(searchHtml);

      // Step 2: Get the first manga result and its ID
      const firstMangaLink = $('a.item-title').first().attr('href');
      if (!firstMangaLink) {
        return await message.sendMessage(message.jid, `No manga found with the title "${mangaTitle}".`);
      }

      const mangaIdMatch = firstMangaLink.match(/manga-([a-zA-Z0-9]+)/);
      if (!mangaIdMatch) {
        return await message.sendMessage(message.jid, "Error: Could not extract manga ID.");
      }
      const mangaId = mangaIdMatch[0]; // Example: 'manga-aa951409'

      // Step 3: Construct the chapter URL
      const chapterUrl = `https://chapmanganato.to/${mangaId}/chapter-${chapterNumber}`;
      console.log(`Fetching URL: ${chapterUrl}`);

      // Step 4: Scrape manga images from the chapter page
      const chapterResponse = await axios.get(chapterUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
          'Referer': `https://chapmanganato.to/`,
        },
      });
      const chapterHtml = chapterResponse.data;
      const chapterPage = cheerio.load(chapterHtml);

      // Extract all image URLs
      const imageUrls = [];
      chapterPage('img').each((i, img) => {
        const imageUrl = chapterPage(img).attr('src');
        if (imageUrl) {
          imageUrls.push(imageUrl);
        }
      });

      if (imageUrls.length === 0) {
        return await message.sendMessage(message.jid, `No images found for chapter ${chapterNumber} of "${mangaTitle}".`);
      }

      // Step 5: Send each image to the user
      for (const imageUrl of imageUrls) {
        await message.sendMessage(message.jid, imageUrl, { mimetype: "image/jpeg" }, "image");
      }

    } catch (error) {
      console.error("Error: ", error); // Log error for debugging
      return await message.sendMessage(message.jid, `Error: ${error.message}\n\nCommand: manga\nFailed to fetch manga chapter.`);
    }
  }
);