import React, { Component, useState, useEffect } from "react";
import { AppBar, MuiThemeProvider } from "@material-ui/core";
import { TextField } from "@material-ui/core";

import { Button } from "@material-ui/core";

const DetailsForm = (props) => {
  const [data, setData] = useState([]);
  const { values, change } = props;
  const rows = [];

  useEffect(() => {
    for (var value in values) {
      if (values.hasOwnProperty(value)) {
        const fieldData = values[value];
        rows.push(fieldData);
      }
    }
    setData(rows);
  }, []);

  function handleclick(e) {
    if (e === "next") {
      //e.preventDefault();
      props.next();
    } else {
      props.prev();
    }
  }

  function handleChange(e, v) {
    change(e, v);
  }

  return (
    <div className="signupForm">
      <AppBar title="Enter Personal Details" />
      {data.map((value) => (
        <TextField
          key={value.name}
          label={value.label}
          //  placeholder={value.firstname.placeholder}
          onChange={(e) => handleChange(e, value.name)}
          defaultValue={value.value}
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
