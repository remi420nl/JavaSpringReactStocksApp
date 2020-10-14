import React, { Component } from "react";
import { DetailsForm, PersonalDataForm, Confirmation, Success } from ".";

export class SignupForm extends Component {
  state = {
    page: 1,
    firstname: {
      name: "firstname",
      label: "Voornaam",
      value: "",
      placeholder: "testplaceholder",
    },
    lastname: { name: "lastname", label: "Achternaam", value: "" },
    username: { name: "username", label: "Gebruikersnaam", value: "" },
    password: { name: "password", label: "Wachtwoord", value: "" },
    email: { name: "email", label: "E-mail Adres", value: "" },
    city: { name: "city", label: "Woonplaats", value: "" },
    portfolio: { name: "portfolio", label: "Portfolio Naam", value: "" },
  };

  handleChange = (event, input) => {
    const key = input;
    const value = event.target.value;

    this.setState((previousState) => ({
      [key]: { ...previousState[key], value: value },
    }));
  };

  nextPage = () => {
    if (this.validateEmail()) {
      const { page } = this.state;
      this.setState({
        page: page + 1,
      });
    }
    return { email: "Ongeldig email-adres ##@##.##" };
  };

  prevPage = () => {
    const { page } = this.state;
    this.setState({
      page: page - 1,
    });
  };

  validateEmail = () => {
    const {
      email: { value },
    } = this.state;

    // if email is emptie
    if (value.length < 1) {
      return true;
    }

    let lastAt = value.lastIndexOf("@");
    let lastDot = value.lastIndexOf(".");

    if (
      !(
        lastAt < lastDot &&
        lastAt > 0 &&
        value.indexOf("@@") == -1 &&
        lastDot > 2 &&
        value.length - lastDot > 2
      )
    ) {
      return false;
    }
    return true;
  };

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
            success={this.handleSuccesfulAuth}
          />
        );
      case 4:
        return (
          <Success
            next={this.nextPage}
            prev={this.prevPage}
            name={firstname["value"] + " " + lastname["value"]}
          />
        );
    }

    return <div></div>;
  }
}

export default SignupForm;
