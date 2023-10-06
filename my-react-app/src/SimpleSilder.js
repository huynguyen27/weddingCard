import React, { useState, useEffect } from 'react';
import bg01 from './assets/bg01.jpg';  // Importing the image
import bg02 from './assets/bg02.jpg';  // Importing the image
import bg03 from './assets/bg03.jpg';  // Importing the image
import bg04 from './assets/bg04.jpg';  // Importing the image
import './css/SimpleSlider.css'; // Import your CSS file for styling

const SimpleSlider = () => {
  const [nowSlide, setNowSlide] = useState(0);

  const itemSlide = [bg01, bg02, bg03, bg04 ];  // Use imported images

  const delay = 6000;
  const speed = 1000; 

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNowSlide((prevSlide) => (prevSlide + 1) % itemSlide.length);
    }, delay);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="simpleslide100">
      {itemSlide.map((slide, index) => (
        <div
          key={index}
          className="simpleslide100-item"
          style={{
            
            backgroundImage: `url(${slide})`,  // Use the imported image variable
            opacity: index === nowSlide ? 1 : 0, // Use opacity for the fade effect
            transition: `opacity ${speed}ms ease-in-out`, // Use ease-in-out for smoother transition
          }}
        ></div>
      ))}
    </div>
  );
};

export default SimpleSlider;
