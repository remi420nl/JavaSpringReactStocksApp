import React, { Component, useState, useEffect } from "react";
import { AppBar, MuiThemeProvider } from "@material-ui/core";
import { TextField } from "@material-ui/core";

import { Button } from "@material-ui/core";

const DetailsForm = (props) => {
  const [data, setData] = useState([]);
  const { values, change, next, prev } = props;
  const [error, setError] = useState({});
  const rows = [];

  //pushing objects to array to loop over  them
  useEffect(() => {
    for (var value in values) {
      if (values.hasOwnProperty(value)) {
        const fieldData = values[value];
        rows.push(fieldData);
      }
    }
    setData(rows);
  }, [error]);

  function handleclick(e) {
    if (e === "next") {
      if (checkFields()) {
        next();
      }
    } else {
      prev();
    }
  }

  //custom field validation, checking directly from props since there the values are being stored not in this state
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
    setError(errors);
    return okfields > 3;
  }

  //minmum field length of 2 characters
  function checkLength(field) {
    if (field.value.length < 2) {
      return 0;
    }
    return 1;
  }

  //passing event and field to parent component which holds the state
  function handleChange(e, field) {
    change(e, field);
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
          helperText={error[`${field.name}`]}
          FormHelperTextProps={{
            style: { color: "rgb(107, 17, 17)" },
          }}
          inputProps={{
            autoCapitalize: "none",
          }}
          autoCapitalize="none"
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
