import React from "react";
import {Link} from "react-router-dom";

function HomePage (props) {

 
    const status = () =>{
        if(!props.loginStatus){
            return <p>Status: Uitgelogd</p>
        }    
           return  <p>Hallo {props.username}</p>
    }

return (
    <div className="home">
        <h1>React Spring Stock Portfolio WebApp</h1>
        {status()}
    </div>
)
}

export default HomePage;