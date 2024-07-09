import React, { useState } from "react";
import llamaImage from '../assets/llama.png';
import machine4Image from '../assets/machine2.png';
import machine3Image from '../assets/machine5.png';

import Navbar from '../components/Navbar';
import './About.css';

const About = () => {
  const [showMore, setShowMore] = useState(false);

  const handleToggle = () => {
    setShowMore(!showMore);
  };

  return (
    <>
      <Navbar />
      <div className="about-container">
        <h1 className="about-title ">About us ..</h1>
        <div className="llama">
        <img src={llamaImage} alt="LLaMA3" className="about-image-inline" />
        </div>
        <div className="about-content">
          <div className="about-text ">
          
            <h2 className="about-subtitle gradient__text">What is Chat with Machine Learning?</h2>
            <div>
            <p className="about-description">
              Chat with Machine Learning is designed to offer users a unique interaction experience with authorial content. By training our system on a carefully chosen collection of 10 to 12 PDFs, we ensure that the responses are not only precise but also deeply rooted in the material's context. This focused approach allows us to maintain high accuracy and relevance in the answers provided.
            </p></div>
            <div className="about-im">
            <div className="innerabpoutim">
            <img src={machine4Image} alt="Machine Learning" className="about-image-inline" />
            </div>
            </div>
            <h2 className="about-subtitle gradient__text">How Does It Work?</h2>
            <p className="about-description">
              Using the state-of-the-art <strong>LLAMA3</strong> language model, our system processes and understands the intricacies of the selected texts. The training involves a rigorous process where the model learns to interpret and generate responses that align closely with the authors' original intent and content. This means you get answers that are faithful to the source material, minimizing the risk of irrelevant or misleading information.
            </p>
           
            <h2 className="about-subtitle gradient__text">Our Mission</h2>
            <p className="about-description">
              Our mission is to revolutionize the way readers engage with written content. Whether you're a student, researcher, or an avid reader, Chat with Machine Learning aims to enhance your understanding and exploration of complex texts. We believe in the power of knowledge and are committed to making it more accessible, interactive, and engaging for everyone.
            </p>
            <div className="about-im">
            <div className="innerabpoutim">
            <img src={machine3Image} alt="Machine Learning" className="about-image-inline" />
            </div>
            </div>
            <h2 className="about-subtitle gradient__text">Key Features</h2>
            <p className="about-description">
              <strong>Accuracy:</strong> Our responses are generated using a highly trained model that ensures precision and relevance.
              <br />
              <strong>Contextual Understanding:</strong> By focusing on a specific set of documents, we provide answers that stay true to the material's context.
              <br />
              <strong>Ease of Use:</strong> Simply ask your questions and receive detailed answers that help you delve deeper into the content.
              <br />
              <strong>Educational Tool:</strong> Ideal for students and researchers who need reliable insights without the distraction of unrelated information.
            </p>
          </div>
         
        </div>
        {showMore && (
          <div className="about-more">
            {<><h2 className="about-subtitle gradient__text">Why Choose Chat with Machine Learning?</h2><p className="about-description">
              Chat with Machine Learning is not just another AI-based question-and-answer platform. It is a specialized tool designed to respect and preserve the integrity of the original texts. Our selective training approach ensures that you get high-quality, contextually appropriate answers that enhance your reading and comprehension experience.
            </p><h2 className="about-subtitle gradient__text">Join Us on Our Journey</h2><p className="about-description">
                Thank you for choosing Chat with Machine Learningr. We are excited to have you on board as we explore new frontiers in digital reading and comprehension. Together, we can unlock the full potential of textual knowledge and make learning more interactive and enjoyable.
              </p><p className="about-description">
                Explore the depth of knowledge within our trained documents and experience a new way of engaging with textual information. Whether for academic purposes or personal curiosity, Chat with Author is here to provide you with the most accurate and insightful answers.
              </p></>}
          </div>
        )}
        <button className="about-toggle-button gradient__text" onClick={handleToggle}>
          {showMore ? "Read Less" : "Read More"}
        </button>
      </div>
    </>
  );
};

export default About;



