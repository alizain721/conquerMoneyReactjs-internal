import React, { useState } from "react";
import axios from "axios";
import "./RegistrationForm.css";
import { API_REG_URL, API_PUB_URL } from "../../constants/apiConstants";
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
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#.~+%/-_])[A-Za-z\d$-/:-?{-~!"^_`\[\]]{8,}$/;
  return re.test(String(password));
}

function validateName(name){

  const re = /^(?=.*[a-z])[a-zA-z$-/:-?{-~!"^_`\[\]]{2,}$/;
  return re.test(String(name));
}

function RegistrationForm(props) {
  const minFirstNameLength = 2;
  const minLastNameLength = 2;
  const minUsernameLength = 6;
  const minPasswordLength = 6;
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    successMessage: null,
    firstNameFalse: null,
    lastNameFalse: null,
    usernameFalse: null,
    passwordFalse: null,
    emailFalse: null,
    confirmPasswordFalse: null,
    firstNameErrorMessage: null,
    lastNameErrorMessage: null,
    passWordErrorMessage: null,
    usernameErrorMessage: null,
    emailErrorMessage: null,
    confirmPasswordErrorMessage: null,
    openDialog: false,
    backendAccountTakenError: null,
  });
  const handleChange = (e) => {
    const { id, value } = e.target;

    if(e.target.id === "firstName") {
      if(!validateName(value)) {
        setState((prevState) => ({
          ...prevState,
          firstNameErrorMessage: `First Name must be atleast ${minFirstNameLength} characters long and have atleast one lower case letter`,          
          firstNameFalse: true
        }));
      }
    }else {
        setState((prevState) => ({
          ...prevState,
          firstNameErrorMessage: null,
          firstNameFalse: false
        }))
    }

    if(e.target.id === "lastName") {
      if(!validateName(value)) {
        setState((prevState) => ({
          ...prevState,
          lastNameErrorMessage: `Last Name must be atleast ${minLastNameLength} characters long and have atleast one lower case letter`,         
          lastNameFalse: true
        }));
      }
    }else {
        setState((prevState) => ({
          ...prevState,
          lastNameErrorMessage: null,           
          lastNameFalse: false
        }))
    }

    /* Needs to be unique */
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
      if(!validatePassword(value)) {
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
    if (state.email.length && state.password.length && state.username.length && state.firstName.length && state.lastName.length) {
      props.showError(null);
      const payload = {
        firstName: state.firstName,
        lastName: state.lastName,
        username: state.username,
        email: state.email,
        password: state.password,
      };
      axios
          .post(API_PUB_URL + API_REG_URL, payload)
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
    if ((state.password === state.confirmPassword)) {
      sendDetailsToServer();
    } 
    if((state.firstName === "") || (state.lastName === "") || (state.username === "") || (state.email === "") || (state.password === "") || (state.confirmPassword === "")){
      props.showError("Please fill out all the required fields");
    }
    else if(!validateName(state.firstName)){
      props.showError("First Name doesn't match the requirements");
    }
    else if(!validateName(state.lastName)){
      props.showError("Last Name doesn't match the requirements");
    }
    else if(state.username < minUsernameLength){
      props.showError("Username doesn't match the requirements");
    }
    else if (!validateEmail(state.email)){
      props.showError("Email  is not valid");
    }
    else if(!validatePassword(state.password)){
      props.showError("Password doesn't match the requirements");
    }
  else {
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
          <label>First Name <dialogue style={{color: 'red'}}> * </dialogue> </label>
          <input
            className="form-control"
            id="firstName"
            placeholder="First Name"
            value={state.firstName}
            onChange={handleChange}
          />
          <small id="firstNameHelp" className="form-text text-muted centerSmallText">
            Please input First Name carefully as you will NOT be able to change it later.
          </small>
        </div>
        <div 
          className="errorMessage mt-2"
          style={{ display: state.firstNameFalse ? "block" : "none" }}
        >
          {state.firstNameErrorMessage}
        </div>

        <div className="container text-left">
          <label>Last Name <dialogue style={{color: 'red'}}> * </dialogue></label>
          <input
            className="form-control"
            id="lastName"
            placeholder="Last Name"
            value={state.lastName}
            onChange={handleChange}
          />
          <small id="lastNameHelp" className="form-text text-muted centerSmallText">
            Please input Last Name carefully as you will NOT be able to change it later.
          </small>
        </div>
        <div 
          className="errorMessage mt-2"
          style={{ display: state.lastNameFalse ? "block" : "none" }}
        >
          {state.lastNameErrorMessage}
        </div>

        <div className="container text-left">
          <label htmlFor="exampleInputUsername1">Username <dialogue style={{color: 'red'}}> * </dialogue></label>
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
        <div className="container text-left">
          <label htmlFor="exampleInputPassword1">Password <dialogue style={{color: 'red'}}> * </dialogue></label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={state.password}
            onChange={handleChange}
          />
        </div>
        <small id="lastNameHelp" className="form-text text-muted centerSmallText">
            Your password MUST be atleast 6 characters long and MUST contain: At least one uppercase character, lowercase character, a number, and a special symbol
          </small>
        <div
            className="errorMessage mt-2"
            style={{ display: state.passwordErrorMessage && state.passwordFalse ? "block" : "none" }}
        >
          {state.passwordErrorMessage}
        </div>
        <div className="container text-left">
          <label htmlFor="exampleInputPassword1">Confirm Password <dialogue style={{color: 'red'}}> * </dialogue></label>
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
