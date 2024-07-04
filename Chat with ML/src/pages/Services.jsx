import React from 'react';
import Navbar from '../components/Navbar'; // Adjust the path accordingly
import '../components/Navbar.css';
import './Services.css';

// Import Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHammer, faBrush, faWrench } from '@fortawesome/free-solid-svg-icons';

// Service component
const Service = () => {
  return (
    <div>
      <Navbar /> {/* Ensure the Navbar is rendered here */}
      <section>
        <div className="row">
          <h2 className="section-heading">Our Services</h2>
        </div>
        <div className="row">
          <div className="column">
            <div className="card">
              <div className="icon-wrapper">
                <FontAwesomeIcon icon={faHammer} />
              </div>
              <h3>MACHINE LEARNING CONSULTING</h3>
              <p>
                Get expert guidance on implementing machine learning solutions tailored to your business needs.
              </p>
            </div>
          </div>
          <div className="column">
            <div className="card">
              <div className="icon-wrapper">
                <FontAwesomeIcon icon={faBrush} />
              </div>
              <h3>SOLVING QUERIES</h3>
              <p>
              1.Machine Learning for Absolute Beginners: A Plain English Introduction (Third Edition).<br></br>
              2.The Hundred-Page Machine Learning Book.<br></br>
              </p>
            </div>
          </div>
          <div className="column">
            <div className="card">
              <div className="icon-wrapper">
                <FontAwesomeIcon icon={faWrench} />
              </div>
              <h3>SIMPLE ANSWERS</h3>
              <p>
Being Concise: It focuses on the main points, keeping responses short and to the point.<br></br>

Simplifying Concepts: It breaks down complex ideas into their basic elements to make them easy to understand.<br></br>

Using Examples: It may provide relatable examples to illustrate concepts when needed.<br></br>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Service;

