import React from "react";


export function PortfolioHeader(props) {

  const { owner, description,currentTotalValue, oldTotalValue } = props;

  const difference = () => {
 return parseFloat(
      ((currentTotalValue - oldTotalValue) / oldTotalValue) * 100
    ).toFixed(2)
  }
  return (
    <div className="portfolioheader">
      <div className="portfoliodetails">
        <div>
          Eigenaar
          <span>{owner}</span>
        </div>
        <div>
          Beschrijving
          <span>{description}</span>
        </div>
      </div>
      <div className="portfoliosummary">
        <div>
          Vermogen
          <span>{currentTotalValue}</span>
        </div>
        <div>
          Rendement
          <span  style={{ color: difference() >= 0 ? "green" : "red" }}>{difference()} %</span>
        </div>
      </div>
    </div>
  );
}
