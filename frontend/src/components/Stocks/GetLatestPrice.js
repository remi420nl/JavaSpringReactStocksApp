import React, {useState}from 'react';
import { fetchTickerData } from "../../api";

export const GetLatestPrice = (ticker) => {

const [price,setPrice] = useState()

fetchTickerData(ticker).then((x) => {
        let obj = x.data["Time Series (Daily)"];
      let latest = obj[Object.keys(obj)[0]];
        let value =  parseFloat(latest["4. close"])

       setPrice(value);
      });

return price;


}