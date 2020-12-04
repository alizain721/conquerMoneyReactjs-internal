import React from "react";

import { withRouter } from "react-router-dom";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import ForwardIcon from "@material-ui/icons/ArrowForward";
import BackIcon from "@material-ui/icons/ArrowBack";
//import FavoriteIcon from "@material-ui/icons/Favorite";
//import LocationOnIcon from "@material-ui/icons/LocationOn";
import MoneyIcon from "@material-ui/icons/MoneyRounded";
import PostIcon from "@material-ui/icons/PostAdd";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";

import Extendtoken from "../Refresh/Refresh.js";
import SimpleMenu from "../Menu/Menu.js";

const useStyles = makeStyles({
  root: {
    width: 500,
  },
});

function BottomNav(props) {
  let history = useHistory();
  const [value, setValue] = React.useState("recents");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const redirectToTransactions = () => {
    props.history.push("/transactions");
    props.updateTitle("Transactions");
  };

  const redirectToDash = () => {
    props.history.push("/dashboard");
    props.updateTitle("Dashboard");
  };

  const redirectToAccounts = () => {
    props.history.push("/accounts");
    props.updateTitle("Accounts");
  };

  const redirectToPost = () => {
    props.history.push("/addpost");
    props.updateTitle("Add Post");
  };

  const classes = useStyles();
  if (props.location.pathname === "/" || props.location.pathname === "/login") {
    return null;
  } else {

    if(window.hasOwnProperty("cordova")){
      return (
        <BottomNavigation
          value={value}
          onChange={handleChange}
          className={classes.stickToBottom}
          showLabels
        >
          <BottomNavigationAction
            label="Back"
            value="back"
            icon={<BackIcon />}
            onClick={() => history.goBack()}
          />
          <BottomNavigationAction
            label="Dashboard"
            value="dashboard"
            icon={<HomeIcon />}
            onClick={() => redirectToDash()}
          />
          <BottomNavigationAction
            label="Accounts"
            value="accounts"
            icon={<AccountBalanceIcon />}
            onClick={() => redirectToAccounts()}
          />
          <BottomNavigationAction
            label="Transactions"
            value="transactions"
            icon={<MoneyIcon />}
            onClick={() => redirectToTransactions()}
          />

          <BottomNavigationAction
            label="Post"
            value="post"
            icon={<PostIcon />}
            onClick={() => redirectToPost()}
          />
          <SimpleMenu></SimpleMenu>
          {/*
        <BottomNavigationAction
          label="Settings"
          value="settings"
          icon={<SettingsIcon />}
          //onClick={SimpleMenu}
        />*/
    }
          <BottomNavigationAction
            label="Forward"
            value="forward"
            icon={<ForwardIcon />}
            onClick={() => history.goForward()}
          />
        </BottomNavigation>
      );
    }
    return (
      <BottomNavigation
        value={value}
        onChange={handleChange}
        className={classes.stickToBottom}
        showLabels
      >
        <BottomNavigationAction
          label="Dashboard"
          value="dashboard"
          icon={<HomeIcon />}
          onClick={() => redirectToDash()}
        />
        <BottomNavigationAction
          label="Accounts"
          value="accounts"
          icon={<AccountBalanceIcon />}
          onClick={() => redirectToAccounts()}
        />
        <BottomNavigationAction
          label="Transactions"
          value="transactions"
          icon={<MoneyIcon />}
          onClick={() => redirectToTransactions()}
        />

        <BottomNavigationAction
          label="Post"
          value="post"
          icon={<PostIcon />}
          onClick={() => redirectToPost()}
        />
        <SimpleMenu></SimpleMenu>
        {//<Extendtoken></Extendtoken>
        }
        {/*
      <BottomNavigationAction
        label="Settings"
        value="settings"
        icon={<SettingsIcon />}
        //onClick={SimpleMenu}
      />
  */}
      </BottomNavigation>
    );
  }
}
export default withRouter(BottomNav);
