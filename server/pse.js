const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const GOOGLE_PSE_API_KEY = process.env.GOOGLE_PSE_API_KEY;
const GOOGLE_SEARCH_ENGINE_ID = process.env.GOOGLE_SEARCH_ENGINE_ID;

/**
 * Searches for an image related to a given topic using Google Programmable Search Engine.
 * @param {string} topic - The topic to search for.
 * @returns {Promise<string|null>} - Returns the first image URL or null if no image is found.
 */
async function searchImage(topic) {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/customsearch/v1`,
      {
        params: {
          key: GOOGLE_PSE_API_KEY,
          cx: GOOGLE_SEARCH_ENGINE_ID,
          q: `${topic} machine learning`,
          searchType: "image",
          num: 1,
        },
      }
    );

    const items = response.data.items;
    if (items && items.length > 0) {
      return items[0].link; // Return the first image result
    }
    return null;
  } catch (error) {
    console.error("Error searching for image:", error);
    return null;
  }
}

module.exports = searchImage;
