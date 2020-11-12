import React, { Component, useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const PersonalDataForm = (props) => {
  const [data, setData] = useState([]);
  const { values, change, next } = props;
  const [error, setError] = useState({});
  const rows = [];

  //pushing all objects to array
  useEffect(() => {
    for (var value in values) {
      if (values.hasOwnProperty(value)) {
        const fieldData = values[value];
        rows.push(fieldData);
      }
    }
    setData(rows);
  }, []);


  function nextpage(e) {
    if (checkFields()) {
      next();
    }
  }

   // copy of errors for readability
   const oldErrors = error;

  function checkFields() {
    const {
      values: { email, username, password },
    } = props;

    if (!validateEmail(email)) {
      setError({ email: "Ongeldig email-adres ## @ ## . ##" });
      return;
    }
    if (username.value.length < 2) {
      setError({ ...oldErrors, [`${username.name}`]: errorMessage(username) });
      return;
    }
    if (password.value.length < 4) {
      setError({ ...oldErrors, [`${password.name}`]: errorMessage(password) });
      return;
    }
    return true;
  }

  // custom email validation function which checks things like a single @ and position of .
  function validateEmail(email) {
    let lastAt = email.value.lastIndexOf("@");
    let lastDot = email.value.lastIndexOf(".");

    if (
      !(
        lastAt < lastDot &&
        lastAt > 0 &&
        email.value.indexOf("@@") == -1 &&
        lastDot > 2 &&
        email.value.length - lastDot > 2
      )
    ) {
      return false;
    }
    return true;
  }



  //calling prop in parent component that maintains the state
  function handleChange(e, field) {
    change(e, field);
  }

  //minimum characters
  const characters = {
    username: 2,
    password: 4,
  };

  const errorMessage = (field) => {
    return `Te kort, minimaal ${characters[field.name]} karakers`;
  };

  return (
    <div className="signupform">
      {data.map((field) => (
        <TextField
          onBlur={({ target: { value } }) => {
            if (value.length < 3 && field.name != "email") {
              setError({
                ...oldErrors,
                [`${field.name}`]: errorMessage(field),
              });
            } else {
              setError({ ...oldErrors, [`${field.name}`]: "" });
            }
          }}
          key={field.name}
          label={field.label}
          type={field.name}
          onChange={(e) => handleChange(e, field.name)}
          defaultValue={field.value}
          helperText={error[`${field.name}`]}
          FormHelperTextProps={{
            style: { color: "rgb(107, 17, 17)" },
          }}
          inputProps={{
            autoCapitalize: "false",
          }}
        />
      ))}
      <div className="signupbuttons">
        <Button color="primary" variant="contained" onClick={nextpage}>
          Volgende
        </Button>
      </div>
    </div>
  );
};

export default PersonalDataForm;
