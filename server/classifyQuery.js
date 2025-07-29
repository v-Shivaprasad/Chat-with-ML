const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const GOOGLE_API_KEY = process.env.GOOGLE_AI_KEY;
console.log("API ",GOOGLE_API_KEY);
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
const geminiConfig = {
  temperature: 0.9,
  topP: 1,
  topK: 1,
  maxOutputTokens: 1024,
};

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash-preview-04-17",
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

const classifierPrompt = `
## Query Classification

You are an AI assistant specializing in Machine Learning. Classify the following query as 'Machine Learning' or 'Non-Machine Learning'. If the term is commonly used in both fields (e.g., "neuron", "activation function"), prioritize the **Machine Learning** interpretation.

Your job is to analyze the query, identify if it is related to Machine Learning, extract a concise topic title, and generate a **Google Image search phrase** that returns **technical diagrams** or **relevant visuals** (if applicable).

---

### Return a JSON response in the following format:
\`\`\`json
{
  "type": "Machine Learning" or "Non-Machine Learning",
  "topic": "Short topic description",
  "searchQuery": "A Google image search phrase that returns a diagram or architecture (e.g., 'cnn architecture diagram', 'rnn workflow diagram', 'lstm cell diagram')",
  "needsImage": true or false
}
\`\`\`

---

### Rules:
- Assume the user is asking about **Machine Learning** unless clearly stated otherwise.
- If the term is ambiguous (e.g., "neuron", "loss function"), classify it as **Machine Learning**.
- If the query contains **biological, medical, or neuroscience** words (e.g., "brain neuron", "nerve cell", "human body"), classify as **Non-Machine Learning**.

---

### ✅ When to Include Images (needsImage: true):
Use images when the topic involves:
- Architecture diagrams (e.g., CNN, RNN, LSTM, Decision Trees)
- Algorithm workflows (e.g., Backpropagation, K-Means, Gradient Descent)
- Mathematical plots or graphs (e.g., Loss Curves, Bias-Variance Tradeoff)

---

### ❌ Do NOT Include Images for:
- Applications, advantages, disadvantages, or ethical issues
- Text-based comparisons (e.g., CNN vs. RNN)
- Derivations or mathimatical equations
- Conceptual discussions (e.g., what is AI ethics?)

---

### Examples:

Query: "Explain CNN architecture"  
\`\`\`json
{
  "type": "Machine Learning",
  "topic": "Convolutional Neural Network (CNN)",
  "searchQuery": "cnn architecture diagram",
  "needsImage": true
}
\`\`\`

Query: "How does LSTM work?"  
\`\`\`json
{
  "type": "Machine Learning",
  "topic": "Long Short-Term Memory (LSTM) Networks",
  "searchQuery": "lstm cell diagram",
  "needsImage": true
}
\`\`\`

Query: "Loss function explanation"  
\`\`\`json
{
  "type": "Machine Learning",
  "topic": "Loss Function in ML",
  "searchQuery": "loss function graph machine learning",
  "needsImage": true
}
\`\`\`

Query: "Applications of AI in finance"  
\`\`\`json
{
  "type": "Machine Learning",
  "topic": "Applications of AI in Finance",
  "searchQuery": "ai applications in finance",
  "needsImage": false
}
\`\`\`

Query: "Nerve cell in brain"  
\`\`\`json
{
  "type": "Non-Machine Learning",
  "topic": "Biological Neurons",
  "searchQuery": "human brain nerve cell diagram",
  "needsImage": true
}
\`\`\`

---

### Now classify the following:

Query: "${query}"
`;

  
  try {
    // 🔥 Send the classification request to Gemini AI
    const result = await model.generateContent(classifierPrompt);
    console.log("hereeeeeee");
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
      needsImage: true,
      response: null
    };
  }
};

module.exports = classifyQuery;
