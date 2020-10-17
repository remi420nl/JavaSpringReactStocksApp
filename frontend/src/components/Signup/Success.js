import React, { Component, useState, useEffect } from "react";
import { AppBar, MuiThemeProvider } from "@material-ui/core";


const Success = (props) => {
const {name, success} = props;


useEffect(() => {
    console.log('success', name)
})
  return (
    <div className="signupForm">
      <AppBar title="Success" />
    <h1> {name}, bedankt voor het registreren</h1>
    <button onClick={() => success('/login')}>Klik hier om in te loggen</button>
    </div>
  );
};
export default Success