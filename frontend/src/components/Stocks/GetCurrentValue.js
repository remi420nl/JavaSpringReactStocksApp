
import React,  { useState, useEffect} from "react";
import { fetchTickerData, updateStockPrice } from "../../api";


//checks if the date of the last stock update is older than today, if true than it will make a new api call
//this is to minimize the api calls since the free api has a maximum amount of calls per minute
export const GetCurrentValue = async (stock, amount, dollarEuro, callback) => {



  let price = 0;
  const now = new Date();
  const month = now.getMonth() + 1 ? now.getMonth() +1 : "0" + now.getMonth();
  const year =  now.getFullYear();
  const day = now.getDate() > 9 ? now.getDate() : "0" + now.getDate();

  const currentdate = parseInt(
    "" + year + month + day
  );
  const stockdate = parseInt(stock.lastUpdate);
  
  console.log("currendate..", currentdate)
  console.log("stockdate..", stockdate)


  if (currentdate > stockdate || stockdate == undefined) {
    fetchTickerData(stock.symbol)
      .then((x) => {
        let obj = x.data["Time Series (Daily)"];

        let latest = obj[Object.keys(obj)[0]];
        let value = parseFloat(latest["4. close"]);
        let stockprice = value;
       
        if(stock.description === 'usa'){
          console.log("AMERIKAANSE STOCK", stockprice, dollarEuro)
          //converting to euro if its a dollar stock
      
           stockprice = parseFloat(dollarEuro)*parseFloat(stockprice)
        }
      
        console.log("STOCKPRICE ", stock.name ,stockprice)
        //update price in database entity
        updateStockPrice(stock.id, stockprice, currentdate);
        console.log("stock updated in database");

        //using callback function that is being passed as the 3rd argument of this function to retun this async value
        callback(stockprice * amount);
      })
      .catch((e) => console.log(e),
      callback(false)
      );
  } else {
    console.log("stock price already up to date");
    callback(stock.latestPrice * amount);
  }
  


  
};
