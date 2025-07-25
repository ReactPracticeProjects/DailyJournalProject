import React, { createContext, useEffect, useState } from "react";

export const Theme = createContext();

const ThemeContext = ({children}) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("journalTheme");
    console.log("Saved Theme is : " + savedTheme);
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("journalTheme", theme);
    console.log("Current Theme is : " + theme)
  }, [theme]);

  return (
    <Theme.Provider value={[theme, setTheme]}>{children}</Theme.Provider>
  );
};

export default ThemeContext;
