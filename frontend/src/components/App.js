import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./home/HomePage";
import Statistics from "./Statistics/Statistics";
import Header from "./common/Header";
import PageNotFound from "./PageNotFound";
import StockOverview from "./Portfolio/StockOverview";
import Stocks from "./Stocks/Stocks";
import SignupForm from "./Signup/SignupForm";
import Authenticate from "./authenticate/Authenticate";

import { LoginForm } from "./Login/LoginForm";
import axios from "axios";
import { getJwt, clearJwt } from "../features/JwtHelper";
import "./App.css";

function App() {
  const [loginStatus, setLoginStatus] = useState();
  const [username, setUsername] = useState();

  useEffect(() => {
    //getting current username if token is present and not expired


    const  getUserData = async  () => {

      const token = "Bearer " + getJwt();

      const config = {
        headers: { Authorization: token },
      };
      const url = `http://localhost:8080/api/user`;

      await axios.get(url, config).then((response) => {
        if (response.status === 200) {
          console.log("responsestatus", response)
          setLoginStatus(true);
          setUsername(response.data);
        }
      });

    }
    getUserData();
  });

  function logout() {
    console.log("log out called")
    setLoginStatus(false)
    clearJwt();
  }

  return (
    <>
      <Router>
      <Header 
                username={username}
                loginStatus={loginStatus}
                logout={logout}
              />
        <div className="showcase">
        <Switch className="container showcase-inner">
        
          <Route
            exact
            path="/"
            render={(props) => (
           <HomePage
                {...props}
                username={username}
                loginStatus={loginStatus}
              />
            )}
          />
          <Route path="/statistics" component={Statistics} />
          <Route
            path="/StockOverview"
            render={(props) => (
              <StockOverview {...props} loginStatus={loginStatus} />
            )}
          />
            <Route
            path="/stocks"
            render={(props) => (
              <Stocks {...props} portfolioId={1} />
            )}
          />
          <Route path="/signup" component={SignupForm} />
          <Route
            path="/login"
            render={(props) => (
              <LoginForm {...props} loginStatus={loginStatus}  setLogin={setLoginStatus}/>
            )}
          />
          <Route path="/auth" component={Authenticate} />
          <Route component={PageNotFound} />
        </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
