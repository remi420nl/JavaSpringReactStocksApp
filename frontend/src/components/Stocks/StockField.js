import React, { useState } from "react";
import { Button } from "@material-ui/core/";


//function component to render a input field and button and to display the current balance
export const StockField = (props) => {
  const [amount, setAmount] = useState();
  const [notification, setNotification] = useState();
 
  const { submitPosition, price, availableCash, currency, dollarBalance } = props;




  const handleChange = ({ target: { value } }) => {
    //  event.preventDefault();
    if (!isNaN(value)) {
      props.setAmount(value);
      setAmount(value);
    }
  };

  //if submit is valid, it makes a submitPosition call to the the parent component
  const handleSubmit = () => {
  
    if (availableCash - price * amount < 0) {
      setNotification("Saldo niet toereikend!");
      return;
    }
    if (submitPosition(amount)) {
      setNotification("Toegevoegd aan portfolio!");
    }
  };

  

  return (
    <div className="stockfield">
        <input
        placeholder="Aantal.."
         className="stocksamount"
          onChange={(e) => handleChange(e)}
          value={amount}
          id="demo-customized-textbox"
        />
     
      <Button style={{ marginLeft : "4px"}} disabled={!amount > 0} onClick={() => handleSubmit()}>
        Toevoegen
      </Button>
      <div className="errormessage">{notification}</div>
      <div style={{ marginTop: "30px" }}>
        Beschikbaar Saldo: €{availableCash.toFixed(2)}
      </div>
      {currency === "$" && <i style={{  "marginTop": "5px" }}>
      {currency}{dollarBalance.toFixed(2)}
        </i>}
    </div>
  );
};
