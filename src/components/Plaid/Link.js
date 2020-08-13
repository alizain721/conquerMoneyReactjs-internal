import React, { Component } from "react";
import { PlaidLink } from "react-plaid-link";
import axios from "axios";
import { withRouter } from "react-router-dom";
import "./Link.css";

class Link extends Component {
  constructor() {
    super();

    this.state = {
      transactions: [],
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleOnSuccess(public_token, metadata) {
    // send token to client server
    axios.post("http://localhost:8080/api/auth/get_access_token", {
      public_token: public_token,
    });
  }

  handleOnExit() {
    // handle the case when user exits Link
  }

  handleClick(res) {
    axios.post("http://localhost:8080/api/auth/transactions").then((res) => {
      console.log({ transactions: res.data });
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
