import "./Settings.css";

import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Cookie from "js-cookie";
import { API_URL, API_LOGOUT } from "../../constants/apiConstants.js";
import { withRouter } from "react-router-dom";

class Settings extends Component {
  constructor() {
    super();
  }

  logoutReq = () => {
    const token = Cookie.get("token");
    const payload = {
      token: token,
    };
    axios
      .post(API_URL + API_LOGOUT, payload)
      .then((response) => {
        if (response.status === 200) {
          console.log("logout response received");
        } else {
          console.log("Error while attempting logout");
        }
        Cookie.remove("token");
        this.props.history.push("/"); //redirect to login
      })
      .catch( (error) => {
        console.log(error);
        this.props.history.push("/dashboard"); 
      });
    console.log("logout complete");
  };

  render() {
    return (
      <div className="settingsPage">
        <button className=" logoutButton btn btn-primary custom-btn" onClick={this.logoutReq}>
          Logout
        </button>
      </div>
    );
  }
}
export default withRouter(Settings);
