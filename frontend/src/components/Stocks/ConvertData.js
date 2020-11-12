import { timeParse } from "d3-time-format";

//this is the function which is being used to convert data from the AlphaVantage stocks API to a readble format for the stock chart library/plugin
export const ConvertData = (data) => {
  const returnarray = objectToArray(data);

  return returnarray;
};

const parseDate = timeParse("%Y-%m-%d");

//since the json data consists of objects we need to loop over the proprties and assign the values to 
//a new object and push them into an array
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

  //sort based on the date ascending 
  rows.sort(function (a, b) {
    return new Date(a.date) - new Date(b.date);
  });
  const stockdata = {
    data: rows,
  };
  return stockdata;
}
