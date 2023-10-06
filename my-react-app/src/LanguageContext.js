// LanguageContext.js
import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export function useLanguage() {
  return useContext(LanguageContext);
}

export function LanguageProvider({ children }) {
  const [currentLanguage, setCurrentLanguage] = useState('English');

  const changeLanguage = (newLanguage) => {
    setCurrentLanguage(newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
