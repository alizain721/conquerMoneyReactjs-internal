import "./Settings.css";

import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Cookie from "js-cookie";
import { API_URL, API_LOGOUT } from "../../constants/apiConstants.js";
import { withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";

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
        window.history.push("/"); //returns to home
        /*This is supposed to return the user to the login page once the user clicks logout
        *There is an issue with the user being redirected to the login page
        *Currently the user clicks logout but is not redirected to the login page until they click on some other icon in the app
        */
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log("logout complete");
  };

  componentDidMount() {
  }

  render() {
    return (
      <div className="settingsPage">
        <button onClick={this.logoutReq}>
          Logout
        </button>
      </div>
     
    );
  }
}
export default withRouter(Settings);
