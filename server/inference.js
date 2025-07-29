const Groq = require('groq-sdk');
const dotenv = require('dotenv');

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// async function getLlamaResponse(prompt) {
//     try {
//         const chatCompletion = await groq.chat.completions.create({
//             model: "llama-3.3-70b-versatile",
//             messages: [{ role: "user", content: prompt }],
//             temperature: 0.7,
//             max_completion_tokens: 2000,
//             top_p: 1,
//             stream: false // Change to true if you want streaming responses
//         });

//         return chatCompletion.choices[0]?.message?.content.trim() || "No response from LLaMA.";
//     } catch (error) {
//         console.error("Error in LLaMA inference:", error);
//         return "Error processing the request.";
//     }
// }


async function getLlamaResponse(prompt) {
    try {
        const response = await fetch("https://923da1371be2.ngrok-free.app/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: prompt }) // Flask expects 'text' key
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.prediction?.trim() || "No response from LLaMA.";
    } catch (error) {
        console.error("Error in LLaMA inference:", error);
        return "Error processing the request.";
    }
}

module.exports = { getLlamaResponse };
