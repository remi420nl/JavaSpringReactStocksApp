import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { List, ListItem, ListItemText } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import { Signup } from "../../api";

const Confirmation = (props) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState([]);
  const {
    values: {
      firstname,
      lastname,
      email,
      username,
      city,
      portfolio,
      password,
    },
  } = props;

  const { values, prev, next } = props;
  const rows = [];

  //pushing all objects to array so we can loop over them
  useEffect(() => {
    for (var value in values) {
      if (values.hasOwnProperty(value)) {
        const fieldData = values[value];
        rows.push(fieldData);
      }
    }
    setData(rows);
  }, []);

  //if user confirms the signup API gets triggered that gets the data generated to DTO format (json) as an argument
  function handleclick(e, option) {
    e.preventDefault();

    if (option === "confirm") {
      Signup(generateResponse())
        .then((response) => {
          console.log("Response ", response);
          if (response.status === 200) {
            next();
          } else {
            console.log("registration not ok " ,response);
          }
        })
        //If someting went wrong users gets an error message
        .catch((e) => setError(e.response.data.message));
    } else {
      // if user clicks "Terug" the previous component will be rendered
      prev();
    }
  }

//generating correct resonse according to API's DTO object
  function generateResponse() {
    return {
      username: username.value,
      firstname: firstname.value,
      lastname: lastname.value,
      password: password.value,
      email: email.value,
      city: city.value,
      portfolio: portfolio.value,
    };
  }

  return (
    <div className="signupform">
      <h3>Overzicht</h3>
      <List>
        {data.map((value) => (
          <div className="confirmation" key={value.name}>
            <ListItem alignItems="flex-start" key={value.name}>
              <ListItemText
                primary={value.label}
                secondary={<React.Fragment>{value.value}</React.Fragment>}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        ))}
      </List>
      <p className="errormessage">{error}</p>
      <div className="signupbuttons">
        <Button
          color="primary"
          variant="contained"
          onClick={(e) => handleclick(e, "confirm")}
        >
          Bevestigen
        </Button>
        <Button
          color="secondary"
          variant="contained"
          onClick={(e) => handleclick(e, "prev")}
        >
          Terug
        </Button>
      </div>
    </div>
  );
};

export default Confirmation;
