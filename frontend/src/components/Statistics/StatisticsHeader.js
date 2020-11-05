
import React, { useEffect, useState } from "react";
import CountDown from "../common/CountDown";

export default function StatisticsHeader (props){
const {amount} = props;
const [time,setTime] = useState()


useEffect(() => {


    const clock = () => {
      console.log("staticsheader")
        let time = new Date()
        let clock = time.getHours() + ":" + time.getMinutes()+":"+time.getSeconds()
    setTime(clock)
    }

    setInterval(clock, 1000)
},[])

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


    