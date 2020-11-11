import React, { useEffect } from "react";
import { Button } from "@material-ui/core";

const Success = (props) => {
const {name, success} = props;

useEffect(() => {
    console.log('success', name)
})
  return (
    <div className="signupform">
    <h3> {name}, bedankt voor het registreren</h3>
    <Button variant="contained" color="primary"  onClick={() => success('/login')}>Klik hier om in te loggen</Button>
    </div>
  );
};
export default Success