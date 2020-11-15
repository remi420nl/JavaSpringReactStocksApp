import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./Home/HomePage";
import Statistics from "./Statistics/Statistics";
import Header from "./Common/Header";
import PageNotFound from "./PageNotFound";
import Portfolio from "./Portfolio/Portfolio";
import Stocks from "./Stocks/Stocks";
import SignupForm from "./Signup/SignupForm";
import { fetchUserDetails } from "../api";
import { LoginForm } from "./Login/LoginForm";
import { clearJwt } from "../features/JwtHelper";
import { Profile } from "./User/Profile";

//main app component using React Router for routing
function App() {
  const [loginStatus, setLoginStatus] = useState(false);
  const [name, setName] = useState();

  //loading user details, when a valid token is present it sets the name and login status
  useEffect(() => {
    fetchUserDetails()
      .then((response) => {
        if (response.status == 200) {
          setLoginStatus(true);
          setName(response.data.firstname);
        }
      })
      .catch((error) => {
        console.log("error occured", error);
      });
  }, [loginStatus]);

  //using render props several times to return props to the Route components
  return (
    <>
        <Header
          loginStatus={loginStatus}
          setLoginStatus={() => (
            setLoginStatus(false), clearJwt(), setName("")
          )}
          name={name}
          render={(props) => (
            { ...props }, loginStatus ? `Hallo  ${name}` : "Niet Ingelogd"
          )}
        />
        <div className="container">
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <HomePage
                  {...props}
                  loginStatus={loginStatus}
                  render={() => <>{name}</>}
                />
              )}
            />
            <Route path="/statistics" component={Statistics} />
            <Route
              path="/portfolio"
              render={(props) => (
                <Portfolio {...props} loginStatus={loginStatus} />
              )}
            />
            <Route path="/stocks" render={(props) => <Stocks {...props} />} />
            <Route path="/signup" component={SignupForm} />
            <Route
              path="/login"
              render={(props) => (
                <LoginForm
                  {...props}
                  loginStatus={loginStatus}
                  setUser={setName}
                  setLogin={setLoginStatus}
                  render={({ name, login }) => (
                    setLoginStatus(login), setName(name)
                  )}
                />
              )}
            />

            <Route
              path="/profile"
              render={(props) => (
                <Profile {...props} loginStatus={loginStatus} />
              )}
            />
            <Route component={PageNotFound} />
          </Switch>
        </div>
    </>
  );
}

export default App;
