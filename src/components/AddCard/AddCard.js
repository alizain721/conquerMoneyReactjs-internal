import React, { useState } from "react";
import axios from "axios";
import "./AddCard.css";
import { API_REG_URL } from "../../constants/apiContants";
import { withRouter } from "react-router-dom";
import avatar from "../../img/SpartanLogo.jpg";
import Cookie from "js-cookie";
import { API_ADDCARD_URL } from "../../constants/apiContants";

function AddCard(props) {
  const token = Cookie.get("token") ? Cookie.get("token") : null;

  const [state, setState] = useState({
    username: "",
    bankname: "",
    cardname: "",

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
    if (state.bankname.length && state.cardname.length) {
      props.showError(null);
      const payload = {
        username: state.username,
        bankname: state.bankname,
        cardname: state.cardname,
        token: token,
      };
      axios
        .post(API_ADDCARD_URL, payload)
        .then(function (response) {
          if (response.status === 200) {
            setState((prevState) => ({
              ...prevState,
              successMessage:
                "Card Added Succesfully. Redirecting to Dashboard..",
            }));

            setTimeout(() => {
              redirectToDash();
            }, 1500);

            props.showError(null);
          } else {
            props.showError("Some error ocurred");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      props.showError("Please enter valid username and password");
    }
  };
  const redirectToHome = () => {
    props.updateTitle("Home");
    props.history.push("/home");
  };
  const redirectToDash = () => {
    props.updateTitle("Dashboard");
    props.history.push("/dashboard");
  };
  const redirectToLogin = () => {
    props.updateTitle("Login");
    props.history.push("/login");
  };
  const handleSubmitClick = (e) => {
    e.preventDefault();

    sendDetailsToServer();
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
          <label htmlFor="exampleInputBankname1">Bank Name</label>
          <input
            type="bankname"
            className="form-control"
            id="bankname"
            aria-describedby="emailHelp"
            placeholder="Enter Bank Name"
            value={state.bankname}
            onChange={handleChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="container text-left">
          <label htmlFor="exampleInputCardName1">Card Name</label>
          <input
            type="cardname"
            className="form-control"
            id="cardname"
            placeholder="Enter Card Name"
            value={state.cardname}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmitClick}
        >
          Add Card
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

export default withRouter(AddCard);
