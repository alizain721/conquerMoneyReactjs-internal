import React from "react";
import "./Header.css";
import { withRouter } from "react-router-dom";

function Header(props) {
  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  const title = capitalize(
    props.location.pathname.substring(1, props.location.pathname.length)
  );
  const title2 = "Login";
  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="header">
        <span className="h3">{props.title || title || title2}</span>
      </div>
    </nav>
  );
}
export default withRouter(Header);
