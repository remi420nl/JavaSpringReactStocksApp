import React, { Component } from "react";
import { DetailsForm, PersonalDataForm, Confirmation, Success } from ".";

//This is the parent component / class for the signup form
//it holds the state of all objects with values needed for a registration
export class SignupForm extends Component {
  state = {
    page: 1,
    firstname: { name: "firstname",  label: "Voornaam",  value: "" },
    lastname: { name: "lastname", label: "Achternaam", value: "" },
    username: { name: "username", label: "Gebruikersnaam", value: "" },
    password: { name: "password", label: "Wachtwoord", value: "" },
    email: { name: "email", label: "E-mail Adres", value: "" },
    city: { name: "city", label: "Woonplaats", value: "" },
    portfolio: { name: "portfolio", label: "Portfolio Naam", value: "" },
  };

  //changes the value for each state object, this function is being passed to the neccesay child components
  handleChange = (event, input) => {
    const key = input;
    const value = event.target.value;

    //spreading the old state and adding the new value
    this.setState((previousState) => ({
      [key]: { ...previousState[key], value: value },
    }));
  };

  //increments the state page variable which renders the next component
  nextPage = () => {
    const { page } = this.state;
    this.setState({
      page: page + 1,
    });
  };

  //decrements the state page variable which renders the next component
  prevPage = () => {
    const { page } = this.state;
    this.setState({
      page: page - 1,
    });
  };

  //after a succesful authorization it redirects to the given page
  handleSuccesfulAuth = (page) => {
    this.props.history.push(page);
  };

  render() {
    const {
      page,
      firstname,
      lastname,
      city,
      email,
      username,
      password,
      portfolio,
    } = this.state;
    const firstvalues = { username, email, password };
    const secondvalues = { firstname, lastname, city, portfolio };
    const totalvalues = { ...firstvalues, ...secondvalues };

    //switch statement which uses the page state as argument
    switch (page) {
      case 1:
        return (
          <PersonalDataForm
            next={this.nextPage}
            change={(e, v) => this.handleChange(e, v)}
            values={firstvalues}
          />
        );
      case 2:
        return (
          <DetailsForm
            next={this.nextPage}
            prev={this.prevPage}
            change={(e, v) => this.handleChange(e, v)}
            values={secondvalues}
          />
        );
      case 3:
        return (
          <Confirmation
            next={this.nextPage}
            prev={this.prevPage}
            values={totalvalues}
          />
        );
      case 4:
        return (
          <Success
            next={this.nextPage}
            prev={this.prevPage}
            name={firstname["value"] + " " + lastname["value"]}
            success={this.handleSuccesfulAuth}
          />
        );
    }
    return <div></div>;
  }
}

export default SignupForm;
