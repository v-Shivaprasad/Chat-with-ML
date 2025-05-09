// const axios = require('axios');
// const dotenv = require('dotenv');

// dotenv.config();

// const GOOGLE_API_KEY = process.env.GOOGLE_AI_KEY;
// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
// const geminiConfig = {
//   temperature: 0.9,
//   topP: 1,
//   topK: 1,
//   maxOutputTokens: 4096,
// };

// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-pro",
//   geminiConfig,
// });

// // ✅ Handling casual messages
// const casualResponses = {
//   "hi": "Hello! How can I assist you with machine learning today?",
//   "hello": "Hi there! What machine learning topic would you like to discuss?",
//   "thanks": "You're welcome! Feel free to ask any machine learning-related questions.",
//   "thank you": "You're welcome! Let me know if you have any more questions about machine learning.",
//   "ok": "Let me know if you have any more questions about machine learning."
// };

// /**
//  * Classifies a user query as "Machine Learning" or "Non-Machine Learning" and extracts the topic.
//  * @param {string} query - The user's question or input.
//  * @returns {Promise<{ type: string, topic: string, searchQuery: string }>}
//  */
// const classifyQuery = async (query) => {
//   console.log("User Query:", query);

//   // ✅ Check for casual messages
//   const lowerCaseQuery = query.toLowerCase();
//   if (casualResponses[lowerCaseQuery]) {
//     return { type: 'Casual', response: casualResponses[lowerCaseQuery] };
//   }

//   const classifierPrompt = `
//     ## Query Classification
//     Please classify the following query as 'Machine Learning' or 'Non-Machine Learning'
//     and also identify the core topic.

//     Query: "${query}"

//     Return a JSON response in the following format:
//     \`\`\`json
//     {
//       "type": "Machine Learning" or "Non-Machine Learning",
//       "topic": "Short topic description",
//       "searchQuery": "Optimized Google search query"
//     }
//     \`\`\`
//   `;

//   try {
//     // 🔥 Send the classification request to Gemini AI
//     const result = await model.generateContent(classifierPrompt);
//     let responseText = result.response.text().trim();

//     // 🔥 Fix: Remove code block markers before parsing JSON
//     if (responseText.startsWith("```json")) {
//       responseText = responseText.replace(/```json|```/g, "").trim();
//     }

//     const parsedResponse = JSON.parse(responseText);

//     return {
//       type: parsedResponse.type || 'Machine Learning',
//       topic: parsedResponse.topic || 'General Machine Learning',
//       searchQuery: parsedResponse.searchQuery || query + " in machine learning"
//     };
//   } catch (error) {
//     console.error('Error classifying query:', error);
//     return {
//       type: 'Error',
//       topic: 'General Machine Learning',
//       searchQuery: query,
//       response: null
//     };
//   }
// };

// module.exports = classifyQuery;
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const GOOGLE_API_KEY = process.env.GOOGLE_AI_KEY;
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
const geminiConfig = {
  temperature: 0.9,
  topP: 1,
  topK: 1,
  maxOutputTokens: 4096,
};

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  geminiConfig,
});

const casualResponses = {
  "hi": "Hello! How can I assist you with machine learning today?",
  "hello": "Hi there! What ML topic would you like to discuss?",
  "thanks": "You're welcome! Feel free to ask any ML-related questions.",
  "thank you": "You're welcome! Let me know if you need more help.",
  "ok": "Let me know if you have any more questions."
};

/**
 * Classifies a user query and determines if an image is needed.
 * @param {string} query - The user's question or input.
 * @returns {Promise<{ type: string, topic: string, searchQuery: string, needsImage: boolean }>}
 */
const classifyQuery = async (query) => {
  console.log("User Query:", query);

  // ✅ Check for casual messages
  const lowerCaseQuery = query.toLowerCase();
  if (casualResponses[lowerCaseQuery]) {
    return { type: 'Casual', response: casualResponses[lowerCaseQuery] };
  }

  // const classifierPrompt = `
  //   ## Query Classification
  //   Please classify the following query as 'Machine Learning' or 'Non-Machine Learning'.
  //   Also, extract the core topic and determine if an image is needed.

  //   Query: "${query}"

  //   Return a JSON response in the following format:
  //   \`\`\`json
  //   {
  //     "type": "Machine Learning" or "Non-Machine Learning",
  //     "topic": "Short topic description",
  //     "searchQuery": "Optimized Google search query",
  //     "needsImage": true or false
  //   }
  //   \`\`\`

  //   Images are needed for topics involving:
  //   - Architecture Diagrams (e.g., CNN, RNN, Decision Trees)
  //   - Algorithm Workflows (e.g., Backpropagation, Clustering)
  //   - Mathematical Graphs (e.g., Loss Functions, Bias-Variance Tradeoff)
    
  //   Images are NOT needed for:
  //   - Advantages, Disadvantages, Applications
  //   - Ethical Considerations
  //   - Text-based Comparisons (CNN vs. RNN, AI vs. ML)
  // `;
  const classifierPrompt = `
  ## Query Classification
  You are an AI assistant specializing in Machine Learning. Classify the following query as 'Machine Learning' or 'Non-Machine Learning'. If the term is commonly used in both fields (e.g., "neuron", "activation function"), prioritize the **Machine Learning** interpretation.
  
  ### Query: "${query}"
  
  Return a JSON response in the following format:
  \`\`\`json
  {
    "type": "Machine Learning" or "Non-Machine Learning",
    "topic": "Short topic description",
    "searchQuery": "Optimized Google search query",
    "needsImage": true or false
  }
  \`\`\`
  
  ### **Rules:**
  - Assume the user is asking about **Machine Learning** unless **explicitly stated otherwise**.
  - If the term is **ambiguous** (e.g., "neuron", "loss function"), classify it as **Machine Learning**.
  - If the query contains **biological or medical words** (e.g., "brain neuron", "nerve cell"), classify as **Non-Machine Learning**.
  
  ### **When to Include Images:**
  ✅ **Images are needed** for topics involving:
  - **Architecture Diagrams** (e.g., CNN, RNN, Decision Trees)
  - **Algorithm Workflows** (e.g., Backpropagation, Clustering)
  - **Mathematical Graphs** (e.g., Loss Functions, Bias-Variance Tradeoff)
  
  ❌ **Images are NOT needed** for:
  - **Advantages, Disadvantages, Applications**
  - **Ethical Considerations**
  - **Text-based Comparisons** (e.g., CNN vs. RNN, AI vs. ML)
  `;
  
  try {
    // 🔥 Send the classification request to Gemini AI
    const result = await model.generateContent(classifierPrompt);
    let responseText = result.response.text().trim();

    // 🔥 Fix: Remove code block markers before parsing JSON
    if (responseText.startsWith("```json")) {
      responseText = responseText.replace(/```json|```/g, "").trim();
    }

    const parsedResponse = JSON.parse(responseText);

    return {
      type: parsedResponse.type || 'Machine Learning',
      topic: parsedResponse.topic || 'General Machine Learning',
      searchQuery: parsedResponse.searchQuery || query + " in machine learning",
      needsImage: parsedResponse.needsImage !== undefined ? parsedResponse.needsImage : false
    };
  } catch (error) {
    console.error('Error classifying query:', error);
    return {
      type: 'Error',
      topic: 'General Machine Learning',
      searchQuery: query,
      needsImage: false,
      response: null
    };
  }
};

module.exports = classifyQuery;
