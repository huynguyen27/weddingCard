import React, { useState, useEffect } from 'react';
import './css/CountdownTimer.css'; // Importing the CSS file

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
    <div className="container">
      <h1>Wedding Countdown</h1>
      <div className="countdown-box">
        <div className="time-box">
          <p>{timeLeft.days}</p>
          <span>Days</span>
        </div>
        <div className="time-box">
          <p>{timeLeft.hours}</p>
          <span>Hours</span>
        </div>
        <div className="time-box">
          <p>{timeLeft.minutes}</p>
          <span>Minutes</span>
        </div>
        <div className="time-box">
          <p>{timeLeft.seconds}</p>
          <span>Seconds</span>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
