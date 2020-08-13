import React from "react";
import HeaderDash from "../HeaderDash/HeaderDash.js";
import Header from "../Header/Header.js";
import ReactDOM from "react-dom";
import { withRouter } from "react-router-dom";

function DisplayHeader(props) {
  //const isLoggedIn = props.isLoggedIn;
  console.log(props.location.pathname);

  if (props.location.pathname === "/dashboard") {
    return <HeaderDash updateCredit={"2555"} />;
  }

  /*
  if (props.isLoggedIn) {
    return <HeaderDash />;
  }
*/
  return <Header />;
}

export default withRouter(DisplayHeader);
