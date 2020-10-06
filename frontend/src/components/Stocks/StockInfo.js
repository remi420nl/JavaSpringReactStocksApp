import React, { Component, useState, useEffect } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';

const StockInfo = (props) => {
const [ChartData,setChartData] = useState([])
const [latestClosing, setLatestClosing] = useState()
    const { data} = props;


useEffect(() => {
    console.log(data);
    objectToArray()
},[data])

function objectToArray(){

    const timeSeries = data.data
    let rows = [];

    for (var key in timeSeries){
       
        if (timeSeries.hasOwnProperty(key)){
            const finData = timeSeries[key];

            const open = finData['1. open'];
            const high = finData['2. high'];
            const low = finData['3. low'];
            const close = finData['4. close'];

            rows.push({
                date: key,
                open,
                high,
                low,
                close
            });
        }
       
        
    }
    setChartData(rows);
    setLatestClosing(rows[0].close)
   
}


    //key = date
    /*
    for (var key in timeSeries){
       
        if (timeSeries.hasOwnProperty(key)){
            const finData = timeSeries[key];

            const open = finData['1. open'];
            const high = finData['2. high'];
            const low = finData['3. low'];
            const close = finData['4. close'];

            rows.push({
                date: key,
                open,
                high,
                low,
                close
            });
        }
       
    }
   

   
    console.log(rows);

    const symbol = data['Meta Data']['2. Symbol'];
    const lastRefreshed = data['Meta Data']['3. Last Refreshed'];
    const timeZone = data['Meta Data']['5. Time Zone'];
 */

if(ChartData !== undefined){
    
    return(
       
        <div className="stockchart">
        <h3>{data.name}</h3>
         
            <LineChart width={600} height={300} data={ChartData}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <XAxis reversed={true} dataKey="date"/>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Legend />
       <Line type="monotone" dot={false} dataKey="open" stroke="#8884d8" activeDot={{r: 8}}/>
       <Line type="monotone" dot={false} dataKey="close" stroke="yellow" />
       <Line type="monotone" dot={false} dataKey="high" stroke="#82ca9d" />
       <Line type="monotone" dot={false} dataKey="low" stroke="red" />
       
      </LineChart>
      <div>Stock Latest close price {latestClosing}</div>
        </div>
        
        
    )
       }
       return(
           <div>nothing to show</div>
       )

}

export default StockInfo;