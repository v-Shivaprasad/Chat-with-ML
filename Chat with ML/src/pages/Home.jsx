import React from "react";
import Sidebar from "../components/Sidebar";
import MyComponent from "../components/MyComponent";
import Navbar from "../components/Navbar";
import Chat from "../components/Chat";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <Chat />
    </div>
  );
};

export default Home;
