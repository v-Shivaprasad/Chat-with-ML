import { IoMoon } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";
import { useDarkTheme } from "../store/ThemeManage";
import { useEffect } from "react";

const MyComponent = () => {
  useEffect(() => {
    setDark(true);
    document.body.classList.toggle("dark");
  }, []);
  const { dark, setDark } = useDarkTheme();
  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };
  return (
    <>
      <div className="flex flex-col ">
        <button onClick={() => darkModeHandler()}>
          {dark ? <IoSunny color="white" /> : <IoMoon />}
        </button>
      </div>
    </>
  );
};

export default MyComponent;
