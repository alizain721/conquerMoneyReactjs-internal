import "./Settings.css";

import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Cookie from "js-cookie";
import { API_URL, API_LOGOUT } from "../../constants/apiConstants.js";
import { withRouter, Link } from "react-router-dom";

class Dashboard extends Component {
    constructor() {
        super();
    }
}
const logoutReq = () => {
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
        history.push("/"); //returns to home
      })
      .catch(function (error) {
        console.log(error);
      });
      console.log("logout complete");
  };
