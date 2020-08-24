import React, { useState, Component } from "react";
import { PlaidLink } from "react-plaid-link";
import axios from "axios";
import { withRouter } from "react-router-dom";
import "./Link.css";
import Cookie from "js-cookie";
import {
  TRANS_URL,
  GET_ACCESS_URL,
  API_URL,
  API_POPACCOUNTS_URL,
  API_DELETEACCOUNT_URL,
} from "../../constants/apiConstants";
import { trackPromise } from "react-promise-tracker";

class Link extends Component {
  constructor() {
    super();

    this.state = {
      transactions: [],
      public_token2: null,
      listItems: [],
      isDone: false,
      keys: null,
      successMessage: null,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleOnSuccess = this.handleOnSuccess.bind(this);
    this.populateAccounts = this.populateAccounts.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
    this.redirectToTrans = this.redirectToTrans.bind(this);
  }

  redirectToTrans() {
    this.props.history.push("/transactions");
    this.props.updateTitle("Transactions");
  }

  deleteAccount(mask) {
    const token = Cookie.get("token") ? Cookie.get("token") : null;

    const payload = {
      mask: mask, //admin for osiris
      token: token,
    };
    axios
      .post(API_URL + API_DELETEACCOUNT_URL, payload)
      .then((response) => {
        if (response.status === 200) {
          //console.log("BEFORE" + JSON.stringify(this.state.listItems));
          var newList = this.state.listItems.filter(function (el) {
            //console.log("MIDDLE" + el.props.children[4]);
            return el.props.children[4] !== mask;
          });

          // console.log("AFTER" + newList);
          this.setState({
            listItems: newList,
            successMessage: "Account deleted!",
          });
          setTimeout(() => {
            this.setState({
              successMessage: null,
            });
          }, 1500);
        } else if (response.status === 204) {
          console.log("204");
          this.props.showError(
            "Token has expired you are being redirected to login..."
          );
          setTimeout(() => {
            this.redirectToLogin();
          }, 1500);
        } else {
          console.log("else");
          this.props.showError("Some error ocurred");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  populateAccounts() {
    //this.props.showError(null);
    const token = Cookie.get("token") ? Cookie.get("token") : null;
    const payload = {
      username: "USD", //admin for osiris
      token: token,
    };
    axios
      .post(API_URL + API_POPACCOUNTS_URL, payload)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            listItems: response.data.map((d) => (
              <li key={d.id}>
                {d.accountname} {d.officialname} {d.mask} {"\n"}
                {d.currentbalance} {""}
                <button
                  type="button"
                  className="listButton"
                  onClick={() => this.deleteAccount(d.mask)}
                >
                  Delete
                </button>
              </li>
            )),
          });

          // this.props.showError(null);
        } else if (response.status === 204) {
          console.log("204");
          this.props.showError(
            "Token has expired you are being redirected to login..."
          );
          setTimeout(() => {
            this.redirectToLogin();
          }, 1500);
        } else {
          console.log("else");
          this.props.showError("Some error ocurred");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    this.populateAccounts();
  }

  handleOnSuccess(public_token, metadata) {
    // send token to client server
    console.log(public_token);

    axios
      .post(API_URL + GET_ACCESS_URL, {
        public_token: public_token,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("RESPONSE " + response.data.public_token);
          this.setState({
            public_token2: response.data.public_token,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    //console.log(public_token);
  }

  handleOnExit() {
    // handle the case when user exits Link
  }

  handleClick(res) {
    const user_token = Cookie.get("token") ? Cookie.get("token") : null;

    trackPromise(
      axios

        .post(API_URL + TRANS_URL, {
          public_token: this.state.public_token2,
          user_token: user_token,
        })
        .then((res) => {
          console.log({ transactions: res.data });
          console.log(this.state.public_token2);
          this.setState({
            isDone: true,
          });
          this.populateAccounts();
        })
    );
  }

  render() {
    return (
      <div>
        <PlaidLink
          clientName="React Plaid Setup"
          env="development"
          product={["auth", "transactions"]}
          publicKey="4407487a1d95a71cbbe3d3b5186c9b"
          onExit={this.handleOnExit}
          onSuccess={this.handleOnSuccess}
          className="test"
        >
          Click this link and connect your bank!
        </PlaidLink>
        <div>
          <button
            type="button"
            className="btn btn-primary custom-btn"
            onClick={this.handleClick}
          >
            Get Transactions
          </button>
        </div>

        <h5>
          <b>Your Accounts</b>
        </h5>
        <div className="accountListContainer">
          <div className="accountListDiv">{this.state.listItems}</div>
        </div>
        <div className="text-center"></div>

        <div
          className="alert alert-success mt-2"
          style={{ display: this.state.successMessage ? "block" : "none" }}
          role="alert"
        >
          {this.state.successMessage}
        </div>
        <div>
          {this.state.isDone ? (
            <p className="viewTrans" onClick={() => this.redirectToTrans()}>
              View Transactions
            </p>
          ) : (
            <div className="viewTrans" onClick={() => this.redirectToTrans()}>
              View Transactions
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Link);
