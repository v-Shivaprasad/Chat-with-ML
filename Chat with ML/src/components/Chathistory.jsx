
import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";

const Chathistory = ({ onSelectChat }) => {
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:3000/api/users/getChatHistory",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ token }),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setChatHistory(data.chatHistory);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChatHistory();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <List className="dark:text-white border border-gray-300 rounded-md p-4">
        {chatHistory.length === 0 ? (
          <div>No chat history available.</div>
        ) : (
          chatHistory.map((chat, index) => (
            <ListItem
              key={chat.chatId}
              className="border-b border-gray-300 py-2"
              onClick={() => {
                onSelectChat(chat.chatId);
                console.log(chat.chatId);
              }}
            >
              <ListItemPrefix className="dark:text-white">
                {index + 1}.
              </ListItemPrefix>
              {chat.title}
              <ListItemSuffix>
                <Chip
                  value={chat.messages?.length?.toString() || "0"}
                  size="sm"
                  color="green"
                  className="rounded-full dark:text-white"
                />
              </ListItemSuffix>
            </ListItem>
          ))
        )}
      </List>
    </div>
  );
};

export default Chathistory;
