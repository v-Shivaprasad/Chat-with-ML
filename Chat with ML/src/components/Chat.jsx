import React, { useState, useRef, useEffect } from "react";
import { chatSaver } from "../Hooks/Helper";
import Sidebar from "./Sidebar";
import { getLLMResponse } from "../Hooks/Helper";
import WelcomeScreen from "./Welcomescreen";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const Spinner = () => (
  <Box sx={{ width: 300, alignSelf: "start" }}>
    <Skeleton
      className="dark:bg-d bg-slate-100"
      animation="wave"
      height={60}
      width="100%"
    />
  </Box>
);

const Chat = () => {
  const [messagePairs, setMessagePairs] = useState([]);
  const [displayMessages, setDisplayMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [isFetchingResponse, setIsFetchingResponse] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const chatContainerRef = useRef(null);
  const chatTitle = "Chat Title";
  const token = localStorage.getItem("token");

  const location = useLocation();

  useEffect(() => {
    if (location.state?.loginSuccess) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  }, [location.state]);

  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [displayMessages]);

  useEffect(() => {
    if (messagePairs.length > 0 && token) {
      saveChat();
    }
  }, [messagePairs]);

  const fetchChatDetails = async (chatId) => {
    const response = await fetch(
      `http://localhost:3000/api/users/getChatDetails`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ token, chatId }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data.chat;
    } else {
      console.error("Failed to fetch chat details");
      return null;
    }
  };

  const handleSelectChat = async (chatId) => {
    setSelectedChatId(chatId);
    const chatData = await fetchChatDetails(chatId);

    if (chatData && chatData.messages) {
      const messagesForDisplay = chatData.messages.reduce((acc, pair) => {
        acc.push({ fromUser: true, text: pair.userMessage.text });
        acc.push({ fromUser: false, text: pair.llmMessage.text });
        return acc;
      }, []);
      setDisplayMessages(messagesForDisplay);
    }
  };

  const saveChat = async () => {
    const chatData = {
      token,
      title: chatTitle,
      messages: messagePairs,
      chatId: selectedChatId, // Use selectedChatId instead of sessionId
    };
    const response = await chatSaver(chatData);
    if (response.ok) {
      setMessagePairs([]);
      console.log(response);
      setSelectedChatId(response.sessionId);
    } else {
      console.error("Failed to save chat");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    setIsFetchingResponse(true);

    const newUserMessage = {
      text: inputValue.trim(),
    };

    // Display the user's message immediately
    setDisplayMessages((prevMessages) => [
      ...prevMessages,
      { fromUser: true, text: newUserMessage.text },
    ]);

    setInputValue("");

    const llmResponse = await getLLMResponse(newUserMessage.text);
    const newLlmMessage = {
      text: llmResponse,
    };

    const newMessagePair = {
      userMessage: newUserMessage,
      llmMessage: newLlmMessage,
    };

    setMessagePairs((prevPairs) => [...prevPairs, newMessagePair]);

    setDisplayMessages((prevMessages) => [
      ...prevMessages,
      { fromUser: false, text: newLlmMessage.text },
    ]);

    setIsFetchingResponse(false);
  };

  const renderMessage = (message, index) => {
    return (
      <div
        key={index}
        className={`message p-2 rounded-lg mb-2 ${
          message.fromUser
            ? "ml-auto bg-gray-600 text-white max-w-xs"
            : "self-start bg-gray-700 text-white w-2/3"
        }`}
      >
        <p
          className="whitespace-pre-wrap"
          dangerouslySetInnerHTML={{
            __html: message.text.replace(/\n/g, "<br/>"),
          }}
        ></p>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen justify-between bg-gray-300 pt-24 dark:bg-gradient-to-tr from-[#030715F0] via-[#030715ED] to-[#010A30]">
      <Sidebar onSelectChat={handleSelectChat} />
      <div
        className="chat-container flex-1 overflow-y-auto p-4 ml-auto mr-auto w-3/4"
        ref={chatContainerRef}
      >
        {displayMessages.length === 0 ? (
          <WelcomeScreen />
        ) : (
          displayMessages.map((message, index) => renderMessage(message, index))
        )}
        {isFetchingResponse && <Spinner />} {/* Conditionally render spinner */}
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center p-4"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
          className="w-3/5 rounded-md mt-auto mb-2 outline-none border-gray-300"
          disabled={isFetchingResponse}
        />
        <button
          type="submit"
          className="ml-2 mb-2 px-4 py-2 bg-white border-2 text-black rounded-lg"
          disabled={isFetchingResponse}
        >
          Send
        </button>
      </form>
      {showToast && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
          <p className="text-center">Login Successful!</p>
        </div>
      )}
    </div>
  );
};

export default Chat;
