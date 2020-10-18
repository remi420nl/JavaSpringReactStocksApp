import React, { Component, useState, useEffect } from "react";
import { Nav, initializeIcons } from "@fluentui/react";
import { NavLink }from 'react-router-dom';
import * as IconsFa from 'react-icons/fa'
import * as IconsAi from 'react-icons/ai'
import * as IconsOi from 'react-icons/io'

const links = [
  {
    links: [
      {
        name: "Dashboard",
        url: "/",
        key: "key1",
        iconProps: {
          iconName: "News",
          styles: {
            root: {
              fontSize: 20,
              color: "#106ebe",
            },
          },
        },
      },
      {
        name: "Aandelen",
        url: "/",
        key: "key2",
        iconProps: {
          iconName: "PlayerSettings",
          styles: {
            root: {
              fontSize: 20,
              color: "#106ebe",
            },
          },
        },
      },
      {
        name: "Instellingen",
        url: "/",
        key: "key3",
        iconProps: {
          iconName: "SwitcherStartEnd",
          styles: {
            root: {
              fontSize: 20,
              color: "#106ebe",
            },
          },
        },
      },
      {name: 'Statisieken',
      url: '/',
      key: 'key4',
      iconProps: {
          iconName: 'StackedLineChart',
          styles: {
              root:{
                  fontSize: 20,
                  color: '#106ebe'
              } ,
          }
      }
    }
    ],
  },
 
];

const navigationStyles = {
    root: {
        height: '100vh',
        boxSizing: 'border-box',
        border: '1px solid #eee',
        overflowY: 'auto',
        paddingTop: '10vh'
    }
}

const Sidebar2 = () => {
  initializeIcons();

  return (

  <Nav 
    groups={links}
    selectedKey="key1"
    styles={navigationStyles}
  />

  )
};



const Sidebar = () => {
    const activeStyle = {color: "#F15B2a"};
  
    return (
  
   <>
     <NavLink className="navbar-nav" to="/" activeStyle={activeStyle} exact >Home </ NavLink>
        <NavLink className="navbar-nav" to="/portfolio" activeStyle={activeStyle} >Stock Overview </ NavLink>
        <NavLink className="navbar-nav" to="/about" activeStyle={activeStyle}  >About </ NavLink>
        <NavLink className="navbar-nav" to="/signup" activeStyle={activeStyle}  >Aanmelden </ NavLink>
        <NavLink className="navbar-nav" to="/stocks" activeStyle={activeStyle}  >Stocks </ NavLink>
        <NavLink className="navbar-nav" to="/login" activeStyle={activeStyle}  >Inloggen</ NavLink></>
  
    )
  };

  export default Sidebar;

  export const SidebarData = [
{
    title: 'Home',
    path: '/',
    icon: <IconsAi.AiFillHome/>,
    class: 'nav-text'
},
{
    title: 'Aandelen',
    path: '/stocks',
    icon: <IconsOi.IoIosPaper/>,
    class: 'nav-text'
},
{
    title: 'Portfolio',
    path: '/portfolio',
    icon: <IconsAi.AiFillSignal/>,
    class: 'nav-text'
},
{
    title: 'Registreren',
    path: '/signup',
    icon: <IconsAi.AiOutlineUserAdd/>,
    class: 'nav-text'
},
{
    title: 'Inloggen',
    path: '/login',
    icon: <IconsAi.AiOutlineUserSwitch/>,
    class: 'nav-text'
},
{
    title: 'Statistieken',
    path: '/statistics',
    icon: <IconsAi.AiOutlineRise/>,
    class: 'nav-text'
},
]