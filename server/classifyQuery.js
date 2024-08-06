const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
const geminiConfig = {
  temperature: 0.9,
  topP: 1,
  topK: 1,
  maxOutputTokens: 4096,
};

const model = genAI.getGenerativeModel({
  model: "gemini-pro",
  geminiConfig,
});

const casualResponses = {
  "hi": "Hello! How can I assist you with machine learning today?",
  "hello": "Hi there! What machine learning topic would you like to discuss?",
  "thanks": "You're welcome! Feel free to ask any machine learning-related questions.",
  "thank you": "You're welcome! Let me know if you have any more questions about machine learning.",
  "ok":"Let me know if you have any more questions about machine learning."
};

const classifyQuery = async (query) => {
  console.log(query);

  // Check for casual messages
  const lowerCaseQuery = query.toLowerCase();
  if (casualResponses[lowerCaseQuery]) {
    return { type: 'Casual', response: casualResponses[lowerCaseQuery] };
  }

  const classifierPrompt = (
    "## Query Classification\n" +
    "Please classify the following query as 'Machine Learning' or 'Non-Machine Learning':\n" +
    "Query: '{}'\n" +
    "Classification:"
  );

  // Compose prompt with the given query
  const prompt = classifierPrompt.replace('{}', query);
  try {
    // Use Google Gen AI to generate a response based on the prompt
    const result = await model.generateContent(prompt);
    const response = result.response;

    return { type: response.text().trim(), response: null };
  } catch (error) {
    console.error('Error classifying query:', error);
    return { type: 'Error', response: null }; // Handle error appropriately
  }
};

module.exports = classifyQuery;
