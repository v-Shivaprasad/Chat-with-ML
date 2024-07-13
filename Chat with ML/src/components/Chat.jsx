import React, { useState, useRef, useEffect } from "react";
import { chatSaver,fetchChatHistory } from "../Hooks/Helper"; // Assuming chatSaver is a function to save the chat to the backend
import { useCompCommunicator } from "../store/CompCommunicater";
import { VscHistory } from "react-icons/vsc";

const Chat = () => {
  const [messagePairs, setMessagePairs] = useState([]);
  const [displayMessages, setDisplayMessages] = useState([]); // Array for displaying messages
  const [inputValue, setInputValue] = useState("");
  const chatContainerRef = useRef(null);
  const email = "methreudaykumar@gmail.com";
  const chatTitle = "Chat Title";

  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [displayMessages]);
  const { openDrawer } = useCompCommunicator();

  useEffect(() => {
    if (messagePairs.length > 0) {
      saveChat();
    }
  }, [messagePairs]);

  useEffect(() => {
    fetchChat();
  }, []);

  const fetchChat = async () => {
    const sessionId = localStorage.getItem('sessionId'); // Retrieve sessionId from localStorage
    if (!sessionId) return;

    const chatData = await fetchChatHistory(sessionId); // Fetch chat history from the backend
    if (chatData && chatData.chat && chatData.chat.messages) {
      setMessagePairs(chatData.chat.messages);
      const messagesForDisplay = chatData.chat.messages.reduce((acc, pair) => {
        acc.push({ fromUser: true, text: pair.userMessage.text });
        acc.push({ fromUser: false, text: pair.llmMessage.text });
        return acc;
      }, []);
      setDisplayMessages(messagesForDisplay);
    }
  }; 

  const saveChat = async () => {
    const sessionId = localStorage.getItem('sessionId'); // Retrieve sessionId from localStorage
    const userEmail = localStorage.getItem('email');

    const chatData = {
      title: chatTitle,
      email: email,
      messages: messagePairs,
      sessionId: sessionId, // Include sessionId in chatData
    };
    await chatSaver(chatData);
    setMessagePairs([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    const newUserMessage = {
      text: inputValue.trim(),
    };

    // Mocking LLM response
    const newLlmMessage = {
      text: "hello",
    };

    const newMessagePair = {
      userMessage: newUserMessage,
      llmMessage: newLlmMessage,
    };

    setMessagePairs((prevPairs) => [...prevPairs, newMessagePair]);

    setDisplayMessages((prevMessages) => [
      ...prevMessages,
      { fromUser: true, text: newUserMessage.text },
      { fromUser: false, text: newLlmMessage.text },
    ]);

    setInputValue("");
  };

  return (
    <div className="flex flex-col h-screen justify-between bg-gray-300 pt-24 dark:bg-gradient-to-tr from-[#030715F0] via-[#030715ED] to-[#010A30]">
      <div className="absolute top-1/2 transform -translate-y-1/2 p-2">
        <button onClick={openDrawer}>
          <VscHistory className="fill-black bg-none dark:fill-slate-200" size={25} />
        </button>
      </div>
      <div
        className="chat-container flex-1 overflow-y-auto p-4 ml-auto mr-auto w-3/4"
        ref={chatContainerRef}
      >
        {displayMessages.map((message, index) => (
          <div
            key={index}
            className={`message p-2 rounded-lg mb-2 max-w-xs ${
              message.fromUser
                ? "ml-auto bg-gray-600 text-white"
                : "self-start bg-gray-700 text-white"
            }`}
          >
            <p>{message.text}</p>
          </div>
        ))}
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
        />
        <button
          type="submit"
          className="ml-2 mb-2 px-4 py-2 bg-white border-2 text-black rounded-lg"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
