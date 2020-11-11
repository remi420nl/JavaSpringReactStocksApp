
import React from "react";
import { useState, useEffect, useRef } from "react";
import StockChart from "./StockChart";
import {ConvertData} from "./ConvertData";
import { StockData } from "./StocksData";
import { StockField } from "./StockField";
import {StockDetails} from "./StockDetails"
import { fetchTickerData, postNewPosition } from "../../api";
import { fetchPortfoliosByUser } from "../../api";

function Stocks(props) {
  const [amount, setAmount] = useState(0);
  const [stock, setStock] = useState();
  //const [range, setRange] = useState();
  const [error, setError] = useState("");
  const ref = useRef(null);
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");
  const [availableCash, setAvailableCash] = useState();
  const [portfolioId, setPortfolioId] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false)


  useEffect(() => {
    document.addEventListener("mousedown", clickOutsideOfMenu);
    return () => {
      document.removeEventListener("mousedown", clickOutsideOfMenu);
    };
  }, []);

  useEffect(() => {
    fetchPortfoliosByUser()
    .then(({ data }) => {
      setAvailableCash(data.cash);
      setPortfolioId(data.id);
      setIsLoggedIn(true)
    }).catch(response => console.log(response))
  })

  useEffect(() => {

    const dropDownItems = [];

    StockData.map((s) => {
      const item = {
        label: s.label,
        value: s.symbol,
      };
      return dropDownItems.push(item);
    });

    dropDownItems.sort((a, b) => (a.label > b.label ? 1 : -1));
    setOptions(dropDownItems);
  }, []);

  const clickOutsideOfMenu = (e) => {
    const { current: refw } = ref;

    if (refw && !refw.contains(e.target)) {
      setDisplay(false);
    }
  };

  //after a stock from the dropdowns gets clicked:
  function loadTickerData(symbol, name) {
    let stockdata = {};

    fetchTickerData(symbol).then((response) => {
      stockdata = response.data["Time Series (Daily)"];
      setData(stockdata, symbol, name);
    });

    //chosen ticker(stock) gets set and the data for the chart gets loaded from the api
  }

  function setData(data, symbol, name) {
    
    //data being coverted so its readable for the chart
    const converted = ConvertData(data);
    const n = converted.data.length
    const price = converted.data[n-1]['close'].toFixed(2);

    const stock = {
      name: name,
      symbol: symbol,
      price: price,
      data: converted,
    };
    setError("");
    setDisplay(false);

    setStock(stock);
  }

  function submitPosition(amount) {
 
    const now = new Date();
    //if stock usestate is present in constructs an object for the api (json)
    if (stock) {
      const data = {
        stock: stock.name,
        symbol: stock.symbol,
        portfolioId: portfolioId,
        amount: amount,
        price: stock.price,
        value: amount * stock.price,
        date: "" + now.getFullYear() + now.getMonth() + now.getDate(),
      };
   
      //Api call
      postNewPosition(data).catch(() => {
        return false;
      })
      return true
        }    
  }

  return (
    <div className="stockpage">
      <div className="stockcontainer">
      <h2 className="pagetitle">AEX Index</h2>
        <div className="stockoptions">
         {isLoggedIn && <StockField setAmount={setAmount} availableCash={availableCash} price={stock ? stock.price : 0} amount={amount} submitPosition={submitPosition} />} 
          <StockDetails isLoggedIn={isLoggedIn} amount={amount} price={stock ? stock.price : 0} name={stock ? stock.name : ""}/>
          <div className="errormessage"> {error}</div>
        <div className="stocksearchfield">
          <input
            onChange={(e) => setSearch(e.target.value)}
            onClick={() => setDisplay(!display)}
            value={search}
            placeholder="Zoek aandeel"
          />
          {display && (
            <div ref={ref} className="optionlist">
              {options
                .filter(
                  ({ label }) =>
                    label.toLowerCase().indexOf(search.toLowerCase()) > -1 )
                .map((o, i) => {
                  return (
                    <div
                      className="option"
                      onClick={() => loadTickerData(o.value, o.label)}
                      key={i}
                    >
                      <input type="radio" className="radio" id={i.value} />
                      <label htmlFor={o.value}>{o.label}</label>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
        </div>
       
          
          {stock ? (
            <StockChart stockdata={stock.data.data} />
          ) : (
            <div className="choosestock">Kies eerst een aandeel</div>
          )}
      </div>
      </div>
   
  );
}

export default Stocks;