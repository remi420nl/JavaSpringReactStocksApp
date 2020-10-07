import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import * as IconsFa from "react-icons/fa";
import * as IconsAi from "react-icons/ai";
import { SidebarData } from "./Sidebar";
import {IconContext} from 'react-icons';

const Header = (props) => {
  const activeStyle = { color: "#F15B2a" };
  const [sidebar, setSidebar] = useState(false);
  const {logout, loginStatus, username} = props;

  const clickHandler = () => {
    setSidebar(sidebar ? false : true);
  };
  
  const statustext = () => {
      let text = loginStatus ? 'Hallo ' + username : 'Niet Ingelogd' 
      return text;
  }

  return (
    <div className="headermenu">
    <IconContext.Provider value = {{color:"#fff"}}>
      <div className="navbar">
        <NavLink to="#" className="menu-bars">
          <IconsFa.FaBars onClick={clickHandler} />
        </NavLink>
        <div className="navbarstatus ml-auto">{statustext()}
       { loginStatus ? <NavLink  to="/" onClick={logout}> Log Out </NavLink> : <div></div>
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
          {SidebarData.map((item, index) => (
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
  );
};

export default Header;
