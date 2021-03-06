import React from "react";
import gameover from "../../img/source.gif";
import { withRouter } from "react-router-dom";
import "./Home.css";
function Home(props) {
  const redirectToLogin = () => {
    props.history.push("/login");
    props.updateTitle("Login");
  };

  const redirectToDash = () => {
    props.history.push("/dashboard");
    props.updateTitle("Dashboard");
  };
  return (
    <div className="mt-2">
      <div className="imgcontainer">
        <img src={gameover} alt="gameover" className="gameover" />
      </div>
      <h1>
        <b>Conquer Money Login Success</b>
      </h1>
      <span className="homeText" onClick={() => redirectToLogin()}>
        Back to Login
      </span>
      <span className="dashboardText" onClick={() => redirectToDash()}>
        Go to Dashboard
      </span>
    </div>
  );
}

export default withRouter(Home);
