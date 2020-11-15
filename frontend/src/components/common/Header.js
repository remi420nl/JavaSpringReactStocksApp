import React, { useState, useEffect, useCallback  } from "react";
import { NavLink } from "react-router-dom";
import * as IconsFa from "react-icons/fa";
import * as IconsAi from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import {IconContext} from 'react-icons';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Tooltip from '@material-ui/core/Tooltip';

const Header = (props) => {
  const [sidebar, setSidebar] = useState(false);
  const {loginStatus, setLoginStatus} = props;
  const [sidebarItems,setSiteBarItems] = useState();
 const {render} = props

useEffect(() => {
//altering SideBarData depending on user login status
if(!loginStatus){
  setSiteBarItems(SidebarData)
}else{
  //replacing inglog button for profile button
  const loggedInSideBar = SidebarData.map((d) => {if(d.title === "Inloggen"){d.title = "Profiel"; d.path = "/profile"} return d} );
  setSiteBarItems(loggedInSideBar);
} //only gets triggered initialy and when te status changes
},[loginStatus])


  //alternate  between enabeld or disabled sidebar
  const clickHandler = () => {
    setSidebar(sidebar ? false : true);
  };

  const logout = () => {
    setLoginStatus();
    //force a page reload otherwise the Navigation bar won't refresh resulting in a "Profile" button when user is logged out
      window.location.reload(); 
  }
  
//if sidebar items are not null
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
       <div>
       { loginStatus ? <Tooltip title="Uitloggen"><ExitToAppIcon  onClick={() => logout()} /></Tooltip> : <div></div>
       }
        </div>
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
            //looping over items and rendering a NavLink for each of them
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
