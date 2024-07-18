import React, { useEffect, useState } from "react";
import {
  Drawer,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Card,
} from "@material-tailwind/react";
import { VscHistory } from "react-icons/vsc";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import { useDarkTheme } from "../store/ThemeManage";

const Sidebar = ({ onSelectChat }) => {
  const { dark } = useDarkTheme();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        if(!token){
          return;
        }
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

  const handleChatClick = (chatId) => {
    onSelectChat(chatId);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <IconButton variant="text" size="lg" onClick={openDrawer} className="absolute top-1/2 transform -translate-y-1/2 p-2">
      <VscHistory className="fill-black bg-none dark:fill-slate-200" size={25} />
      </IconButton>
      <Drawer
        open={isDrawerOpen}
        onClose={closeDrawer}
        className="p-4 dark:bg-primary-97"
      >
        <Card
          color="transparent"
          shadow={false}
          className="h-[calc(100vh-2rem)] w-full p-4"
        >
          <div className="mb-6 flex items-center justify-between">
            <Typography variant="h5" className="dark:text-white">
              Chat History
            </Typography>
            <IconButton
              variant="text"
              color={dark ? "white" : "black"}
              onClick={closeDrawer}
            >
              <RxCross1 className="h-8 w-8" />
            </IconButton>
          </div>
          <List>
            {chatHistory.length === 0 ? (
              <div>No chat history available.</div>
            ) : (
              chatHistory.map((chat, index) => (
                <ListItem
                  key={chat.chatId}
                  className="border-b border-gray-300 py-2 dark:text-white"
                  onClick={() => handleChatClick(chat.chatId)}
                >
                  <ListItemPrefix className="dark:text-white">
                    {index + 1}.
                  </ListItemPrefix>
                  {chat.title}
                  <ListItemSuffix>
                    <Chip
                      value={chat.messages?.length?.toString() || "0"}
                      size="sm"
                      variant="ghost"
                      color="blue-gray"
                      className="rounded-full dark:text-white"
                    />
                  </ListItemSuffix>
                </ListItem>
              ))
            )}
          </List>
        </Card>
      </Drawer>
    </>
  );
};

export default Sidebar;
