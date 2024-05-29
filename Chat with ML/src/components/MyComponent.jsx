import { Button } from "@material-tailwind/react";
import { IoMoon } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";
import { useDarkTheme } from "../store/ThemeManage";
import { useCompCommunicator } from "../store/CompCommunicater";
import { GiHamburgerMenu } from "react-icons/gi";
const MyComponent = () => {
  const { open, setOpen, openDrawer, closeDrawer } = useCompCommunicator();
  const { dark, setDark } = useDarkTheme();
  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };
  return (
    <>
      <div className="flex justify-between">
        <button onClick={openDrawer} className=" mr-auto">
          <GiHamburgerMenu className=" fill-black bg-none dark:fill-white" />
        </button>
        <button onClick={() => darkModeHandler()} className="ml-2">
          {dark ? <IoSunny color="white" /> : <IoMoon />}
        </button>
      </div>
    </>
  );
};

export default MyComponent;
