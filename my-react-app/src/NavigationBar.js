import React, { useState } from 'react';
import './css/NavigationBar.css'; // Importing the CSS file
import { useLanguage } from './LanguageContext';

function NavigationBar() {
  // Access the language context using the custom hook
  const { currentLanguage, changeLanguage } = useLanguage();

  // State to control the visibility of language options
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);

  // Function to toggle the display of language options
  const toggleLanguageOptions = () => {
    setShowLanguageOptions(!showLanguageOptions);
  };

  // Function to select a new language and hide the options
  const selectLanguage = (language) => {
    changeLanguage(language);
    setShowLanguageOptions(false);
  };

  // Define language options excluding the current language
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
        {/* Button to toggle language options */}
        <button id="language-button" onClick={toggleLanguageOptions}>
          {currentLanguage}
        </button>
        {/* Display language options when showLanguageOptions is true */}
        {showLanguageOptions && (
          <div id="language-options">
            {Object.entries(languageOptions).map(([key, value]) => (
              // Button for each language option, with a click event to change the language
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
