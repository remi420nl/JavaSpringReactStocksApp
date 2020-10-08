//import './App.css';

import React from "react";
import { useState, useEffect, useRef } from "react";
import Select from "react-virtualized-select";
import StockInfo from "./StockInfo";
import SelectBox from "../../features/select-box";
import createFilterOptions from "react-select-fast-filter-options";
import { StockData } from "./StocksData";
import Dropdown from "react-bootstrap/Dropdown";
import {StockOptions} from './StockOptions'

import { fetchTickerData, postNewPosition } from "../../api";

function Stocks(props) {
  const [tickerData, setTickerData] = useState();

  const [stock, setStock] = useState();

  const [range, setRange] = useState();

  const [error, setError] = useState("");

  const ref = useRef(null);

  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");

 
  const {portfolioId} = props

  useEffect(() => {
    document.addEventListener("mousedown", clickOutsideOfMenu);
    return () => {
      document.removeEventListener("mousedown", clickOutsideOfMenu);
    };
  }, []);

  useEffect(() => {
    const dropDownItems = [];

    StockData.map((s) => {
      const item = {
        label: s.label,
        value: s.symbol,
      };
      return dropDownItems.push(item);
    });

    dropDownItems.sort((a,b) => (a.label > b.label) ? 1 : -1)
    setOptions(dropDownItems);


  }, []);

  const clickOutsideOfMenu = (e) => {

      const { current: refw } = ref;
 
    if(refw && !refw.contains(e.target)){
        console.log("if is true")
        setDisplay(false)
    }
  };


  //after a stock from the dropdowns gets clicked:
  function loadTickerData(symbol, name) {

    let stockdata = {};

    fetchTickerData(symbol).then((x) => {
      stockdata = x.data["Time Series (Daily)"];
      setData(stockdata,symbol,name)
    });

        //chosen ticker(stock) gets set and the data for the chart gets loaded from the api

  }

function setData(data,symbol,name){
  const latest = Object.keys(data)[0]

  const stock = {
    name: name,
    symbol: symbol,
    price:  parseFloat(data[latest]['4. close']),
    data: data
  }
  setError("");
  setDisplay(false);
  setStock(stock);
}



  function submitPosition(amount){
  
  const now = new Date();
  //if stock usestate is present in constructs an object for the api (json)
  if(stock){
    const data = {
      stock: stock.name,
      symbol: stock.symbol,
      portfolioId: portfolioId,
      amount: amount ,
      price: parseFloat(stock.price).toFixed(2),
      value: parseFloat(amount * stock.price).toFixed(2),
      date: "" + now.getFullYear() + now.getMonth() + now.getDate()
    }
    postNewPosition(data)
  }else{
    setError('Eerst een aandeel kiezen')
  } }

  // function loadIntraDay() {
  //     fetchTickerIntraDay("aapl")
  // }

  function onChangeHandler(e) {
    //console.log(tickerData);
    // setName(e.label);
    // loadTickerData(e.value);
  }

  function handleRange(e) {
    setRange(e);
  }

  return (
    <div>
    <div  className="stocks">
    <div className="stockoptions">
    <StockOptions submitPosition={submitPosition}/>
   <div className="errormessage"> {error}</div>
    </div>
<div className="stocksdropdown">
      <input className="searchfield"
        onChange={(e) => setSearch(e.target.value)}
        onClick={() => setDisplay(!display)}
        value={search}
        placeholder="Zoek aandeel"
      />
  
      {display && (
        <div  ref={ref} className="optionlist">
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
                  key={i} >
                    <input type="radio" className="radio" id={i.value} />
                  <label htmlFor={o.value}>{o.label}</label>
                </div>
              );
            })}
           
        </div>
  
        
      )} 
     
     
      </div>
      <div className="stockdetails">
        {stock ? (  
        < StockInfo stockdata={stock}  /> 
        ) : (
          <div className="choosestock">Kies eerst een aandeel</div>
        )}
      </div>
    </div>

    </div>
  );


}

export default Stocks;

// <div className="row">
// <div className="col-md-4"></div>
// <div className="col-md-4">
//   {dropdownMenu.length}
//   <Select
//     autosize={false}
//     options={dropdownMenu}
//     //  filterOptions = {filterOptions}
//     onChange={onChangeHandler}
//     className="stockselector"
//   />

//   <Dropdown>
//     <Dropdown.Toggle variant="success" id="dropdown-basic">
//      Kies aandeel
//     </Dropdown.Toggle>
//     <Dropdown.Menu>
// <Dropdown.Item onchange={o}>Action</Dropdown.Item>
// <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
// <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
// </Dropdown.Menu>
//   </Dropdown>
// </div>
// <div className="col-md-4">
//   {/* <SelectBox rangeSelector={handleRange} /> */}
// </div>
// </div>

// <StockInfo data={tickerData} name={name} />
