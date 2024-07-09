import React from 'react';
import Navbar from '../components/Navbar'; // Adjust the path accordingly
import '../components/Navbar.css';
import './Services.css';
import { FaRegLightbulb } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { FaCode } from "react-icons/fa";

// Import Font Awesome
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCogs, faCode, faLightbulb } from '@fortawesome/free-solid-svg-icons';

// Service component
const Service = () => {
  return (
    <div>
      <Navbar /> {/* Ensure the Navbar is rendered here */}
      <section>
        <div className="row gradient__text">
          <h2 className="section-heading">Our Services</h2>
        </div>
        <div className="row">
          <div className="column">
            <div className="card">
              <div className="iconclass">
              <div className="icon-wrapper">
              <IoSettings />
              </div>
              </div>
              <div className="cardText">
              <h3>MACHINE LEARNING CONSULTING</h3>
              <p>
                Get expert guidance on implementing machine learning solutions tailored to your business needs.
              </p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="card">
            <div className="iconclass">
              <div className="icon-wrapper">
              <FaCode />

             </div>
              </div>
              <div className="cardText">
              <h3>PROGRAMMING ASSISTANCE</h3>
              <p>  
                1. Machine Learning for Absolute Beginners: A Plain English Introduction (Third Edition).<br></br>
                2. The Hundred-Page Machine Learning Book.
                <br></br>
              </p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="card">
            <div className="iconclass">
              <div className="icon-wrapper">
              <FaRegLightbulb />

                            </div>
              </div>
              <div className="cardText">
              <h3>SIMPLE ANSWERS</h3>
              <p>
                Being Concise: It focuses on the main points, keeping responses short and to the point.<br></br>
                Simplifying Concepts: It breaks down complex ideas into their basic elements to make them easy to understand.<br></br>
                Using Examples: It may provide relatable examples to illustrate concepts when needed.
                <br></br>
              </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Service;
