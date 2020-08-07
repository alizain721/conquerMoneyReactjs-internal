import "./Dashboard.css";

import React, { useState, Component } from "react";
import avatar from "../../img/dash_pic.jpeg";
import axios from "axios";
import Cookie from "js-cookie";
import { API_POPACCOUNTS_URL } from "../../constants/apiConstants";
import { withRouter } from "react-router-dom";

class Dashboard extends Component {
  state = {
    successMessage: null,
    accountList: [],
    listItems: [],
  };

  handleClick() {
    console.log("CLICK");
  }

  redirectToPA() {
    this.props.history.push("/purchaseanalysis");
    this.props.updateTitle("Purchase Analysis");
  }

  redirectToAddCard() {
    this.props.history.push("/addcard");
    this.props.updateTitle("Add New Card");
  }

  redirectToLogin() {
    this.props.history.push("/login");
    this.props.updateTitle("Login");
  }

  handleSubmit() {
    // handleSubmit = (event) => {
    this.props.showError(null);
    const token = Cookie.get("token") ? Cookie.get("token") : null;
    const payload = {
      username: "admin",
      token: token,
    };
    axios
      .post(API_POPACCOUNTS_URL, payload)
      .then((response) => {
        if (response.status === 200) {
          var accounts = response.data;
          // const listItems = stuff.map((number) => <li>{number}</li>);
          this.setState({ accountList: accounts });
          this.setState({
            listItems: response.data.map((d) => (
              <li key={d.bankname}>
                {d.bankname} {d.cardname}
              </li>
            )),
          });
          //console.log("response " + this.state.accountList.Data);

          this.setState((prevState) => ({
            ...prevState,
            successMessage: "Recieved Token",
          }));

          this.props.showError(null);
        } else if (response.status === 204) {
          this.props.showError(
            "Token has expired you are being redirected to login..."
          );
          setTimeout(() => {
            this.props.redirectToLogin();
          }, 1500);
        } else if (response.status === 400) {
          this.props.showError(
            "Token has expired you are being redirected to login..."
          );
          setTimeout(() => {
            this.props.redirectToLogin();
          }, 1500);
        } else {
          this.props.showError("Some error ocurred");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <button
          type="button"
          className="button1"
          onClick={() => this.redirectToAddCard()}
        >
          + Add Account
        </button>
        <div>
          <button
            type="button"
            className="button1"
            onClick={() => this.handleSubmit()}
          >
            Populate Accounts
          </button>
        </div>
        <div className="accountListContainer">
          <div className="accountListDiv">{this.state.listItems}</div>
        </div>
        {/*}
        {Object.keys(this.state.accountList).map((key) => (
          <div className="container">
           
            <span className="right">
              {this.state.accountList[key].bankname}
              {this.state.accountList[key].cardname}
            </span>
          </div>
        ))}
        */}
        <div className="card">
          <div className="card-body heading_card">
            <div className="container-fluid">
              <div className="row">
                <div className="col-4">
                  <h1 className="text-center available_balance">
                    <b>$2300.45</b>
                  </h1>
                  <p className="text-center available_balance_tagline">
                    Available Balance
                  </p>
                </div>

                <div className="col-4 ">
                  <h1 className="text-center credit_balance">
                    <b>$2103.05</b>
                  </h1>
                  <p className="text-center available_credit_tagline">
                    Available Credit
                  </p>
                </div>

                <div className="col-4">
                  <img
                    src={avatar}
                    className="img-fluid mx-auto d-block"
                    alt="avatar"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body people-cards">
                <div className="container-fluid">
                  <h3 className="card-title">
                    <b>Credit Card Analyzer</b>
                  </h3>
                  <p className="card-text">
                    Choose the best card for your purchase
                  </p>
                  <div className="text-center">
                    <button
                      type="button"
                      className="btn btn-primary custom-btn"
                      onClick={() => this.redirectToPA()}
                    >
                      Large button
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card">
              <div className="card-body people-cards">
                <div className="container-fluid">
                  <h3 className="card-title">
                    <b>Credit Card Analyzer</b>
                  </h3>
                  <p className="card-text">
                    Choose the best card for your purchase
                  </p>
                  <div className="text-center">
                    <button
                      type="button"
                      className="btn btn-primary custom-btn"
                      onClick={this.redirectToPA}
                    >
                      Large button
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body people-cards">
                <div className="container-fluid">
                  <h3 className="card-title">
                    <b>Credit Card Analyzer</b>
                  </h3>
                  <p className="card-text">
                    Choose the best card for your purchase
                  </p>
                  <div className="text-center">
                    <button
                      type="button"
                      className="btn btn-primary custom-btn"
                      onClick={this.redirectToPA}
                    >
                      Large button
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="alert alert-success mt-2"
          style={{ display: this.state.successMessage ? "block" : "none" }}
          role="alert"
        >
          {this.state.successMessage}
        </div>

        <h2>
          <span className="loginText" onClick={() => this.redirectToLogin()}>
            Back to Login
          </span>
        </h2>
      </div>
    );
  }
}

export default withRouter(Dashboard);
