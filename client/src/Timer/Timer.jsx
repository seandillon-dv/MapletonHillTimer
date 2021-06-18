import React, { useEffect, useState } from 'react';
import './Timer.scss';

import clock from '../assets/Clock_simple.svg';
import upSvg from '../assets/up.svg';
import downSvg from '../assets/down.svg';



export const Timer = () => {

  const [timeLeft, setTime] = useState(100);
  const [isMinutes, setIsMinutes] = useState(true);
  const [power, setPower] = useState(true)

  const sliderChange = (e) => {
    if(isMinutes)setTime(e.target.value);
    else setTime(e.target.value*60);
  } 
  const buttonUp = () => setTime(timeLeft+1);
  const buttonDown = () => {if (timeLeft > 0) setTime(timeLeft-1)};
  const minsSwitch = () => isMinutes ? setIsMinutes(false) : setIsMinutes(true);
  const powerBtn = () => power ? setPower(false) : setPower(true);
  

  useEffect(() => {
    if (timeLeft > 0 && power) {
      const timerInterval = setInterval(() => setTime(timeLeft-1), 1000)
      return () => clearInterval(timerInterval);
    }
    
  }, [timeLeft, power])

  return (
    <div className="timer-container">

      <div className="rows">

        <div className="first-row">

          <div className="screen">
            
            <div className="clock-container">
              { power ? <img src={clock} alt="" />: <div></div>  }
            </div>
            { power ?
            <div className="font-face-digi time">
              {isMinutes ? `${timeLeft} MIN` : `${Math.floor(timeLeft/60)} HR`}
            </div> : <div></div>
            }
          </div>

          <div className="buttons">
            <div className="upDown">
              <div className="bttn" id="up" onClick={buttonUp}><img src={upSvg} alt="up" /></div>
              <div className="bttn" id="down" onClick={buttonDown}><img src={downSvg} alt="down" /></div>
            </div>
            <div className="bttn power" onClick={powerBtn}>{power ? <div></div> : null}PWR</div>
          </div>

        </div>

        <div className="second-row">
          <div className="bttn" onClick={minsSwitch}>hrs/mins</div>
          <input type="range" min={0} max={100} value={timeLeft} onChange={sliderChange} />
        </div>
      </div>
      
    </div>
  )
}
