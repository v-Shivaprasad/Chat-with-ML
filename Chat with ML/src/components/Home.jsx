import React from "react";
import Sidebar from "./Sidebar";
import MyComponent from "./MyComponent";
import Navbar from "./Navbar";
import Chat from "./Chat";

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
