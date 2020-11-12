import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Login } from "../../api/";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputLabel from "@material-ui/core/InputLabel";

export class LoginForm extends Component {
  constructor(props) {
    super();
  }

  state = {
    username: "",
    password: "",
    showPassword: false,
    error: "",
  };

  //setting state for entered username ans password
  handleChange(e, field) {
    e.preventDefault();
    this.setState({
      [field]: e.target.value,
    });
  }

  //clickhandler for submit button
  submit = (e) => {
    const { render } = this.props;

    e.preventDefault();
    const { username, password } = this.state;

    //fields must both have values
    if (username === "" || password === "") {
      this.setState({ error: "Beide velden invullen svp" });
      return;
    }
    //login using the Spring API and setting the received token and userid in local storage
    const login = async () => {
      await Login(username, password)
        .then((response) => {
          localStorage.setItem("jwt-token", response.data.jwt);
          localStorage.setItem("UserId", response.data.userId);
          if (response.status == 200) {
            //calling render prop to set login state and passing the username of the succesful logged in user
            render({
              name: response.data.username,
              login: true,
            });
            //returning to homepage after login
            this.props.history.push("/");
          }
        })
        .catch(({ response }) => {
          if (response) {
            this.setState({ error: response.data.message });
          } else this.setState({ error: "Er is iets fout gegaan" });
        });
    };
    login();
  };

  handleClickShowPassword = () => {
    this.setState((previousState) => ({
      showPassword: !previousState.showPassword,
    }));
  };

  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  render() {
    const { username, password, showPassword, error } = this.state;
    const { loginStatus } = this.props;
    if (!loginStatus) {
      return (
        <div className="signupform">
          <TextField
            label="Gebruikersnaam"
            //  placeholder={value.firstname.placeholder}
            onChange={(e) => this.handleChange(e, "username")}
            defaultValue={username}
            inputProps={{
              autoCapitalize: "none",
            }}
          />
          {/* piece of code copied from material ui for a modern password field with visibility option */}
          <FormControl>
            <InputLabel htmlFor="standard-adornment-password">
              Wachtwoord
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={showPassword ? "text" : "password"}
              value={password}
              autoCapitalize="none"
              onChange={(e) => this.handleChange(e, "password")}
              endAdornment={
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={this.handleClickShowPassword}
                  onMouseDown={this.handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              }
            />
          </FormControl>
          <p className="errormessage">{error}</p>
          <Button
            color="primary"
            variant="contained"
            onClick={(e) => this.submit(e)}
          >
            Inloggen
          </Button>
        </div>
      )
    } else {
      return <div className="signupForm">Je bent al ingelogd</div>;
    }
  }
}
