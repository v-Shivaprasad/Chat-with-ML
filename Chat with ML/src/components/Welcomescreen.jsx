// WelcomeScreen.js
import React from "react";
import delogoo from "../assets/delogoo.png";
import { FaRegLightbulb } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { FaCode } from "react-icons/fa";

const WelcomeScreen = () => {
  return (
    <div className="welcome-screen flex flex-col items-center justify-center h-full">
      <img src={delogoo} alt="Logo" className="mb-8 rotating-logo" style={{maxHeight:"5rem"}}/> {/* Update the path to your logo */}
      <div className="grid grid-cols-3 gap-8">
        <div className="box p-7 bg-gray-200 rounded-lg shadow-md">
          <div className="iwrap" style={{marginBottom:"1rem"}}>
            <IoSettings  />
          </div>
        
          <p>MACHINE LEARNING <br /> CONSULTING</p>
        </div>
        <div className="box p-7 bg-gray-200 rounded-lg shadow-md">
        <div className="iwrap" style={{marginBottom:"1rem"}}>

        <FaCode />
        </div>
          <p>PROGRAMMING <br /> ASSISTANCE</p>
        </div>
        <div className="box p-7 bg-gray-200 rounded-lg shadow-md">
        <div className="iwrap" style={{marginBottom:"1rem"}}>

        <FaRegLightbulb />
        </div>
          <p>SIMPLE ANSWERS</p>
        </div>
        
      </div>
    </div>
  );
};

export default WelcomeScreen;
