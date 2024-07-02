import React, { useState, useEffect } from 'react';
import { GiHamburgerMenu, GiFlyingTarget } from 'react-icons/gi';
import MyComponent from './MyComponent';
import { RxCross1 } from 'react-icons/rx';
import DropMenu from './Menu';
import { IoIosLogIn } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { useDarkTheme } from '../store/ThemeManage';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { dark } = useDarkTheme();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const checkTokenValidity = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          const response = await fetch('http://localhost:3000/api/auth/checkToken', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            // Token is not valid or expired
            localStorage.removeItem('token');
            setIsLoggedIn(false); // Update state to reflect logout
          } else {
            // Token is valid
            setIsLoggedIn(true);
          }
        } catch (error) {
          console.error('Error checking token:', error);
        }
      }
    };

    checkTokenValidity();
  }, []);

  const handleSignout = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:3000/api/users/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/');
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const menuItems = isLoggedIn
    ? [
        {
          option: 'Signout',
          event: handleSignout,
        },
      ]
    : [
        {
          option: 'Signup',
          event: () => {
            navigate('/signup');
          },
        },
        {
          icon: <IoIosLogIn size={20} />,
          option: 'Login',
          event: () => {
            navigate('/login');
          },
        },
      ];

  const Links = [
    { name: 'Home', link: '/' },
    { name: 'About', link: '/about' },
    { name: 'Services', link: '/services' },
    { name: 'Contact', link: '/contact' },
  ];

  return (
    <div className="shadow-md w-full fixed top-0 left-0">
      <div className="md:flex items-center justify-between bg-white dark:bg-primary-97 py-4 md:px-10 px-4">
        <div className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-black dark:text-white">
          <MyComponent />
          <span className="text-3xl text-indigo-600 mr-1 pt-2">
            <GiFlyingTarget color="orange" />
          </span>
          <div>Chat with Ml</div>
          <div className="absolute right-4">
            <DropMenu MenuItems={menuItems} />
          </div>
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-16 top-6 cursor-pointer md:hidden"
        >
          {open ? (
            <RxCross1
              className="dark-btn"
              color={`${dark ? "white" : "black"}`}
            />
          ) : (
            <GiHamburgerMenu className="dark-btn" />
          )}
        </div>

        <ul
          className={`dark:bg-primary-97 md:flex md:items-center md:pb-0 pb-4 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 ${
            open ? "top-10 " : "top-[-490px]"
          }`}
        >
          {Links.map((link) => (
            <li key={link.name} className="md:ml-6 text-xl md:my-0 my-7 mr-8">
              <a
                href={link.link}
                className="text-gray-800 hover:text-gray-400  dark:text-white dark:hover:text-blue-500 "
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
