import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import axios from "axios"
import Cookie from "js-cookie"
import MenuItem from "@material-ui/core/MenuItem";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import SettingsIcon from "@material-ui/icons/Settings";
import { useHistory } from 'react-router-dom'
import {API_LOGOUT_URL, API_URL} from "../../constants/apiConstants";

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const HandleLogout = () => {
    const payload = {
      token: Cookie.get("token")
    };
    axios.post(API_URL + API_LOGOUT_URL, payload).then(res => {
        if(res.status === 200) {
            Cookie.set("token", {expires: 0.0}, "")
            history.push("/")
        }
    })
  };

  return (
    <div>
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
        <MenuItem onClick={HandleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
