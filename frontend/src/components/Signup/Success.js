import React, { Component, useState, useEffect } from "react";
import { AppBar, MuiThemeProvider } from "@material-ui/core";


const Success = (props) => {
const {name} = props;


useEffect(() => {
    console.log('success', name)
})
  return (
    <div className="signupForm">
      <AppBar title="Success" />
    <h1> {name}, bedankt voor het registreren</h1>
    <p>Tekst nog in te vullen..</p>
    </div>
  );
};
export default Success