import React, { useState, useEffect, useRef } from 'react';
import './css/GuestInvitation.css';
import weddingImage from './assets/wedding-img.jpg';
import weddingVideo from './assets/wedding-vid.mp4';
import weddingCover1 from './assets/wed-img-1.jpg';
import weddingCover2 from './assets/wed-img-2.jpg';
import weddingCover3 from './assets/wed-img-3.jpg';
import weddingCover4 from './assets/wed-img-4.jpg';

const GuestInvitation = ({ guestName, guestTOA }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [videoErrorFlag, setVideoErrorFlag] = useState(true); // State for handling video errors

  const images = [weddingCover4, weddingCover1, weddingCover2, weddingCover3, weddingCover4];

  const videoRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [images.length]);

  const capitalizeEachWord = (str) => {
    const words = str.split(' '); // Split the string into words
    const capitalizedWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return capitalizedWords.join(' '); // Join the words back together with spaces
  };

  const handleVideoError = () => {
    // Handle video load errors by setting the error flag
    setVideoErrorFlag(true);
  };

  const handleSwipe = (event) => {
    const deltaX = event.deltaX;

    if (deltaX > 50) {
      // Swipe right, go to the previous image
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    } else if (deltaX < -50) {
      // Swipe left, go to the next image
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX !== null) {
      const touchEndX = e.changedTouches[0].clientX;
      const deltaX = touchEndX - touchStartX;

      if (deltaX > 50) {
        // Swipe right, go to the previous image
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
      } else if (deltaX < -50) {
        // Swipe left, go to the next image
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }

      // Reset touchStartX
      setTouchStartX(null);
    }
  };

  const calculateVideoHeight = () => {
    const video = videoRef.current;
    if (video) {
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      // Calculate the aspect ratio
      const aspectRatio = videoWidth / videoHeight;

      // Set the height based on the desired width (e.g., 100% of the container width)
      const desiredWidth = video.offsetWidth; // You can customize this as needed
      const desiredHeight = desiredWidth / aspectRatio;

      video.style.height = `${desiredHeight}px`;

      // Set the top position for .guest-invitation-name
      const guestNameElement = document.querySelector('.guest-invitation-name');
      const topPosition = desiredHeight * 0.793;
      guestNameElement.style.top = `${topPosition}px`;

      // Remove the event listener to avoid multiple executions
      video.removeEventListener('loadedmetadata', calculateVideoHeight);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener('loadedmetadata', calculateVideoHeight);
      video.addEventListener('error', handleVideoError);
      video.play().catch((error) => {
        handleVideoError();
      });
    }
  }, []);


  return (
    <div className="invitation-container">
      <div className="media-wrapper">
        <video
          ref={videoRef}
          className="wedding-video"
          autoPlay
          muted
          playsInline
          onCanPlay={() => {
            // Video has successfully loaded and can be displayed
            // Reset the error flag to hide the image
            setVideoErrorFlag(false);
          }}
        >
          <source src={weddingVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {videoErrorFlag && <img className="wedding-image" src={weddingImage} alt="" />}

      <div className="guest-invitation-name">
        {capitalizeEachWord(guestTOA)} {capitalizeEachWord(guestName)}
      </div>
      <h1 className="photo-gallery-title">Photo Gallery</h1>
      <div
        className="image-wrapper"
        onWheel={(e) => {
          handleSwipe({ deltaX: e.deltaX });
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={(e) => {
          // Prevent default touchmove behavior to enable swiping
          e.preventDefault();
        }}
        // Add this style property for touch-action
        style={{ touchAction: 'pan-y' }}
      >
        <img className="wedding-image" src={images[currentIndex]} alt="Wedding cover design" draggable="false" />
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
