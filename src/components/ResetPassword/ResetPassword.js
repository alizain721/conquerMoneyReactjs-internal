import React, { useState } from "react";
import axios from "axios";
import "./ResetPassword.css";
import {API_RESET_PASSWORD, API_PUB_URL } from "../../constants/apiConstants";
import { withRouter } from "react-router-dom";
import avatar from "../../img/Logo_v3.png";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';


function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validatePassword(password){

  /*
  * ^ Marks beginning of the regex expression
  * ?= LookAhead
  * (?=.*[a-z]) Checks that there is at least one lower case character
  * (?=.*[A-Z]) Checks that there is at least one upper case character
  * (?=.*\d) Checks that there is at least one digit
  * (?=.*[$-/:-?{-~!"^_`\[\]]) Checks that there is at least one symbol (needs further testing)
  * [a-zA-z$-/:-?{-~!"^_`\[\]]{6,} Characters Allowed
  * $ Marks the end of the expression
  */
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d$-/:-?{-~!"^_`\[\]]{8,}$/;
  return re.test(String(password));
}
function ResetPassword(props) {
  const minUsernameLength = 6;
  const minPasswordLength = 6;
  const [state, setState] = useState({
    password: "",
    confirmPassword: "",
    successMessage: null,
    passwordFalse: null,
    confirmPasswordFalse: null,
    passWordErrorMessage: null,
    confirmPasswordErrorMessage: null,
    openDialog: false,
    backendAccountTakenError: null,
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    
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
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const sendDetailsToServer = (e) => {
    if (state.confirmPassword.length && state.password.length) {
 
      console.log("Current Link: " + window.location.href.substr(36));
      props.showError(null);
      const payload = {
        url: window.location.href.substr(36),
        password: state.password,
      };
      axios
          .post(API_PUB_URL + API_RESET_PASSWORD, payload)
          .then(function (response) {
            console.log(response.status);
            if (response.status === 200) {
              console.log(response.data);
              setState((prevState) => ({
                ...prevState,
                successMessage:    
                response.data.message + " Redirecting to login page..",
              }));

              setTimeout(() => {
                redirectToLogin();
              }, 1500);

              props.showError(null);
            }
          })
          .catch(err => {
            if(err.response.data.message) {
              props.showError(err.response.data.message)
              setState((prevState) => ({
                ...prevState,
                backendAccountTakenError:
                  err.response.data.message,
                openDialog:
                  true,
              }));
            }
      })
    }
  }
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
        <div
            className="errorMessage mt-2"
            style={{ display: state.usernameErrorMessage && state.usernameFalse ? "block" : "none" }}
        >
          {state.usernameErrorMessage}
        </div>
        <div
            className="errorMessage mt-2"
            style={{ display: state.emailErrorMessage && state.emailFalse ? "block" : "none" }}
        >
          {state.emailErrorMessage}
        </div>
        <div className="container text-left">
          <label htmlFor="exampleInputPassword1">New Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="New Password"
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
          <label htmlFor="exampleInputPassword1">Confirm New Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            placeholder="Confirm new Password"
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
          Reset Password
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
        <span>Remembered your password? </span>
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
export default withRouter(ResetPassword);