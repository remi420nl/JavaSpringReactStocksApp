import React, { useState, useEffect, useRef } from "react";
import StockChart from "./StockChart";
import { ConvertData } from "./ConvertData";
import { StockField } from "./StockField";
import { StockDetails } from "./StockDetails";
import {
  fetchTickerData,
  postNewPosition,
  fetchPortfoliosByUser,
  getAllStocks,
  sendStockToBackend,
  fetchAllTickers,
} from "../../api";
import { EuroDollar, DollarEuro } from "../../features/CurrencyConverter";
import Loader from "react-loader-spinner";

//for displaying the AEX stocks page
function Stocks(props) {
  const [amount, setAmount] = useState(0);
  const [stock, setStock] = useState();
  const [error, setError] = useState("");
  const ref = useRef(null);
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");
  const [availableCash, setAvailableCash] = useState();
  const [portfolioId, setPortfolioId] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentStocks, setCurrentStocks] = useState("aex");
  const [currency, setCurrency] = useState();
  const [euroDollar, setEuroDollar] = useState(0);
  const [dollarEuro, setDollarEuro] = useState(0);
  const [loading,setLoading] =useState(false)

  //adding an eventlistening for a mousedown event to let the custom pulldown menu dissapear when a user clicks outside of it
  useEffect(() => {
    document.addEventListener("mousedown", clickOutsideOfMenu);
    return () => {
      document.removeEventListener("mousedown", clickOutsideOfMenu);
    };
  }, []);

  //fetching users portfolio to determine the available cash and portfolio id
  useEffect(() => {
    EuroDollar().then((e) => {
      setEuroDollar(e);
    });

    DollarEuro().then((d) => {
      setDollarEuro(d);
    });

    fetchPortfoliosByUser()
      .then(({ data }) => {
        setAvailableCash(data.cash);
        setPortfolioId(data.id);
        setIsLoggedIn(true);
      })
      .catch((response) => console.log(response));
  });

  useEffect(() => {
    setCurrency(currentStocks == "aex" ? "€" : "$");
  }, [currentStocks]);

  //setting the custom dropdown menu with the stockdata array and pushing all to usestate array in proper format
  useEffect(() => {
    setStocksDropdown(currentStocks);
  }, []);

  //using useRef it checks if the user click somewhere other than the ref that is being set in the render function at the dropdown list
  //this way it can determine of the menu (setDisplay state) needs to be closed
  const clickOutsideOfMenu = (e) => {
    const { current: refw } = ref;

    if (refw && !refw.contains(e.target)) {
      setDisplay(false);
    }
  };

  //after a stock from the dropdowns gets clicked it loads the ticker (stock symbol) data, then it sets the timeseries (everyday prices)
  function loadTickerData(symbol, name) {
    let stockdata = {};

    fetchTickerData(symbol).then((response) => {
      stockdata = response.data["Time Series (Daily)"];
      setData(stockdata, symbol, name);
    });
    //chosen ticker(stock) gets set and the data for the chart gets loaded from the api
  }

  function setStocksDropdown(type) {
    const dropDownItems = [];
    setLoading(true)
    getAllStocks(type).then(({ data }) => {
      data.map((s) => {
        const item = {
          label: s.name,
          value: s.symbol,
        };
        return dropDownItems.push(item);
      });
    });
    //sorting by label (stock) name ascending
    dropDownItems.sort((a, b) => (a.label > b.label ? 1 : -1));
    setOptions(dropDownItems);
    setLoading(false)
  }

  function switchStocks() {
    const type = currentStocks == "aex" ? "usa" : "aex";

    setStocksDropdown(type);

    setCurrentStocks(type);
  }

  function loadUSStocks() {
    let stocks = [];

    fetchAllTickers()
      .then((r) =>
        r.data.map((s) =>
          stocks.push({
            symbol: s.symbol,
            name: s.name,
            description: "usa",
          })
        )
      )
      .then(() => {
        sendStockToBackend(stocks);
      });
  }

  function setData(data, symbol, name) {
    //data being coverted so its readable for the chart
    const converted = ConvertData(data);
    const n = converted.data.length;
    const price = converted.data[n - 1]["close"].toFixed(2);

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

  //submit a position to the Spring API, this function is being passed to a child component as a prop
  function submitPosition(amount) {
    const now = new Date();
    //if stock usestate is present in constructs an object for the api (json)

    //converting to euro if its a dollar stock
    let stockprice = currency === "$" ? dollarEuro * stock.price : stock.price;

    const month =
      now.getMonth() + 1 ? now.getMonth() + 1 : "0" + now.getMonth();
    const year = now.getFullYear();
    const day = now.getDate() > 9 ? now.getDate() : "0" + now.getDate();

    const currentdate = parseInt("" + year + month + day);

    if (stock) {
      const data = {
        stock: stock.name,
        symbol: stock.symbol,
        portfolioId: portfolioId,
        amount: amount,
        price: stockprice,
        value: amount * stockprice,
        date: currentdate,
        description: currentStocks,
      };

      //Api call
      postNewPosition(data).catch(() => {
        return false;
      });
      return true;
    }
  }

  return (
    <div className="stockpage">
      <div className="stockcontainer">
        <h2 className="pagetitle">
          {currentStocks == "aex" ? "AEX Index" : "Amerikaanse Index"}
        </h2>
        <div className="stockoptions">
          {isLoggedIn && (
            <StockField
              setAmount={setAmount}
              availableCash={availableCash}
              price={stock ? stock.price : 0}
              amount={amount}
              currency={currency}
              dollarBalance={availableCash * euroDollar}
              submitPosition={submitPosition}
            />
          )}
          <StockDetails
            isLoggedIn={isLoggedIn}
            amount={amount}
            price={stock ? stock.price : 0}
            name={stock ? stock.name : ""}
            currency={currency}
          />
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
                      label.toLowerCase().indexOf(search.toLowerCase()) > -1
                  )
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
          <div>
            <button
              style={{ margin: "8px", padding: "0px 5px" }}
              onClick={() => switchStocks()}
            >
              {currentStocks == "aex" ? "Amerika" : "AEX"}
            </button>
            {loading &&     <Loader
                                type="Oval"
                                color="#424242"
                                height={50}
                                width={50}
                            />}
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
