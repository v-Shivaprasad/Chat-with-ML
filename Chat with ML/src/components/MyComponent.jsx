import { IoMoon, IoSunny } from "react-icons/io5";
import { useDarkTheme } from "../store/ThemeManage";

const MyComponent = () => {
  const { dark, setDark } = useDarkTheme();

  const darkModeHandler = () => {
    setDark(prevDark => !prevDark);
  };

  return (
    <div className="flex flex-col">
      <button onClick={darkModeHandler}>
        {dark ? <IoSunny color="white" /> : <IoMoon />}
      </button>
    </div>
  );
};

export default MyComponent;
