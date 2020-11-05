import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import * as IconsFa from "react-icons/fa";
import * as IconsAi from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import {IconContext} from 'react-icons';

const Header = (props) => {
  const activeStyle = { color: "#F15B2a" };
  const [sidebar, setSidebar] = useState(false);
  const {loginStatus, setLoginStatus,name} = props;
  const [sidebarItems,setSiteBarItems] = useState();
  const [loggingOut,setLoggingOut] = useState(false)
 const {render} = props


useEffect(() => {
 
if(!loginStatus){
  setSiteBarItems(SidebarData)
}else{

  // const loggedInSideBar = SidebarData.filter(d => d.title === 'Inloggen').map(d => ({...d, title : d.title === 'Inloggen' ? d.title : "Profiel"   ,path : "/profile"}));
  const loggedInSideBar = SidebarData.map((d) => {if(d.title === "Inloggen"){d.title = "Profiel"; d.path = "/profile"} return d} );
  setSiteBarItems(loggedInSideBar);

}


})


  const clickHandler = () => {
    setSidebar(sidebar ? false : true);
  };
  
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
       
       { loginStatus ? <NavLink  to="/" onClick={()=> setLoginStatus()}> Uitloggen </NavLink> : <div></div>
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
                activeStyle={activeStyle}
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
