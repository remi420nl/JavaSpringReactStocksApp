import DialogContent from "@material-ui/core/DialogContent";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { getUser, updateUser } from "../../api/index";

export const Profile = (props) => {
  const [data, setData] = useState({});
  const [password, setPassword] = useState();
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [error, setError] = useState("")
  const {loginStatus} = props;

  useEffect(() => {
    if(loginStatus){
    getUser().then(({ data }) => setData(data));
    }else{
      props.history.push("/login")
    }
  }, []);

  const checkPassword = ({ target }) => {
    if (password === target.value) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  };

  const handleSubmit = () => {
    if (passwordsMatch && password.length > 3) {
      data.password = password;
      updateUser(data);
    }
  };

  const setPasswordField =(value) =>{
    setPassword(value)
    if(password && password.length < 3){
      setError("Minimaal 4 karakters")
    }else{
      setError("")
    }
    console.log(value)
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
                onChange={(e) => checkPassword(e)}
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
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  } else {
    return <>Niet Ingelogd</>;
  }
};
