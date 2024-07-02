import React, { useState, useRef, useEffect } from "react";
import { getLLMResponse } from "../Hooks/Helper";
import { useCompCommunicator } from "../store/CompCommunicater";
import { VscHistory } from "react-icons/vsc";
const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const chatContainerRef = useRef(null);

  // Scroll to the bottom of the chat container whenever new messages are added
  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    console.log(messages)
  }, [messages]);

  const { open, setOpen, openDrawer, closeDrawer } = useCompCommunicator();

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
    <>

    <div className="flex flex-col h-screen justify-between bg-gray-100 pt-24 dark:bg-gradient-to-tr from-[#030715F0] via-[#030715ED] to-[#010A30]">
    <div className="absolute  top-1/2 transform  -translate-y-1/2 p-2" >
        <button onClick={openDrawer} >
          <VscHistory className=" fill-black bg-none dark:fill-slate-400" size={25}/>
        </button>
        </div><div
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
          className="w-full rounded-md mt-auto mb-2  outline-none border-gray-300"
              style={{ maxWidth: '44rem', minWidth: '10rem', minHeight: '1rem' }}
              
        />
        <button
          type="submit"
          className="ml-2 mb-2 px-4 py-2 bg-white border-2 text-black rounded-lg"
        >
          Send
        </button>
        
      </form>
    </div>
    </>
  );
};

export default Chat;
