import { createContext, useContext, useState } from "react";

const ThemeManage = createContext();

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(false);

  return (
    <ThemeManage.Provider
      value={{
        dark,
        setDark,
      }}
    >
      {children}
    </ThemeManage.Provider>
  );
};

export const useDarkTheme = () => {
  return useContext(ThemeManage);
};
