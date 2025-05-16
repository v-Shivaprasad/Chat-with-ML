const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

const GOOGLE_AI_KEY = process.env.GOOGLE_AI_KEY;
const genAI = new GoogleGenerativeAI(GOOGLE_AI_KEY);

async function analyzeImage(imageUrl) {
    try {
        console.log(`Attempting to fetch image from: ${imageUrl}`);

        const response = await axios.get(imageUrl, {
            responseType: "arraybuffer",
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Cookie':'cf_clearance=oyTmT.cCjsCHwIhAcGWmL7m7XX.2x487uq7daZLVNL8-1739977710-1.2.1.1-UfpMpa9AbEvxeF1dYOXygI7eKsOn3D0mZu559WPTVySSmM8I6M7iQtcEgKokE6dkIG..YmR_w029Cgu6GUhr8fbKh9hYu4nJoliFLTNXi7MQGhFPgHSoOmZsDFIR0u8kicgV5z7CWDyZVX0o5Vx9vMhJC7A.Y6LcxFkWab9HYxVVstwMK0G2dc.nOSabA7q8CUlRwFjlmDC9lkCbEXm2NHyucyocFNQ9I..u7iD.EnD4KeKNpIk96rKNWitR_8_gg8Rf_Up0Ovl4OXFAxc_OK3iTW9h.0Ezdvi7klm3.fUXUtmFOQGl3S11HiXt7SMowHfxfdmO_KmzDnq2UNdqpXQ; __gads=ID=39dc2a28d642209f:T=1728908767:RT=1739977917:S=ALNI_MbbvoJGhT65IirgjDnLAcd1YnyJWg; __gpi=UID=00000f4270ea2d6a:T=1728908767:RT=1739977917:S=ALNI_MbuIGdTINxL296jvxlAtdHVZcVTUg; _cfuvid=TtW0MXiZDP2y2W7gAXszV3zgkKMklFvx_PgrFeT4EXA-1747379539974-0.0.1.1-604800000; __cf_bm=mfTTwOsJX6Cqdz7GIYVuDdqoFN1Nbusjxr446qKc6BM-1747379671-1.0.1.1-fc2TnTDZbxm_6JzgQl38V4MlhrC2eMIjiz9ltkv8luHf50Jeo5hyyfXTEyO7rMeHcmRrz8QX5Sh3oCIXBKtDYFopEaEFDpzYcgij0wNPCeg',
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