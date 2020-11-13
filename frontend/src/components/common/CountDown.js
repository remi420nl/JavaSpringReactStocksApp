import React, { useEffect, useState } from "react";

export default function CountDown(props) {
  const [minutes, setMinutes] = useState();
  const [hours, setHours] = useState();
  const [days, setDays] = useState();
  const [marketOpened, setMarketOpened] = useState();

  //To start the countdown function
  useEffect(() => {
    countDown();
  }, []);

  //This useffect runs every minute to update the time
  useEffect(() => {
    const interval = setTimeout(() => countDown(), 60000);
    return () => clearInterval(interval);
  });

  const countDown = () => {
    //setting current date and time
    let now = new Date();
    //setting market open en close times
    let marketOpenTime = new Date();
    marketOpenTime.setHours(9);
    marketOpenTime.setMinutes(0);
    marketOpenTime.setSeconds(0);

    let marketCloseTime = new Date();
    marketCloseTime.setHours(17);
    marketCloseTime.setMinutes(30);

    //if actual time is later than market closing time or the day is sunday the next open time is one day ahead
    if (now > marketCloseTime || now.getDay() == 7) {
      marketOpenTime.setDate(now.getDate() + 1);
    }

    //if its saturday the open time is 2 days ahead
    if (now.getDay() == 6) {
      marketOpenTime.setDate(now.getDate() + 2);
    }
    //if its friday past 17:30 the next market open time is monday, 3 days ahead
    if (
      (now.getDay() == 5 && now.getHours() >= 17 && now.getMinutes() > 30) ||
      (now.getDay() == 5 && now.getHours() > 17)
    ) {
      marketOpenTime.setDate(now.getDate() + 3);
    }

    //setting the time thats left until open or close
    let timeLeft = 0;
    if (marketOpenTime && marketCloseTime && now) {
      //set market to closed in the weekends
      if (now.getDay() == 6 || now.getDay() == 7) {
        timeLeft = marketOpenTime.getTime() - now.getTime();

        setMarketOpened(false);
      }

      //if its priot to opening or past closing its false
      else if (now < marketOpenTime || now > marketCloseTime) {
        timeLeft = marketOpenTime.getTime() - now.getTime();

        setMarketOpened(false);
      }

      //if now is between open and close time its open
      else if (now > marketOpenTime && now < marketCloseTime) {
        timeLeft = marketCloseTime.getTime() - now.getTime();

        setMarketOpened(true);
      }
    }
    setTimer(timeLeft);
  };

  //setting variables for time, this also runs every minute
  const setTimer = (timeLeft) => {
    let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

    setMinutes(minutes);
    setHours(hours);

    //if the timeleft is one day or more it also sets the day
    if (days >= 1) {
      setDays(days);
    }
  };


  return (
    <div className="countdown">
      <div>
        Beurs is{" "}
        {marketOpened ? (
          <div style={{ color: "darkblue", fontWeight: "bold" }}> open</div>
        ) : (
          <div style={{ color: "darkred" }}> gesloten</div>
        )}{" "}
      </div>
      <div>
        {marketOpened
          ? `Nog ${hours} uur en ${minutes} minuten tot sluiting`
          : `Nog ${
              days ? days + " dagen " : ""
            } ${hours} uur en ${minutes} minuten tot opening`}
      </div>
    </div>
  );
}
