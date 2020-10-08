import React, {useState}from 'react';
import { fetchTickerData } from "../../api";

export const GetCurrentValue = (stock,amount) => {


let price = 0;
const now = new Date();
const currentdate = parseInt("" + now.getFullYear() + now.getMonth() + now.getDate());
const stockdate = parseInt(stock.lastUpdate);

console.log("dates: ", currentdate, stockdate)

if(currentdate > stockdate || stockdate == undefined){

fetchTickerData(stock.symbol).then((x) => {
  let obj = x.data["Time Series (Daily)"];
let latest = obj[Object.keys(obj)[0]];
  let value =  parseFloat(latest["4. close"])

 price = value;
});


return price * amount;
}else{

  return parseInt(stock.latestPrice) * amount
}


}