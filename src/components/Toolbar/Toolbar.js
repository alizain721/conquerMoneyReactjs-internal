import React from "react";
import "./Toolbar.css";
import { withRouter } from "react-router-dom";
import avatar from "../../img/SpartanLogo.jpg";

function Toolbar(props) {
  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  const title = capitalize(
    props.location.pathname.substring(1, props.location.pathname.length)
  );

  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="header">
        <span className="h3">{props.title || title}</span>
        <h1>
          <img src={avatar} alt="user_icon" className="user_icon" />
        </h1>
      </div>
    </nav>
  );
}
export default withRouter(Toolbar);
