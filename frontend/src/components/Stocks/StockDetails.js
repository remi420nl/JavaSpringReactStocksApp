import React, {Component}from "react";

export  const StockDetails = (props) => {
    const {amount,price,name } = props;

    if(price){
    return (
        <div className="stockdetails">
            <h3>{name}</h3>
            <div>
               Huidige koers {price}
            </div>
            <h4>
               Totaal: {(amount*price).toFixed(2)}
            </h4>
        </div>)
        }
        return(<></>)

    
}