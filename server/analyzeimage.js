const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

const GOOGLE_AI_KEY = process.env.GOOGLE_AI_KEY;
const genAI = new GoogleGenerativeAI(GOOGLE_AI_KEY);

/**
 * Analyzes an image and extracts a meaningful description using Gemini Pro Vision.
 * @param {string} imageUrl - The URL of the image to analyze.
 * @returns {Promise<string>} - Returns the image description or an error message.
 */
async function analyzeImage(imageUrl) {
    try {
        console.log(`Attempting to fetch image from: ${imageUrl}`);

        const response = await axios.get(imageUrl, {
            responseType: "arraybuffer",
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            },
        });

        const buffer = Buffer.from(response.data, "binary").toString("base64");
        const contentType = response.headers["content-type"];

        // Update the model name here
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // or "gemini-1.5-pro"

        const result = await model.generateContent([
            { inlineData: { mimeType: contentType, data: buffer } },
        ]);

        const responseText = result.response.text().trim();
        return responseText || "No meaningful description found.";
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(`Error fetching image: ${error.message}, Status: ${error.response?.status}`);
            if(error.response?.status === 403){
              return "The image could not be accessed. Please try another image, or search term.";
            }

        } else if (error instanceof GoogleGenerativeAI.GoogleGenerativeAIError) {
            console.error(`Gemini AI Error: ${error.message}, Status: ${error.status}`);
            return "There was an error with the Gemini AI service. Please try again later.";
        } else {
            console.error("Unexpected error analyzing image:", error);
        }

        return "I couldn't analyze the image. Please try again later.";
    }
}

module.exports = analyzeImage;