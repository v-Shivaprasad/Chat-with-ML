import React, { useState, useRef, useEffect } from "react";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const chatContainerRef = useRef(null);

  // Scroll to the bottom of the chat container whenever new messages are added
  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);

  const getLLMResponse = async (text) => {
    try {
      const response = await fetch(
        "https://5726-104-198-108-43.ngrok-free.app/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }),
        }
      );
      const data = await response.json();
      console.log(data);
      return data.prediction;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    const newMessage = {
      id: messages.length,
      text: inputValue.trim(),
      timestamp: new Date().toISOString(),
      fromUser: true,
    };

    setMessages([...messages, newMessage]);
    setInputValue("");

    // Get the LLM response
    const llmText = await getLLMResponse(inputValue.trim());
    const llmResponse = {
      id: messages.length + 1,
      text: llmText,
      timestamp: new Date().toISOString(),
      fromUser: false,
    };

    setMessages((prevMessages) => [...prevMessages, llmResponse]);
  };

  return (
    <div className="flex flex-col h-screen justify-between bg-gray-100 pt-24 dark:bg-gray-800">
      <div
        className="chat-container flex-1 overflow-y-auto p-4 ml-auto mr-auto w-3/4"
        ref={chatContainerRef}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message p-2 rounded-lg mb-2 max-w-xs ${
              message.fromUser
                ? "ml-auto bg-blue-500 text-white"
                : "self-start bg-gray-300 text-black"
            }`}
          >
            <p>{message.text}</p>
            <span className="text-xs">{message.timestamp}</span>
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
          className="border border-gray-300 rounded-lg p-2 w-3/4"
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
