import React, { Component, useState, useEffect } from "react";
import { AppBar, MuiThemeProvider } from "@material-ui/core";
import { TextField } from "@material-ui/core";

import { Button } from "@material-ui/core";

const DetailsForm = (props) => {
  const [data, setData] = useState([]);
  const { values, change, next,prev } = props;
  const [error,setError] = useState({})
  const rows = [];

  useEffect(() => {
    for (var value in values) {
      if (values.hasOwnProperty(value)) {
        const fieldData = values[value];
        rows.push(fieldData);
      }
    }
    setData(rows);
  }, [error]);

// copy of errors for readability
const oldErrors = error;


  function handleclick(e) {
    if (e === "next") {
      console.log("error", error)
      //e.preventDefault();
      if(checkFields()){
        next()
      }
    } else {
      prev();
    }
  }

  function checkFields(){
    const {values: { firstname, lastname, city, portfolio }} = props
    const fields =  { firstname, lastname, city, portfolio };
    let okfields = 0;
    const errorMessage = "Te kort, minimaal 2 karakers";
    let errors = {}
    for (var key in fields) {
      if (fields.hasOwnProperty(key)){
        let result = checkLength(fields[key]);
        okfields += result;
        if(result < 1){
          errors = {...errors, [key]: errorMessage}
        }
      }
    
    }
    setError(errors)
  return okfields > 3;
  }

  function checkLength(field){

    
   

    if(field.value.length < 2){
      return 0
    }
   return 1

  }

  function handleChange(e, v) {
    change(e, v);
  }

  return (
    <div className="signupform">
      <AppBar title="Enter Personal Details" />
      {data.map((field) => (
        <TextField
          key={field.name}
          label={field.label}
          onChange={(e) => handleChange(e, field.name)}
          defaultValue={field.value}
          helperText= {error[`${field.name}`]}
          FormHelperTextProps={{
           style:{color: 'red'}
         }}
         inputProps={{
          autoCapitalize: 'none',
        }}
        autoCapitalize = 'none'
        />
      ))}
      <div className="signupbuttons">
      <Button
        color="primary"
        variant="contained"
        onClick={() => handleclick("next")}
      >
        Volgende
      </Button>
      <Button
        color="secondary"
        variant="contained"
        onClick={() => handleclick("prev")}
      >
        Terug
      </Button>
      </div>
    </div>
  );
};

export default DetailsForm;
