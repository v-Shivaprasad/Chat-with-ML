import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import LoginForm from "./components/LoginForm";
import SignUp from "./components/SignUp";
import TempDah from "./components/TempDah";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/Contact" element={<Contact />} />
        </Routes>
      </Router>{" "}
    </>
  );
}

export default App;
