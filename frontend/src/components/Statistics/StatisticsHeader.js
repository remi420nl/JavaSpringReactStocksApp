
import React, { useEffect, useState } from "react";
import CountDown from "../Common/CountDown";

//Header with custom clock function and the tota competitors
export default function StatisticsHeader (props){
const {amount} = props;
const [time,setTime] = useState()

//runs every second
useEffect(() => {
    const clock = () => {
        let time = new Date()
        let clock =  timeFormat(time.getHours()) + ":" + timeFormat(time.getMinutes()) + ":"+ timeFormat(time.getSeconds())
        //updating useState with new string
    setTime(clock)
    }

    setInterval(clock, 1000)
},[])

//add a zero is clock digit is less than 10
const timeFormat = (time) => {
  return time > 10 ? time : "0" + time
}

    return (
        <div className="statisticsheader">
          <div className="portfoliodetails">
            <div>
            Aantal deelnemers
              <span>{amount}</span>
            </div>
          </div>
          <CountDown/>
          <div className="portfoliodetails">
            <div>
           Huidige tijd
              <span>{time}</span>
            </div>
          </div>
            </div>
         
      );
    }


    