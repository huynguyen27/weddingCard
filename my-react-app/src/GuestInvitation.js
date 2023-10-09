import React, { useState, useEffect } from 'react';
import './css/GuestInvitation.css'; // Importing the CSS file
import weddingVideo from './assets/wedding-vid.mp4';  // Importing the video
import weddingCover1 from './assets/wed-img-1.jpg';  // Importing the image
import weddingCover2 from './assets/wed-img-2.jpg';  // Importing the image
import weddingCover3 from './assets/wed-img-3.jpg';  // Importing the image
import weddingCover4 from './assets/wed-img-4.jpg';  // Importing the image

const GuestInvitation = () => {
  // State to manage the current index of the displayed image
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Array of image URLs for the photo gallery
  const images = [weddingCover1, weddingCover2, weddingCover3, weddingCover4];

  useEffect(() => {
    // Use a timer to automatically change the displayed image every 3 seconds
    const timer = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 3000);

    // Cleanup: clear the timer when the component unmounts
    return () => clearInterval(timer);
  }, [images.length]); // Run the effect whenever the length of the images array changes

  return (
    <div className="invitation-container">
      <div className="media-wrapper">
        {/* Display a wedding video with specified attributes */}
        <video className="wedding-video" autoPlay loop muted playsInline>
          <source src={weddingVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <h1>Photo Gallery</h1>
      <div className="image-wrapper">
        {/* Display the current image based on the currentIndex */}
        <img className="wedding-image" src={images[currentIndex]} alt="Wedding cover design" />
        
        {/* Display navigation buttons for image selection */}
        <div className="nav-wrapper">
          {images.map((_, index) => (
            <button
              key={index}
              className={`nav-button ${currentIndex === index ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuestInvitation;
