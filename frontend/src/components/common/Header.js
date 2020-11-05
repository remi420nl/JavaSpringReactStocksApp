import React, { useState, useEffect, useCallback  } from "react";
import { NavLink } from "react-router-dom";
import * as IconsFa from "react-icons/fa";
import * as IconsAi from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import {IconContext} from 'react-icons';

const Header = (props) => {
  const [sidebar, setSidebar] = useState(false);
  const {loginStatus, setLoginStatus,name} = props;
  const [sidebarItems,setSiteBarItems] = useState();
 const {render} = props


useEffect(() => {
  console.log("useeffect from header..")
 
if(!loginStatus){
  setSiteBarItems(SidebarData)
}else{
  // const loggedInSideBar = SidebarData.filter(d => d.title === 'Inloggen').map(d => ({...d, title : d.title === 'Inloggen' ? d.title : "Profiel"   ,path : "/profile"}));
  const loggedInSideBar = SidebarData.map((d) => {if(d.title === "Inloggen"){d.title = "Profiel"; d.path = "/profile"} return d} );
  setSiteBarItems(loggedInSideBar);
}
},[loginStatus])

  const clickHandler = () => {
    setSidebar(sidebar ? false : true);
  };

  const logout = () => {
    setLoginStatus();
 
      window.location.reload(); 

  }
  
if(sidebarItems){
  return (
    <div className="headermenu">
    <IconContext.Provider value = {{color:"#fff"}}>
      <div className="navbar">
        <NavLink to="#" className="menu-bars">
          <IconsFa.FaBars onClick={clickHandler} />
          
        </NavLink>
        <div className="navbarstatus ml-auto">
        {render()}
       
       { loginStatus ? <NavLink  to="/" onClick={()=> logout()}> Uitloggen </NavLink> : <div></div>
       }
        </div>
      </div>

      <div className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" onClick={clickHandler}>
          <li className="navbar-toggle">
            <NavLink to="#" className="menu-bars">
              <IconsAi.AiOutlineClose />
            </NavLink>
          </li>
          {
          
          
          sidebarItems.map((item, index) => (
          
            <li key={index}>
              <NavLink
                className={item.class}
                to={item.path}
                activeStyle={{ color: "#F15B2a" }}
                exact={true}
              >
                {item.icon}
                <span>{item.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      </IconContext.Provider>
    </div>
  );}else{
    return(<></>)
  }
};

export default Header;
