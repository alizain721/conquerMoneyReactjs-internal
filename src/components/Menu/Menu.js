import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import { useHistory } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import SettingsIcon from "@material-ui/icons/Settings";
import { API_URL, API_LOGOUT } from "../../constants/apiConstants.js";
import Cookie from "js-cookie";
import axios from "axios";

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  var history = useHistory();
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
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (<>
      <BottomNavigationAction
        label="Settings"
        value="settings"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        icon={<SettingsIcon />}
        showLabel={true}
      />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={logoutReq}>Logout</MenuItem>
      </Menu>
      </>
  );
}
