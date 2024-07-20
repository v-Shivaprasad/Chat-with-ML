import { createContext, useContext, useEffect, useState } from "react";

const ThemeManage = createContext();

export const ThemeProvider = ({ children }) => {
  // Get initial theme from localStorage or default to true (dark mode)
  const initialDarkMode = JSON.parse(localStorage.getItem('darkMode')) || true;
  const [dark, setDark] = useState(initialDarkMode);

  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    // Persist theme preference to localStorage
    localStorage.setItem('darkMode', JSON.stringify(dark));
  }, [dark]);

  return (
    <ThemeManage.Provider value={{ dark, setDark }}>
      {children}
    </ThemeManage.Provider>
  );
};

export const useDarkTheme = () => {
  return useContext(ThemeManage);
};
