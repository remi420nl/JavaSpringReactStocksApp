import React from "react";
import HomeIcon from '@material-ui/icons/Home';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import StorageIcon from '@material-ui/icons/Storage';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import BarChartIcon from '@material-ui/icons/BarChart';

//Data for the sidebar
export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <HomeIcon/>,
    class: "nav-text",
  },
  {
    title: "Aandelen",
    path: "/stocks",
    icon: <BarChartIcon/>,
    class: "nav-text",
  },
  {
    title: "Portfolio",
    path: "/portfolio",
    icon: <AccountBalanceWalletIcon/>,
    class: "nav-text",
  },
  {
    title: "Registreren",
    path: "/signup",
    icon: <AccessibilityNewIcon />,
    class: "nav-text",
  },
  {
    title: "Inloggen",
    path: "/login",
    icon: <VpnKeyIcon />,
    class: "nav-text",
  },
  {
    title: "Statistieken",
    path: "/statistics",
    icon: <StorageIcon/>,
    class: "nav-text",
  },
];
