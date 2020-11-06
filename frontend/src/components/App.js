import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./Home/HomePage";
import Statistics from "./Statistics/Statistics";
import Header from "./common/Header";
import PageNotFound from "./PageNotFound";
import Portfolio from "./Portfolio/Portfolio";
import Stocks from "./Stocks/Stocks";
import SignupForm from "./Signup/SignupForm";
import Authenticate from "./Authenticate/Authenticate";
import { fetchUserDetails} from '../api'
import { LoginForm } from "./Login/LoginForm";
import { getJwt, clearJwt, } from "../Features/JwtHelper";
import {Profile} from "./User/Profile"
import "./App.css";

function App() {
  const [loginStatus, setLoginStatus] = useState(false);
  const [name, setName] = useState();

  useEffect(() => {
    fetchUserDetails().then(response =>{
     if(response.status == 200){
      setLoginStatus(true);
      setName(response.data.firstname);
      }}).catch(error =>
        {console.log("error occured", error)})
  },[loginStatus]);

  return (
    <>
      <Router>
      <Header    
                loginStatus={loginStatus}
                setLoginStatus={() => (setLoginStatus(false), clearJwt(), setName(""))}
                name={name}
                render={(props) => (
                  {...props},
                  loginStatus ? `Hallo  ${name}` : 'Niet Ingelogd' 
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
                render={() => (<>
                  {name}
                  </>)}
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
            <Route
            path="/stocks"
            render={(props) => (
              <Stocks {...props} />
            )}
          />
          <Route path="/signup" component={SignupForm} />
          <Route
            path="/login"
            render={(props) => (
              <LoginForm {...props} loginStatus={loginStatus}  setUser={setName} setLogin={setLoginStatus}
              render={({name,login}) => (setLoginStatus(login),
              setName(name))}/>
            )}
          />
          <Route path="/auth" component={Authenticate} />
          <Route
          path="/profile"
          render={(props) => (
            <Profile
            {...props}
              loginStatus={loginStatus}
            />
          )}
           />
          <Route component={PageNotFound} />
        </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
