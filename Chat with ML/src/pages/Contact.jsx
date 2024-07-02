import React, { useState } from 'react';
import { Instagram, Facebook, Email, Phone } from '@mui/icons-material';
import Navbar from "../components/Navbar";
import contactpic from "../assets/0001.png";
const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [prediction, setPrediction] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Add logic here to handle form submission and prediction
    // For example, load model, predict, etc.
  };

  return (
    <div>
    <Navbar />

      
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#383838',
      color: 'aliceblue',
      fontFamily: 'Arial, sans-serif',
      minHeight: '100vh',
      scrollBehavior: 'none'
    }}>
      <div style={{
        width: '30%',
        height: 'auto'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: '2rem',
          animation: 'slideInLeft 1s forwards'
        }}>
          <h1 style={{
            fontSize: '5rem'
          }}>Contact us</h1>
          <h2 style={{
            
          }}>Feel free to contact us. We assure you fast response.</h2>
          <img src={contactpic} alt="contactpic" srcset="" />
        </div>
        
      </div>
      <div style={{
        width: '40rem'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh'
        }}>
          <div style={{
            padding: '2rem',
            width: '25rem'
          }}>
            <h1 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              marginBottom: '1rem'
            }}>Contact Form</h1>
            <form id="contactForm" onSubmit={handleFormSubmit}>
              <div style={{
                marginBottom: '1rem'
              }}>
                <label htmlFor="name" style={{
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#cbcfd6'
                }}>Name:</label>
                <input
                  type="text"
                  id="name"
                  className="mt-1"
                  placeholder="Enter your name"
                  style={{
                    marginTop: '0.25rem',
                    display: 'block',
                    width: '100%',
                    maxWidth: '500px',
                    padding: '0.75rem',
                    backgroundColor: '#505050',
                    color: 'aliceblue',
                    border: '1px solid #cbcfd6',
                    borderRadius: '0.375rem'
                  }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div style={{
                marginBottom: '1rem'
              }}>
                <label htmlFor="email" style={{
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#cbcfd6'
                }}>Email:</label>
                <input
                  type="email"
                  id="email"
                  className="mt-1"
                  placeholder="Enter your email"
                  style={{
                    marginTop: '0.25rem',
                    display: 'block',
                    width: '100%',
                    maxWidth: '500px',
                    padding: '0.75rem',
                    backgroundColor: '#505050',
                    color: 'aliceblue',
                    border: '1px solid #cbcfd6',
                    borderRadius: '0.375rem'
                  }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div style={{
                marginBottom: '1rem'
              }}>
                <label htmlFor="message" style={{
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#cbcfd6'
                }}>Message:</label>
                <textarea
                  id="message"
                  className="mt-1"
                  placeholder="Enter your message"
                  style={{
                    marginTop: '0.25rem',
                    display: 'block',
                    width: '100%',
                    maxWidth: '500px',
                    padding: '0.75rem',
                    backgroundColor: '#505050',
                    color: 'aliceblue',
                    border: '1px solid #cbcfd6',
                    borderRadius: '0.375rem'
                  }}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>
              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  backgroundColor: '#F5F5F5',
                  color: 'black',
                  fontWeight: '600',
                  borderRadius: '0.375rem',
                  transition: 'background-color 0.3s ease',
                  border: 'none',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#888888'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#F5F5F5'}
              >
                Submit
              </button>
            </form>
            <p id="prediction" style={{
              marginTop: '1rem'
            }}></p>
          </div>
        </div>
      </div>
      <div style={{
        padding: '2rem',
        width: '21rem'
      }}>
        <h1 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginBottom: '1rem'
        }}>Contact Information</h1>
        <div style={{
          fontSize: '1rem',
          marginBottom: '0.5rem',
          color: '#e9ecef'
        }}>
          <p>
          <Instagram className="mr-2" />
          <a href="https://www.instagram.com/yourinstagram" target="_blank" rel="noopener noreferrer" style={{ color: '#dce6dd', textDecoration: 'none' }}>Instagram: @yourinstagram</a>
          </p>
          <p>
          <Facebook className="mr-2" />
          <a href="https://www.facebook.com/yourfacebook" target="_blank" rel="noopener noreferrer" style={{ color: '#dce6dd', textDecoration: 'none' }}>Facebook: facebook.com/</a>
          </p>
          <p>
          <Email className="mr-2" />
          <a href="mailto:contact@yourdomain.com" style={{ color: '#dce6dd', textDecoration: 'none' }}>Email: contact@yourdomain.com</a>
          </p>
          <p>
          <Phone className="mr-2" />
<a href="">:123654789</a>
          </p>
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default ContactPage;
