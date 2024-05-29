import React, { useState } from "react";
import { IconButton } from "@material-tailwind/react/";
import { GiHamburgerMenu, GiFlyingTarget } from "react-icons/gi";
import MyComponent from "./MyComponent";
import { RxCross1 } from "react-icons/rx";
import DropMenu from "./Menu";
import { IoIosLogIn } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const Links = [
    { name: "About", link: "/" },
    { name: "SERVICES", link: "/" },
  ];
  const menuItems = [
    {
      option: "Signup",
      event: () => {
        navigate("/signup");
      },
    },
    {
      icon: <IoIosLogIn size={20} />,
      option: "Login",
      event: () => {
        navigate("/login");
      },
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div className="shadow-md w-full fixed top-0 left-0">
      <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-4 dark:bg-slate-700">
        <div
          className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
    text-black"
        >
          <MyComponent />
          <span className="text-3xl text-indigo-600 mr-1 pt-2">
            <GiFlyingTarget color="orange" />
          </span>
          <div>Chat with Ml</div>
          <div className="absolute right-4">
            {/* <ProfileMenu /> */}
            <DropMenu MenuItems={menuItems} />
          </div>
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-16 top-6 cursor-pointer md:hidden"
        >
          {/* Using the GiHamburgerMenu icon */}
          {open ? (
            <RxCross1 className="dark-btn" />
          ) : (
            <GiHamburgerMenu className="dark-btn" />
          )}
        </div>

        <ul
          className={` dark:bg-slate-700 md:flex md:items-center md:pb-0 pb-4 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-10 " : "top-[-490px]"
          }`}
        >
          {Links.map((link) => (
            <li key={link.name} className="md:ml-6 text-xl md:my-0 my-7 mr-8">
              <a
                href={link.link}
                className="text-gray-800 hover:text-gray-400 duration-500 dark:text-white dark:hover:text-blue-500"
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
