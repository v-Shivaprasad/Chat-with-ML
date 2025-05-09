import React, { useState, useRef, useEffect } from "react";
import { chatSaver, getLLMResponse } from "../Hooks/Helper";
import Sidebar from "./Sidebar";
import WelcomeScreen from "./Welcomescreen";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const Spinner = () => (
    <Box sx={{ width: 300, alignSelf: "start" }}>
        <Skeleton className="dark:bg-d bg-slate-100" animation="wave" height={60} width="100%" />
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
        try {
            const response = await fetch(`http://localhost:3000/api/users/getChatDetails`, {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({ token, chatId }),
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch chat details: ${response.status}`);
            }

            const data = await response.json();
            return data.chat;
        } catch (error) {
            console.error("Error fetching chat details:", error);
            return null;
        }
    };

    const handleSelectChat = async (chatId) => {
        setSelectedChatId(chatId);
        const chatData = await fetchChatDetails(chatId);

        if (chatData && chatData.messages) {
            const messagesForDisplay = chatData.messages.reduce((acc, pair) => {
                acc.push({ fromUser: true, text: pair.userMessage.text });
                acc.push({
                    fromUser: false,
                    text: pair.llmMessage.text, // Preserve {{image}} in stored text
                    image: pair.llmMessage.image || null, // Retrieve image URL
                });
                return acc;
            }, []);

            setDisplayMessages(messagesForDisplay);
        }
    };

    const saveChat = async () => {
        try {
            const chatData = {
                token,
                title: chatTitle,
                messages: messagePairs.map(pair => ({
                    userMessage: { text: pair.userMessage.text },
                    llmMessage: { 
                        text: pair.llmMessage.text, // Preserve {{image}}
                        image: pair.llmMessage.image || null  // Store only the URL
                    },
                })),
                chatId: selectedChatId,
            };

            const response = await chatSaver(chatData);

            if (!response.ok) {
                throw new Error("Failed to save chat");
            }

            setMessagePairs([]);
            console.log(response);
            setSelectedChatId(response.sessionId);
        } catch (error) {
            console.error("Error saving chat:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (inputValue.trim() === "") return;

        setIsFetchingResponse(true);

        const newUserMessage = { text: inputValue.trim() };

        setDisplayMessages((prevMessages) => [...prevMessages, { fromUser: true, text: newUserMessage.text }]);
        setInputValue("");

        const llmResponse = await getLLMResponse(newUserMessage.text);
        let newLlmMessage;
        if (typeof llmResponse === 'object' && llmResponse.image) {
            newLlmMessage = {
                text: llmResponse.text, // Preserve {{image}}
                image: llmResponse.image,
            };
        } else {
            newLlmMessage = { text: llmResponse };
        }

        const newMessagePair = { userMessage: newUserMessage, llmMessage: newLlmMessage };
        setMessagePairs((prevPairs) => [...prevPairs, newMessagePair]);
        setDisplayMessages((prevMessages) => [
            ...prevMessages,
            { fromUser: false, text: newLlmMessage.text, image: newLlmMessage.image },
        ]);
        setIsFetchingResponse(false);
    };

    const renderMessage = (message, index) => {
        if (!message.text) return null; // Ensure message has text
    
        // Debugging logs
        console.log(`Rendering message ${index}:`, message);
    
        // Split text at "{{image}}" to handle dynamic image placement

        const textParts = message.text.split("{{image}}");
    
        return (
            <div key={index} className={`message p-2 rounded-lg mb-2 ${message.fromUser ? "ml-auto bg-gray-600 text-white max-w-xs" : "self-start bg-gray-700 text-white w-2/3"}`}>
                <p className="whitespace-pre-wrap">
                    {textParts.map((part, i) => (
                        <React.Fragment key={i}>
                            {part}
                            {/* Debugging log */}
                            {i !== textParts.length - 1 && message.image && console.log("Image found for message:", message.image)}
                            {/* Only insert an image tag where {{image}} was found */}
                            {i !== textParts.length - 1 && message.image && (
                                <div>
                                    <img src={message.image} alt="Response Image" className="mt-2 max-w-full inline-block" />
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </p>
            </div>
        );
    };
    
    
    

    return (
        <div className="flex flex-col h-screen justify-between bg-gray-300 pt-24 dark:bg-gradient-to-tr from-[#030715F0] via-[#030715ED] to-[#010A30]">
            <Sidebar onSelectChat={handleSelectChat} />
            <div className="chat-container flex-1 overflow-y-auto p-4 ml-auto mr-auto w-3/4" ref={chatContainerRef}>
                {displayMessages.length === 0 ? <WelcomeScreen /> : displayMessages.map((message, index) => renderMessage(message, index))}
                {isFetchingResponse && <Spinner />}
            </div>
            <form onSubmit={handleSubmit} className="flex justify-center items-center p-4">
                <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Type your message..." className="w-3/5 rounded-md mt-auto mb-2 outline-none border-gray-300" disabled={isFetchingResponse} />
                <button type="submit" className="ml-2 mb-2 px-4 py-2 bg-white border-2 text-black rounded-lg" disabled={isFetchingResponse}>Send</button>
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
