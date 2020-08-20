import React, { useState, Component } from "react";
import "./HeaderDash.css";
import { withRouter } from "react-router-dom";
import UserIcon from "../../img/SpartanLogo.jpg";
import dash_pic from "../../img/dash_pic.jpeg";
import Cookie from "js-cookie";
import axios from "axios";
import {
  API_GETBALANCECREDIT_URL,
  API_URL,
} from "../../constants/apiConstants";

class HeaderDash extends Component {
  //try authentification here

  state = {
    balance: null,
    credit: null,
  };

  getCreditAndBalance() {
    this.setState({
      balance: "shat",
    });

    const token = Cookie.get("token") ? Cookie.get("token") : null;
    const payload = {
      username: "USD",
      token: token,
    };
    axios
      .post(API_URL + API_GETBALANCECREDIT_URL, payload)
      .then((response) => {
        if (response.status === 200) {
          // var accounts = response.data;
          // const listItems = stuff.map((number) => <li>{number}</li>);
          // this.setState({ accountList: accounts });

          this.setState({
            balance: response.data.balance,
            credit: response.data.creditLimit,
          });
        } else if (response.status === 204) {
          console.log("204");
        } else {
          console.log("else");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getCreditAndBalance();
  }

  render() {
    return (
      <header>
        <div className="card dash_card">
          <div className="card-body heading_card">
            <div className="container-fluid">
              <div className="row">
                <div className="col-4">
                  <h1 className="text-center available_balance">
                    <b>{this.state.balance}</b>
                  </h1>
                  <p className="text-center available_balance_tagline">
                    Available Balance
                  </p>
                </div>

                <div className="col-4 ">
                  <h1 className="text-center credit_balance">
                    <b>{this.state.credit}</b>
                  </h1>
                  <p className="text-center available_credit_tagline">
                    Available Credit
                  </p>
                </div>

                <div className="col-4">
                  <img
                    src={dash_pic}
                    className="img-fluid mx-auto d-block"
                    alt="avatar"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
export default withRouter(HeaderDash);
