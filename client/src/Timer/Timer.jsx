import React, { useEffect, useState } from 'react';
import './Timer.scss';

import clock from '../assets/Clock_simple.svg';

export const Timer = () => {

  const [timeLeft, setTime] = useState(100);
  const [isMinutes, setIsMinutes] = useState(true);

  const sliderChange = (e) => setTime(e.target.value);
  const buttonChange = (direction) => {
    if (direction === 'up' && isMinutes) setTime(timeLeft+1);
    else if (direction === 'up' && !isMinutes) setTime(timeLeft+60);
    else if (direction === 'down' && isMinutes) setTime(timeLeft-1);
    else setTime(timeLeft-60);
  }

  useEffect(() => {
    const timerInterval = setInterval(() => setTime(timeLeft-1), 1000)
    return () => clearInterval(timerInterval);
  }, [timeLeft])

  return (
    <div>
      
      {timeLeft}
    </div>
  )
}
