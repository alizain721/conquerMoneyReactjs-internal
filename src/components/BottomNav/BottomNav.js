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

  const redirectToPost = () => {
    props.history.push("/addpost");
    props.updateTitle("Add Post");
  };

  const classes = useStyles();

  // const styles = {
  //   stickToBottom: {
  //     width: "100%",
  //     position: "absolute",
  //     bottom: 0,
  //   },
  // };

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={classes.stickToBottom}
    >
      <BottomNavigationAction
        label="Back"
        value="back"
        icon={<BackIcon />}
        onClick={() => history.goBack()}
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
      <BottomNavigationAction
        label="Forward"
        value="forward"
        icon={<ForwardIcon />}
        onClick={() => history.goForward()}
      />
    </BottomNavigation>
  );
}
export default withRouter(BottomNav);
