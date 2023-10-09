// LanguageContext.js
import React, { createContext, useContext, useState } from 'react';

// Create a context for language management
const LanguageContext = createContext();

// Custom hook to access the language context
export function useLanguage() {
  return useContext(LanguageContext);
}

// LanguageProvider component to manage language state
export function LanguageProvider({ children }) {
  // State to store the current language, default to 'English'
  const [currentLanguage, setCurrentLanguage] = useState('English');

  // Function to change the current language
  const changeLanguage = (newLanguage) => {
    setCurrentLanguage(newLanguage);
  };

  // Provide the language context to the child components
  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
