// src/context/ThemeContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context for theme
const ThemeContext = createContext();

// Custom hook to access the theme context
export const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(null);  // Set the initial state to null to indicate it's loading

  useEffect(() => {
    // Check for theme preference in localStorage on initial load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    } else {
      // Fallback to the user's system preference
      setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  useEffect(() => {
    if (isDark === null) return;  // Wait until isDark is determined

    // Apply the dark mode to the <html> element based on isDark state
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(prev => !prev);

  // Fallback for the initial state while the theme preference is being determined
  if (isDark === null) {
    return null;  // You can return a loading spinner here if needed
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
