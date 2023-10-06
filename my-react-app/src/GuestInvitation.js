import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import './css/GuestInvitation.css'; // Importing the CSS file
import weddingVideo from './assets/wedding-gif.mp4';  // Importing the video
import weddingCover1 from './assets/wedding-cover-1.jpg';  // Importing the image
import weddingCover2 from './assets/wedding-cover-2.png';  // Importing the image
import weddingCover3 from './assets/wedding-cover-3.jpg';  // Importing the image
import weddingInvitation from './assets/wedding-invitation.png';  // Importing the image

const GuestInvitation = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [weddingCover1, weddingCover2, weddingCover3]; // Repeated for demonstration

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer); // Cleanup
  }, [images.length]);

  return (
    <div className="invitation-container">
      <div className="media-wrapper">
        <video className="wedding-video" autoPlay loop muted>
          <source src={weddingVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="image-wrapper">
        <img className="wedding-image" src={weddingInvitation} alt="Wedding invitation design" />
      </div>
      <div className="image-wrapper">
        <img className="wedding-image" src={images[currentIndex]} alt="Wedding cover design" />
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
