import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyComponent from "./components/MyComponent";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import "./App.css";
import LoginForm from "./components/LoginForm";
import SignUp from "./components/SignUp";
import TempDah from "./components/TempDah";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<TempDah />} />
        </Routes>
      </Router>{" "}
    </>
  );
}

export default App;
