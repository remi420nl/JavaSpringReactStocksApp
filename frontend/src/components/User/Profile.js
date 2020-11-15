import DialogContent from "@material-ui/core/DialogContent";
import {DialogTitle, Dialog} from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { getUser, updateUser } from "../../api/index";

//to let the user edit its existing user info frm the entity
export const Profile = (props) => {
  const [data, setData] = useState({});
  const [password, setPassword] = useState();
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [result, setResult] = useState("")
  const [error, setError] = useState("")
  const {loginStatus} = props;


  useEffect(() => {
    if(loginStatus){
    getUser().then(({ data }) => setData(data));
    }else{
      props.history.push("/login")
    }
  }, []);

  const checkPassword = (enteredpassword) => {
    if (password === enteredpassword) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  };

  const handleSubmit = () => {
    if (password == null){
      updateUser(data).then(response => {
        if(response.status === 200){
          setResult("Profiel bijgewerkt")
        }
      }).catch(() => setResult("Er is iets fout gegaan"));
    }
    else if (passwordsMatch && password.length > 3) {
      data.password = password;
      updateUser(data).then(response => {
        if(response.status === 200){
          setResult("profiel bijgewerkt")
        }
      }).catch(() => setResult("Er is iets fout gegaan"));
    } else if (password.length < 3) {
      setError("Minimaal 4 karakters")
    }
  };

  const setPasswordField =(enteredpassword) =>{
    setPassword(enteredpassword)
    if(password && password.length < 3){
      setError("Minimaal 4 karakters")
    }else{
      setError("")
    }
  }

  if (data) {
    return (
      <div className="signupform">
        <Dialog open={true} maxWidth="sm">
          <DialogTitle>Profiel Bijwerken</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                key={data.username}
                label="Gebruikersnaam"
                defaultValue={data.username}
                //  helperText= {error[`${field.name}`]}
                disabled={true}
              />
              <TextField
                key={data.firstname}
                label="Voornaam"
                onChange={({ target }) => (data.firstname = target.value)}
                defaultValue={data.firstname}
                //  helperText= {error[`${field.name}`]}
                FormHelperTextProps={{
                  style: { color: "red" },
                }}
                inputProps={{
                  autoCapitalize: "none",
                }}
              />
              <TextField
                key={data.lastname}
                label="Achternaam"
                onChange={({ target }) => (data.lastname = target.value)}
                defaultValue={data.lastname}
                //  helperText= {error[`${field.name}`]}
                FormHelperTextProps={{
                  style: { color: "red" },
                }}
                inputProps={{
                  autoCapitalize: "none",
                }}
              />
              <TextField
                key={data.email}
                label="Email Adres"
                onChange={({ target }) => (data.email = target.value)}
                defaultValue={data.email}
                //  helperText= {error[`${field.name}`]}
                FormHelperTextProps={{
                  style: { color: "red" },
                }}
                inputProps={{
                  autoCapitalize: "none",
                }}
              />
              <TextField
                key={data.city}
                label="Woonplaats"
                onChange={({ target }) => (data.city = target.value)}
                defaultValue={data.city}
                //  helperText= {error[`${field.name}`]}
                FormHelperTextProps={{
                  style: { color: "red" },
                }}
                inputProps={{
                  autoCapitalize: "none",
                }}
              />
              <TextField
                key={"password"}
                label="Wachtwoord"
                type="password"
                onBlur={({ target }) => setPasswordField(target.value)}
               helperText= {error}
                FormHelperTextProps={{
                  style: { color: "red" },
                }}
              />
              <TextField
                key={"confirmpassword"}
                label="Bevestig wachtwoord"
                type="password"
                onChange={({target}) => checkPassword(target.value)}
                defaultValue={data.username}
                helperText={
                  passwordsMatch ? "" : "Wachtwoorden komen niet overeen"
                }
                //  helperText= {error[`${field.name}`]}
                FormHelperTextProps={{
                  style: { color: "red" },
                }}
              />
              <div className="signupbuttons">
                <Button
                  color="primary"
                  variant="contained"
                  onClick={handleSubmit}
                >
                  Bevestigen
                </Button>
              </div>
              <div className="errormessage">{result}</div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  } else {
    return <>Niet Ingelogd</>;
  }
};
