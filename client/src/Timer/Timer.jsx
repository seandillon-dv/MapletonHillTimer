import React, { useEffect, useState } from 'react';
import './Timer.scss';

import clock from '../assets/Clock_simple.svg';

export const Timer = () => {

  const [timeLeft, setTime] = useState(100);
  const [isMinutes, setIsMinutes] = useState(true);

  const sliderChange = (e) => setTime(e.target.value);
  const buttonUp = () => setTime(timeLeft+1);
  const buttonDown = () => setTime(timeLeft-1);
  const minsSwitch = () => isMinutes ? setIsMinutes(false) : setIsMinutes(true);
  

  useEffect(() => {
    if (timeLeft > 0) {
      const timerInterval = setInterval(() => setTime(timeLeft-1), 1000)
      return () => clearInterval(timerInterval);
    }
    
  }, [timeLeft])

  return (
    <div className="timer-container">

      <div className="rows">

      <div className="first-row">

        <div className="screen">
          <div className="clock-container">
            <img src={clock} alt="" />
          </div>
          
          <div className="font-face-digi time">
            {isMinutes ? `${timeLeft} MIN` : `${timeLeft/60} HR`}
            </div>
        </div>

        <div className="buttons">
          <button onClick={buttonUp}>up</button>
          <button onClick={buttonDown}>down</button>
        </div>

      </div>

      <div className="second-row">
        <button onClick={minsSwitch}>hrs/mins</button>
        <input type="range" min={0} max={100} value={timeLeft} onChange={sliderChange} />
      </div>
    </div>
      
    </div>
  )
}
