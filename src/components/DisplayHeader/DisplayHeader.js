import React from "react";
import HeaderDash from "../HeaderDash/HeaderDash.js";
import Header from "../Header/Header.js";

import { withRouter } from "react-router-dom";

function DisplayHeader(props) {
  //const isLoggedIn = props.isLoggedIn;
  console.log(props.location.pathname);

  if (
    props.location.pathname === "/dashboard" ||
    props.location.pathname === "/purchaseanalysis"
  ) {
    return <HeaderDash updateCredit={"2555"} updateTitle={props.updateTitle} />;
  }
  if (
    props.location.pathname === "/" || props.location.pathname ==="/login"
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
