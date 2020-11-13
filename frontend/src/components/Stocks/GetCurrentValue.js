import { fetchTickerData, updateStockPrice } from "../../api";

//checks if the date of the last stock update is older than today, if true than it will make a new api call
//this is to minimize the api calls since the free api has a maximum amount of calls per minute
export const GetCurrentValue = async (stock, amount, callback) => {
  let price = 0;
  const now = new Date();
  const currentdate = parseInt(
    "" + now.getFullYear() + now.getMonth() + now.getDate()
  );
  const stockdate = parseInt(stock.lastUpdate);

  if (currentdate > stockdate || stockdate == undefined) {
    fetchTickerData(stock.symbol)
      .then((x) => {
        let obj = x.data["Time Series (Daily)"];

        let latest = obj[Object.keys(obj)[0]];
        let value = parseFloat(latest["4. close"]);
        price = value;

        //update price in database entity
        updateStockPrice(stock.id, price, currentdate);
        console.log("stock updated in database");

        //using callback function that is being passed as the 3rd argument of this function to retun this async value
        callback(price * amount);
      })
      .catch((e) => console.log(e),
      callback(false)
      );
  } else {
    console.log("stock price already up to date");
    callback(stock.latestPrice * amount);
  }
};
