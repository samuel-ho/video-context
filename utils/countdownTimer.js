const CountdownTimer = (counter, setCounter, checkEventTime, isRestartTimer) => {
    const timer = counter > -1 && setInterval(() => {setCounter(counter - 1)}, 1000);
    if(counter <= -1 && isRestartTimer){
      setCounter(checkEventTime());
    }
    return () => clearInterval(timer);
  }

  const calculateTotalSecondsLeft = (seconds, waveDuration) => {
    let totalSecs =  seconds - (Math.ceil(seconds/waveDuration) -1) * waveDuration;
    return waveDuration - totalSecs;
  }
  
  export const calculateChatTimeLeft = (CHAT_LENGTH, chatStartTime, currTime) => {
    let timeSinceChatStart = Math.floor(Math.abs(currTime - chatStartTime) / 1000)
    return CHAT_LENGTH - timeSinceChatStart;
  }
  
  export const calculateLeftTime = (startDate, isEvent, NEXT_CHATWAVE_DURATION, CHAT_LENGTH, currTime) =>{
    if (!startDate) return 0;
    
    let totalSeconds = Math.floor(Math.abs(currTime - Date.parse(startDate)) / 1000); 
    
    if(isEvent && totalSeconds > NEXT_CHATWAVE_DURATION) { 
      let totalWave = NEXT_CHATWAVE_DURATION;
      
      return totalSeconds < totalWave ? 
        totalWave - (totalSeconds - NEXT_CHATWAVE_DURATION) :
        calculateTotalSecondsLeft(totalSeconds, totalWave)
    } 
  
    if(totalSeconds > NEXT_CHATWAVE_DURATION){ 
      return calculateTotalSecondsLeft(totalSeconds, NEXT_CHATWAVE_DURATION)
    }
    return NEXT_CHATWAVE_DURATION - totalSeconds; 
  };

  export default CountdownTimer