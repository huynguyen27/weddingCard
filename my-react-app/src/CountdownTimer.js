import React, { useState, useEffect } from 'react';
import './css/CountdownTimer.css'; // Importing the CSS file
import SimpleSlider from './SimpleSilder'; // Importing a custom slider component

const CountdownTimer = () => {
  // State to hold the countdown timer values (days, hours, minutes, seconds)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Calculate the target date and time for the countdown
    const targetDate = new Date('2023-12-13T09:00:00+07:00').getTime();

    // Set up a timer using setInterval to update the countdown
    const timerId = setInterval(() => {
      // Get the current date and time
      const now = new Date().getTime();

      // Calculate the remaining time in milliseconds
      const distance = targetDate - now;

      // Calculate the days, hours, minutes, and seconds remaining
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Update the state with the calculated countdown values
      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
      });

      // Clear the timer if the countdown has reached zero (event time reached)
      if (distance < 0) {
        clearInterval(timerId);
      }
    }, 1000);

    // Cleanup: clear the interval when the component unmounts
    return () => clearInterval(timerId);
  }, []); // The empty dependency array ensures the effect runs once when the component mounts

  return (
    <div className="countdown-container">
      <SimpleSlider /> {/* Render a custom slider component */}
      <div className="countdown-wrapper">
        <h1 className="coming-soon">SAVE THE DATE</h1>
        <div className="countdown-table">
          {/* Display days, hours, minutes, and seconds with labels */}
          <div className="countdown-cell">
            <p className="countdown-number">{timeLeft.days}</p>
            <p className="countdown-label">Days</p>
          </div>
          <div className="countdown-separator">:</div>
          <div className="countdown-cell">
            <p className="countdown-number">{timeLeft.hours}</p>
            <p className="countdown-label">Hr</p>
          </div>
          <div className="countdown-separator">:</div>
          <div className="countdown-cell">
            <p className="countdown-number">{timeLeft.minutes}</p>
            <p className="countdown-label">Min</p>
          </div>
          <div className="countdown-separator">:</div>
          <div className="countdown-cell">
            <p className="countdown-number">{timeLeft.seconds}</p>
            <p className="countdown-label">Sec</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
