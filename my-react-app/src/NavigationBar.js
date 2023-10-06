import React, { useState } from 'react';
import './css/NavigationBar.css'; // Make sure to import your CSS file
import { useLanguage } from './LanguageContext';

function NavigationBar() {
  const { currentLanguage, changeLanguage } = useLanguage();
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);

  const toggleLanguageOptions = () => {
    setShowLanguageOptions(!showLanguageOptions);
  };

  const selectLanguage = (language) => {
    changeLanguage(language);
    setShowLanguageOptions(false);
  };

  // Define language options
  const languageOptions = {
    English: 'English',
    Vietnamese: 'Vietnamese',
    // French: 'French',
  };

  // Remove the current language from the options
  delete languageOptions[currentLanguage];

  return (
    <div className="navbar">
      <div className="left">
        <p>Wedding Cherish</p>
      </div>
      <div className="right">
        <button id="language-button" onClick={toggleLanguageOptions}>
          {currentLanguage}
        </button>
        {showLanguageOptions && (
          <div id="language-options">
            {Object.entries(languageOptions).map(([key, value]) => (
              <button key={key} onClick={() => selectLanguage(key)}>
                {value}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default NavigationBar;
