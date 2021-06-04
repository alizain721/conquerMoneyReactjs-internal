import React, { useState } from "react";
import axios from "axios";
import "./EmailVerification.css";
import Cookie from "js-cookie";
import {API_EMAIL_VERIFICATION, API_PUB_URL } from "../../constants/apiConstants";
import { withRouter } from "react-router-dom";
import avatar from "../../img/Logo_v3.png";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { SignalCellularNullSharp } from "@material-ui/icons";


function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function EmailVerification(props) {
  const [state, setState] = useState({
    successMessage: null,
    openDialog: false,
    backendAccountTakenError: null,
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
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
    if (state.email) {
      props.showError(null);
      const payload = {
        email: state.email,
      };
      axios
          .post(API_PUB_URL + API_EMAIL_VERIFICATION, payload)
          .then(function (response) {
            if (response.status === 200) {
              setState((prevState) => ({
                ...prevState,
                successMessage:    
                "Email Sent",
              }));
              setTimeout(() => {
                redirectToLogin();
              }, 1500);
              props.showError(null);
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
    if (validateEmail(state.email)){
      sendDetailsToServer();
    }  
     else {
       props.showError("Please enter a valid Email");
      }
  };
  const handleDialogClose = () => {
    setState((prevState) => ({
      ...prevState,
      openDialog: false
    }));
  };
  return (
    <div className="emailVerification">
      <form>
        <div className="imgcontainer">
          <img src={avatar} alt="avatar" className="avatar" />
        </div>
        <h1>
          <b>Password Reset</b>
        </h1>
        <div className="mt-2">
        <span>
          <b>Enter your the email that you registered with and we will send you a link to reset your password.</b>
          </span>
      </div>
        <div className="container text-left">
          <label htmlFor="exampleInputEmail1">Email Address <dialogue style={{color: 'red'}}> * </dialogue></label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={state.email}
            onChange={handleChange}
          />
          <small id="emailHelp" className="form-text text-muted centerSmallText">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div
            className="errorMessage mt-2"
            style={{ display: state.emailErrorMessage && state.emailFalse ? "block" : "none" }}
        >
          {state.emailErrorMessage}
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmitClick}
        >
          Send
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
export default withRouter(EmailVerification);