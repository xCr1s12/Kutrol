"use client";

import { createContext, useEffect, useState } from "react";

export const darkModeContext = createContext({
  darkMode: true,
  toggleDarkMode: () => {},
});

export default function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved !== null) {
      setDarkMode(saved === "true");
    }
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (!initialized) return;

    document.documentElement.classList.toggle("light", !darkMode);
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode, initialized]);

  const toggleDarkMode = () => {
    setDarkMode((current) => !current);
  };

  return (
    <darkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </darkModeContext.Provider>
  );
}