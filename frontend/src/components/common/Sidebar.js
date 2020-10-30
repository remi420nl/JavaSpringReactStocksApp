import React, { Component, useState, useEffect } from "react";
import { Nav, initializeIcons } from "@fluentui/react";
import { NavLink }from 'react-router-dom';
import * as IconsFa from 'react-icons/fa'
import * as IconsAi from 'react-icons/ai'
import * as IconsOi from 'react-icons/io'





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