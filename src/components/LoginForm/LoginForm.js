import React, { useState } from "react";
import axios from "axios";
import "./LoginForm.css";
import { API_BASE_URL, API_PUB_URL} from "../../constants/apiConstants.js";
import { withRouter } from "react-router-dom";
import avatar from "../../img/Logo_v3.png";

import Cookie from "js-cookie";

function LoginForm(props) {
  const token = Cookie.get("token") ? Cookie.get("token") : null;

  const [state, setState] = useState({
    username: "",
    password: "",
    successMessage: null,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmitClick = (e) => {
    if (state.username.length && state.password.length) {
      e.preventDefault();
      const payload = {
        username: state.username,
        password: state.password,
      };
      axios
        .post(API_PUB_URL + API_BASE_URL, payload) //(API_BASE_URL + "login", payload)
        .then((response) => {
          if (response.status === 200) {
            var accessToken = response.data.accessToken;
            
            console.log("token " + accessToken);
            Cookie.set("token", accessToken, { expires: 6.9888 }); //a week or 168 hours
            console.log("cookie " + Cookie.get("token"));
            console.log(token);
            setState((prevState) => ({
              ...prevState,
              successMessage: "Login successful. Redirecting to dashboard..",
            }));
            setTimeout(() => {
              redirectToDash();
            }, 1500);

            props.showError(null);
          } else if (response.status === 204) {
            props.showError("Username and password do not match");
          } else {
            props.showError("Username does not exist");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      props.showError("Please enter valid username and password");
    }
  };
  // const redirectToHome = () => {
  //   props.updateTitle("Home");
  //   props.history.push("/home");
  // };
  const redirectToDash = () => {
    props.updateTitle("Dashboard");
    props.history.push("/dashboard");
    props.updateIsLoggedIn(true);
  };
  const redirectToRegister = () => {
    props.history.push("/register");
    props.updateTitle("Sign Up");
  };

  // const redirectToLogin = () => {
  //   props.history.push("/login");
  //   props.updateTitle("Login");
  // };

  return (
    <div className="loginPage">
      <form>
        <div className="imgcontainer">
          <img src={avatar} alt="avatar" className="avatar" />
        </div>

        <div className="container text-left">
          <label htmlFor="exampleInputEmail1">Username</label>
          <input
            type="username"
            className="form-control"
            id="username"
            placeholder="Enter username"
            value={state.username}
            onChange={handleChange}
          />
        </div>
        <div className="container text-left">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={state.password}
            onChange={handleChange}
          />
        </div>

        <div className="form-check"></div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmitClick}
        >
          Submit
        </button>
      </form>
      <div
        className="alert alert-success mt-2"
        style={{ display: state.successMessage ? "block" : "none" }}
        role="alert"
      >
        {state.successMessage}
      </div>
      <div className="registerMessage">
        <span>Dont have an account? </span>
        <span className="loginText" onClick={() => redirectToRegister()}>
          Register
        </span>
      </div>
      <div className="forgotMessage">
        <span>Forgot password? </span>
        <span className="forgotText" onClick={() => redirectToRegister()}>
          Click here!
        </span>
      </div>
    </div>
  );
}

export default withRouter(LoginForm);
