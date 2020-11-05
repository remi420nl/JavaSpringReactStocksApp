import React, {useEffect,useState} from "react";

export default function PortfolioHeader(props) {

    const [minutes, setMinutes] = useState();
    const [hours, setHours] = useState();
    const [days, setDays] = useState();
    const [marketOpened, setMarketOpened] = useState();


useEffect(() => {
    countDown()
   },[])
   


useEffect(() => {
    const interval = setTimeout(() => countDown(), 60000)
   
    return () => clearInterval(interval)
  
});



   
   const countDown = () => {
    
     //setting current date and time
      let now = new Date()
      //setting market open en close times
      let marketOpenTime = new Date()
      marketOpenTime.setHours(9)
      marketOpenTime.setMinutes(0)
      marketOpenTime.setSeconds(0)
      
      let marketCloseTime = new Date()
      marketCloseTime.setHours(17)
      marketCloseTime.setMinutes(30)

      if(now > marketCloseTime || now.getDay() == 7){
          marketOpenTime.setDate(now.getDate() + 1)
      }
      if(now.getDay() == 6 ){
          marketOpenTime.setDate(now.getDate() + 2);
      }
      if((now.getDay() == 5 && now.getHours() >= 17 && now.getMinutes() > 30) ||(now.getDay() == 5 && now.getHours() > 17)){
        marketOpenTime.setDate(now.getDate() + 3);
      }
    
      let timeLeft = 0;
      if(marketOpenTime && marketCloseTime && now){

        if( now.getDay() == 6 || now.getDay() == 7){
            timeLeft = marketOpenTime.getTime() - now.getTime();
                
            setMarketOpened(false)
          }

        else if(now < marketOpenTime || now > marketCloseTime){
           timeLeft = marketOpenTime.getTime() - now.getTime();
            
          setMarketOpened(false)
        }
        else if(now > marketOpenTime && now < marketCloseTime){
           timeLeft = marketCloseTime.getTime() - now.getTime(); 
        
          setMarketOpened(true)
        }
      }

      setTimer(timeLeft)
      console.log("marketopentime ", marketOpenTime)
   
   }
   
   const setTimer = (timeLeft) => {
  
     var days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
     var hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
     var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
   
     setMinutes(minutes)
     setHours(hours)
     if(days >= 1){
       setDays(days)
     }
   }

 
   return (
    <div className="countdown">
     <div>Beurs is  {marketOpened ? <div style={{color: "darkblue", fontWeight: "bold"}}> open</div>  :<div style={{color: "darkred"}}> gesloten</div>} </div>
     <div>{marketOpened ? `Nog ${hours} uur en ${minutes} minuten tot sluiting` : `Nog ${days ? days + " dagen " : "" } ${hours} uur en ${minutes} minuten tot opening` }</div>
     </div>
   )

}