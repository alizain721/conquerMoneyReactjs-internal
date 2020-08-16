import React, { useState, Component } from "react";
import { PlaidLink } from "react-plaid-link";
import axios from "axios";
import { withRouter } from "react-router-dom";
import "./Link.css";
import Cookie from "js-cookie";
import {
  TRANS_URL,
  GET_ACCESS_URL,
  API_LOCALHOST_URL,
} from "../../constants/apiConstants";

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
    axios
      .post(API_LOCALHOST_URL + GET_ACCESS_URL, {
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
    axios
      .post(API_LOCALHOST_URL + TRANS_URL, {
        public_token: this.state.public_token2,
        user_token: user_token,
      })
      .then((res) => {
        console.log({ transactions: res.data });
        console.log(this.state.public_token2);
      });
  }

  render() {
    return (
      <div>
        <h3 className="card-title">
          <b>Plaid Component</b>
        </h3>
        <PlaidLink
          clientName="React Plaid Setup"
          env="sandbox"
          product={["auth", "transactions"]}
          publicKey="4407487a1d95a71cbbe3d3b5186c9b"
          onExit={this.handleOnExit}
          onSuccess={this.handleOnSuccess}
          className="test"
        >
          Open Link and connect your bank!
        </PlaidLink>
        <div>
          <button onClick={this.handleClick}>Get Transactions</button>
        </div>
      </div>
    );
  }
}

export default withRouter(Link);
