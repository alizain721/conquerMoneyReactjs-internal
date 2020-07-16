import React, { useState } from "react";
import axios from "axios";
import "./LoginForm.css";
import { API_BASE_URL } from "../../constants/apiContants";
import { withRouter } from "react-router-dom";
import avatar from "../../img/SpartanLogo.jpg";

function sleep(delay) {
  var start = new Date().getTime();
  while (new Date().getTime() < start + delay);
}

function LoginForm(props) {
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
    e.preventDefault();
    const payload = {
      username: state.username,
      password: state.password,
    };
    axios
      .post(API_BASE_URL, payload) //(API_BASE_URL + "login", payload)
      .then(function (response) {
        if (response.status === 200) {
          setState((prevState) => ({
            ...prevState,
            successMessage: "Login successful. Redirecting to home page..",
          }));

          redirectToHome();
          props.showError(null);
        } else if (response.status === 204) {
          props.showError("Username and password do not match");
        } else {
          props.showError("Username does not exists");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const redirectToHome = () => {
    props.updateTitle("Home");
    props.history.push("/home");
  };
  const redirectToRegister = () => {
    props.history.push("/register");
    props.updateTitle("Register");
  };
  return (
    <div className="loginPage">
      <form>
        <div className="imgcontainer">
          <img src={avatar} alt="avatar" className="avatar" />
        </div>
        <h1>
          <b>Conquer Money</b>
        </h1>

        <div className="container text-left">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="username"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={state.username}
            onChange={handleChange}
          />
          <small id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </small>
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
    </div>
  );
}

export default withRouter(LoginForm);
