import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Authenthicate } from "../../api/";
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

  handleChange(e, field) {
    e.preventDefault();
    this.setState({
      [field]: e.target.value,
    });
  }

  submit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;

    if (username === "" || password === "") {
      this.setState({ error: "Beide velden invullen svp" });
      return;
    }
    const register = async () => {
      await Authenthicate(username, password);
    };

   
    if(register()){
      console.log("login true")
      this.props.setLogin(true)
      this.props.history.push("/");
    }
  };

  handleClickShowPassword = () => {
    this.setState((previousState) => ({
      showPassword: !previousState.showPassword,
    }));
  };

  handleMouseDownPassword = (event) => {
    event.preventDefault();

  };

  errormessage = () => {

    return <p style={{ color: "red" }}>{this.state.error}</p>;
  };

  render() {
    const { username, password, showPassword, error } = this.state;
    const {loginStatus} = this.props;
    if(!loginStatus){
    return (
      <div className="signupForm">
        <TextField
          label="Gebruikersnaam"
          //  placeholder={value.firstname.placeholder}
          onChange={(e) => this.handleChange(e, "username")}
          defaultValue={username}
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
        {this.errormessage()}
        <Button
          color="primary"
          variant="contained"
          onClick={(e) => this.submit(e)}
        >
          Inloggen
        </Button>
     
      </div>
    
    );
          }else{
            return(
            <div className="signupForm">Je bent al ingelogd</div>
            )
          }

  }
}
