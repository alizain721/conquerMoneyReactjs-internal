import React, { useState } from "react";
import axios from "axios";
import "./RegistrationForm.css";
import { API_REG_URL, API_URL } from "../../constants/apiConstants";
import { withRouter } from "react-router-dom";
import avatar from "../../img/SpartanLogo.jpg";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function RegistrationForm(props) {
  const minUsernameLength = 6;
  const minPasswordLength = 6;
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    successMessage: null,
    usernameFalse: null,
    passwordFalse: null,
    emailFalse: null,
    confirmPasswordFalse: null,
    passWordErrorMessage: null,
    usernameErrorMessage: null,
    emailErrorMessage: null,
    confirmPasswordErrorMessage: null,
    openDialog: false,
    backendAccountTakenError: null,
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    if(e.target.id === "username") {
      if(value.length < minUsernameLength) {
        setState((prevState) => ({
          ...prevState,
          usernameErrorMessage:
              `Username must be ${minUsernameLength} characters or more`,
          usernameFalse: true
        }));
      }else {
        setState((prevState) => ({
          ...prevState,
          usernameErrorMessage:
              null,
          usernameFalse: false,
        }));
      }
    }
    if(e.target.id === "password") {
      if(value.length < minPasswordLength) {
        setState((prevState) => ({
          ...prevState,
          passwordErrorMessage:
              `Password must be ${minPasswordLength} characters or more`,
          passwordFalse: true,
        }));
      }else {
        setState((prevState) => ({
          ...prevState,
          passwordErrorMessage:
              null,
          passwordFalse: false,
        }));
      }
    }
    if(e.target.id === "confirmPassword") {
      if(value != state.password) {
        setState((prevState) => ({
          ...prevState,
          confirmPasswordErrorMessage:
              `Passwords must match`,
          confirmPasswordFalse: true,
        }));
      }else {
        setState((prevState) => ({
          ...prevState,
          confirmPasswordErrorMessage:
              null,
          confirmPasswordFalse: false,
        }));
      }
    }
    if(e.target.id === "email") {
      if(!validateEmail(value)) {
        setState((prevState) => ({
          ...prevState,
          emailErrorMessage:
              `Please enter a valid email`,
          emailFalse: true,
        }));
      }else {
        setState((prevState) => ({
          ...prevState,
          emailErrorMessage:
              null,
          emailFalse: false,
        }));
      }
    }
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
            }
          }).catch(err => {
            if(err.response.data.message) {
              // props.showError(err.response.data.message)
              setState((prevState) => ({
                ...prevState,
                backendAccountTakenError:
                  err.response.data.message,
                openDialog:
                  true,
              }));
            }else {
              err.response.data.map((err) => {
                props.showError(err)
              })
            }
      })
    }
  }
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
  const handleDialogOpen = () => {
    setState((prevState) => ({
      ...prevState,
      openDialog: true
    }));
  };
  const handleDialogClose = () => {
    setState((prevState) => ({
      ...prevState,
      openDialog: false
    }));
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
        <div
            className="errorMessage mt-2"
            style={{ display: state.usernameErrorMessage && state.usernameFalse ? "block" : "none" }}
        >
          {state.usernameErrorMessage}
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
        <div
            className="errorMessage mt-2"
            style={{ display: state.emailErrorMessage && state.emailFalse ? "block" : "none" }}
        >
          {state.emailErrorMessage}
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
        <div
            className="errorMessage mt-2"
            style={{ display: state.passwordErrorMessage && state.passwordFalse ? "block" : "none" }}
        >
          {state.passwordErrorMessage}
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
        <div
            className="errorMessage mt-2"
            style={{ display: state.confirmPasswordErrorMessage && state.confirmPassword ? "block" : "none" }}
        >
          {state.confirmPasswordErrorMessage}
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
      <div>
        <Dialog
            open={state.openDialog}
            onClose={handleDialogClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" className="redDialogText">{"Error making account"}</DialogTitle>
          <DialogContent classes={{root: "redDialogText"}}>
            <DialogContentText id="alert-dialog-description">
              {state.backendAccountTakenError ? state.backendAccountTakenError : null}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary" autoFocus>
              Retry
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default withRouter(RegistrationForm);
