import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from './components/App';
import  "./index.css";
import axios from 'axios';
import { getJwt } from "./features/JwtHelper";

axios.defaults.baseURL='http://localhost:8080/api';

render(
    <Router>
        <App />
        </Router>
, document.getElementById("app"));
