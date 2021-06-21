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
  const buttonUp = () => {
    if (timeLeft < 600) {
      if (isMinutes) setTime(timeLeft+1)
      if (!isMinutes) setTime(timeLeft+60)
    }
  };
  const buttonDown = () => {if (timeLeft > 0) setTime(isMinutes ? timeLeft-1 : timeLeft-60)};
  const minsSwitch = () => isMinutes ? setIsMinutes(false) : setIsMinutes(true);
  const powerBtn = () => power ? setPower(false) : setPower(true);
  

  useEffect(() => {
    if (timeLeft > 0 && power) {
      const timerInterval = setInterval(() => setTime(timeLeft-1), 60000)
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
              {isMinutes ? `${timeLeft} ` : `${Math.floor(timeLeft/60)}`}
              <div className="digi-resize">{isMinutes ? 'MIN' : 'HRS'} </div>
            </div> : <div></div>
            }
          </div>

          <div className="buttons">
            <div className="upDown">
              <div className="bttn" id="up" onClick={buttonUp}><img src={upSvg} alt="up" /></div>
              <div className="bttn" id="down" onClick={buttonDown}><img src={downSvg} alt="down" /></div>
            </div>
            <div className="bttn power" onClick={powerBtn}>{power ? <div className="circ"></div> : <div className="no-circ"></div> }PWR</div>
          </div>

        </div>

        <div className="second-row">
          <div className="hrs-bttn-container">
            Mins
                      <div className="mins-toggle" onClick={minsSwitch}> {isMinutes ? <div className="left"></div> : <div className="right"></div>} </div>
            Hrs
          </div>
          <div className="slider-container">
            {
              isMinutes ?
            <input className="hours-slider" type="range" min={0} max={600} value={timeLeft} onChange={sliderChange} /> :
            <input className="minutes-slider" type="range" min={0} max={10} value={timeLeft/60} onChange={sliderChange} />
            }
          </div>
        </div>
      </div>
      
    </div>
  )
}
