import React, { useState, useEffect } from 'react';
import './css/CountdownTimer.css'; // Importing the CSS file
import bg01 from './assets/bg01.jpg';  // Importing the image
import bg02 from './assets/bg02.jpg';  // Importing the image
import bg03 from './assets/bg03.jpg';  // Importing the image

import SimpleSlider from './SimpleSilder';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date('2023-12-13T09:00:00+07:00').getTime();

    const timerId = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
      });

      if (distance < 0) {
        clearInterval(timerId);
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  return (

    <div className="countdown-container">
      <SimpleSlider />
      <div className="countdown-wrapper">

        <h1 className="coming-soon">SAVE THE DATE</h1>
        <div className="countdown-table">
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


