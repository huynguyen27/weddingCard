import React, { useState, useEffect, useCallback } from 'react';
import bg01 from './assets/bg01.jpg';  // Importing the image
import bg02 from './assets/bg02.jpg';  // Importing the image
import bg03 from './assets/bg03.jpg';  // Importing the image
import bg04 from './assets/bg04.jpg';  // Importing the image
import './css/SimpleSlider.css'; // Import your CSS file for styling

const SimpleSlider = () => {
  // State management
  const [nowSlide, setNowSlide] = useState(0); // Current slide index
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth); // Current viewport width

  // Array of slide images
  const itemSlide = [bg01, bg02, bg03, bg04 ];

  // Slide transition settings
  const delay = 6000; // Delay between slides in milliseconds
  const speed = 1000; // Transition speed between slides in milliseconds

  useEffect(() => {
    // Automatic slide change using setInterval
    const intervalId = setInterval(() => {
      setNowSlide((prevSlide) => (prevSlide + 1) % itemSlide.length);
    }, delay);

    // Update viewport width on window resize
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup: Clear interval and remove event listener
    return () => {
      clearInterval(intervalId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Calculate the desired width and height for slider items based on viewport width
  const calculateWidthAndHeight = useCallback(() => {
    // Adjust these values based on your design requirements
    if (viewportWidth <= 768) {
      const maxWidth = viewportWidth; // 100% of viewport width
      const maxHeight = maxWidth * 0.8; // Maintain a specific aspect ratio

      return {
        width: `${maxWidth}px`,
        height: `${maxHeight}px`,
        maxWidth: '550px',
        maxHeight: '225px',
      };
    } else {
      const maxWidth = viewportWidth * 0.55; // 55% of viewport width
      const maxHeight = maxWidth * 0.5; // Maintain a specific aspect ratio

      return {
        width: `${maxWidth}px`,
        height: `${maxHeight}px`,
        maxWidth: '550px',
        maxHeight: '225px',
      };
    }
  }, [viewportWidth]);

  // Calculate the style for each slider item
  const sliderItemStyle = calculateWidthAndHeight();

  return (
    <div className="simpleslide100">
      {/* Map through slide images and apply styles */}
      {itemSlide.map((slide, index) => (
        <div
          key={index}
          className="simpleslide100-item"
          style={{
            ...sliderItemStyle,
            backgroundImage: `url(${slide})`,
            opacity: index === nowSlide ? 1 : 0,
            transition: `opacity ${speed}ms ease-in-out`,
          }}
        ></div>
      ))}
    </div>
  );
};

export default SimpleSlider;
