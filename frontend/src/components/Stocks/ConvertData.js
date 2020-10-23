
import { timeParse, utcDay } from "d3-time-format";

export const ConvertData = (data) => {
  const returnarray = objectToArray(data);

  return returnarray;
}

const parseDate = timeParse("%Y-%m-%d");

function objectToArray(data) {
  const timeSeries = data;
  let rows = [];

  for (var key in timeSeries) {
    if (timeSeries.hasOwnProperty(key)) {
      const finData = timeSeries[key];

      const open = finData["1. open"];
      const high = finData["2. high"];
      const low = finData["3. low"];
      //this one is being parsed since we need it as our buying price
      const close = parseFloat(finData["4. close"]);
      const volume = finData["6. volume"];

      rows.push({
        date: parseDate(key),
        open,
        high,
        low,
        close,
        volume,
      });
    }
  }

  rows.sort(function(a,b){
	return new Date(a.date) - new Date(b.date);
  })
console.log("rows ", rows)
  const stockdata = {
    data: rows,
  //  latestclose: rows[0].close,
  };
  return stockdata;
}