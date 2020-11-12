import React, { useEffect } from "react";
import { Button } from "@material-ui/core";

const Success = (props) => {
const {name, success} = props;

//showing the succesful registration page to the user and a button the let the user return to the login page
  return (
    <div className="signupform">
    <h3> {name}, bedankt voor het registreren</h3>
    <Button variant="contained" color="primary"  onClick={() => success('/login')}>Klik hier om in te loggen</Button>
    </div>
  );
};
export default Success