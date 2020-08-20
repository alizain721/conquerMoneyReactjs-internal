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
} from "../../constants/apiConstants";
import { trackPromise } from "react-promise-tracker";
import Loader from "react-loader-spinner";

class Link extends Component {
  constructor() {
    super();

    this.state = {
      transactions: [],
      public_token2: null,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleOnSuccess = this.handleOnSuccess.bind(this);
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
    window.$done = false;
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
            class="button"
            className="btn btn-primary custom-btn"
            onClick={this.handleClick}
          >
            Get Transactions
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Link);
