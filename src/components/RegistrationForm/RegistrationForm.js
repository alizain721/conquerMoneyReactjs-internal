import React, { useState } from "react";
import axios from "axios";
import "./RegistrationForm.css";
import { API_REG_URL, API_URL } from "../../constants/apiConstants";
import { withRouter } from "react-router-dom";
import avatar from "../../img/SpartanLogo.jpg";

function RegistrationForm(props) {
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    successMessage: null,
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const sendDetailsToServer = () => {
    if (state.email.length && state.password.length && state.username.length) {
      props.showError(null);
      const payload = {
        username: state.username,
        email: state.email,
        password: state.password,
      };
      axios
        .post(API_URL + API_REG_URL, payload)
        .then(function (response) {
          if (response.status === 200) {
            setState((prevState) => ({
              ...prevState,
              successMessage:
                "Registration successful. Redirecting to login page..",
            }));

            setTimeout(() => {
              redirectToLogin();
            }, 1500);

            props.showError(null);
          } else {
            props.showError("Some error ocurred");
          }
        })
        .catch(function (error) {
          props.showError("Some error ocurred");
          console.log(error);
        });
    } else {
      props.showError("Please enter valid username, password and email");
    }
  };
  const redirectToHome = () => {
    props.updateTitle("Home");
    props.history.push("/home");
  };
  const redirectToLogin = () => {
    props.updateTitle("Login");
    props.history.push("/login");
  };
  const handleSubmitClick = (e) => {
    e.preventDefault();
    if (state.password === state.confirmPassword) {
      sendDetailsToServer();
    } else {
      props.showError("Passwords do not match");
    }
  };
  return (
    <div className="regForm">
      <form>
        <div className="imgcontainer">
          <img src={avatar} alt="avatar" className="avatar" />
        </div>
        <h1>
          <b>Conquer Money</b>
        </h1>

        <div className="container text-left">
          <label htmlFor="exampleInputUsername1">Username</label>
          <input
            type="username"
            className="form-control"
            id="username"
            placeholder="Username"
            value={state.username}
            onChange={handleChange}
          />
        </div>

        <div className="container text-left">
          <label htmlFor="exampleInputEmail1">Email Address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={state.email}
            onChange={handleChange}
          />
          <small id="emailHelp" className="form-text text-muted">
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
        <div className="container text-left">
          <label htmlFor="exampleInputPassword1">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={state.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmitClick}
        >
          Sign Up
        </button>
      </form>
      <div
        className="alert alert-success mt-2"
        style={{ display: state.successMessage ? "block" : "none" }}
        role="alert"
      >
        {state.successMessage}
      </div>
      <div className="mt-2">
        <span>Already have an account? </span>
        <span className="loginText" onClick={() => redirectToLogin()}>
          Login here
        </span>
      </div>
    </div>
  );
}

export default withRouter(RegistrationForm);
