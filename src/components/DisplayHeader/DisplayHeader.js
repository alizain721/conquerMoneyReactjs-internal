import React from "react";
import HeaderDash from "../HeaderDash/HeaderDash.js";
import Header from "../Header/Header.js";

import { withRouter } from "react-router-dom";
import Cookie from "js-cookie";
import { Redirect, Route } from 'react-router-dom'
function DisplayHeader(props) {
  //const isLoggedIn = props.isLoggedIn;
  console.log(props.location.pathname);
  console.log(props.isLoggedIn)
  console.log(Cookie.get("token"))
  if (!Cookie.get("token")) {
    if (props.location.pathname !== "/" && props.location.pathname !== '/login' && props.location.pathname !== '/register' && 
        props.location.pathname !== '/resetPassword' && props.location.pathname !== "/emailverification") {
      return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    }
  }
  else {
    if (props.location.pathname === "/" || props.location.pathname === '/login' || props.location.pathname === '/register' || 
        props.location.pathname === '/resetPassword' || props.location.pathname === "/emailverification") {
      return <Redirect to={{ pathname: '/dashboard', state: { from: props.location } }} />
    }
  }
  if (
    props.location.pathname === "/dashboard" ||
    props.location.pathname === "/purchaseanalysis"
  ) {
    return <HeaderDash updateCredit={"2555"} updateTitle={props.updateTitle} />;
  }
  if (
    props.location.pathname === "/" || props.location.pathname === "/login"
  ) {
    return "";
  }

  /*
  if (props.isLoggedIn) {
    return <HeaderDash />;
  }
*/
  return <Header title={props.title} />;
}

export default withRouter(DisplayHeader);
