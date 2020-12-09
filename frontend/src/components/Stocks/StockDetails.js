import React from "react";

//to show dome information about the selected stock and what the total value would be when purchased
export const StockDetails = (props) => {
  const { amount, price, name, currency } = props;

  if (price) {
    return (
      <div className="stockdetails">
        <h3>{name}</h3>
        <div>Huidige koers {currency}{price}</div>
        <h4>Totaal: {currency}{(amount * price).toFixed(2)}</h4>
      </div>
    );
  }
  return <></>;
};
