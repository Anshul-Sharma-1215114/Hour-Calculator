import React, { useEffect } from "react"
import "./timer.css";

const formatTime = (timer) => {
  const getSeconds = `0${(timer % 60)}`.slice(-2)
  const minutes = `${Math.floor(timer / 60)}`
  const getMinutes = `0${minutes % 60}`.slice(-2)
  const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)
  return `${getHours} : ${getMinutes} : ${getSeconds}`
}

const Timer = () => {

  const { timer, isActive, isPaused, handleStart, handlePause, handleResume, handleReset } = useTimer( Number(localStorage.getItem("todayTime")) || 0 )
  
  const d = new Date();
  var todayDate = String(d.getDate()) +"-" + String(d.getMonth()+1)+"-" + String(d.getFullYear())
  
  useEffect(()=>{
    if(localStorage.getItem('todayDate')!==todayDate){
      handleReset();
      handleStart();
      localStorage.setItem('todayDate',todayDate)
    }
    else if(localStorage.getItem('todayDate')===todayDate && (localStorage.getItem('isPaused')==='true' )){ 
      handleResume(); 
    }
    return () => {
      handleReset();
    }
  },[]);

  localStorage.setItem('todayTime',timer);

  return (
    <div className="timer">
      <h3>Today's Time</h3>
      <div className='stopwatch-card'>
        <p>{formatTime(timer)}</p>
        <div className='buttons'>
          {
            !isActive && !isPaused ?
              <button onClick={handleStart}>Start</button>
              : (
                isPaused ? <button onClick={handlePause}>Pause</button> :
                  <button onClick={handleResume}>Resume</button>
              )
          }
          <button onClick={handleReset} disabled={!isActive}>Reset</button>
        </div>
      </div>
    </div>
  );
}

const useTimer = (initialState = 0) => {
  const [timer, setTimer] = React.useState(initialState)
  const [isActive, setIsActive] = React.useState(Number(localStorage.getItem("todayTime")) === 0 ? false : true)
  const [isPaused, setIsPaused] = React.useState(false)
  const countRef = React.useRef(null)

  const handleStart = () => {
    setIsActive(true)
    setIsPaused(true)
    localStorage.setItem('isPaused',true);
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1)
    }, 1000)
  }

  const handlePause = () => {
    // localStorage.setItem('todayTime',timer);
    localStorage.setItem('isPaused',false);
    clearInterval(countRef.current)
    setIsPaused(false)
  }
  
  const handleResume = () => {
    localStorage.setItem('isPaused',true);
    setIsPaused(true)
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1)
    }, 1000)
  }

  const handleReset = () => {
    localStorage.setItem('isPaused',false);
    localStorage.setItem('todayTime',0);
    clearInterval(countRef.current)
    setIsActive(false)
    setIsPaused(false);
    setTimer(0);
  }

  return { timer, isActive, isPaused, handleStart, handlePause, handleResume, handleReset }
}
  
export default Timer;
  