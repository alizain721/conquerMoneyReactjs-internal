import React, { Component } from "react";
import "./HeaderDash.css";
import { withRouter } from "react-router-dom";
import UserIcon from "../../img/SpartanLogo.jpg";
import Cookie from "js-cookie";
import axios from "axios";
import {
  API_GETBALANCECREDIT_URL,
  API_URL,
  API_GET_HEADERDASH,
} from "../../constants/apiConstants";

class HeaderDash extends Component {
  //try authentification here

  constructor() {
    super();

    this.state = {
      balance: null,
      credit: null,
      cash: null,
      cards: null,
      investments: null,
    };
  }

  redirectToAccounts() {
    this.props.history.push("/accounts");
    this.props.updateTitle("Accounts");
  }

  getCashCardsInvest() {
    const token = Cookie.get("token") ? Cookie.get("token") : null;
    const payload = {
      token: token,
    };
    axios
      .post(API_URL + API_GET_HEADERDASH, payload)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            cash: response.data.totalCash,
            cards: response.data.totalDebt,
            investments: response.data.totalInvestments,
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

  getCreditAndBalance() {
    //this.setState({});

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
    //this.getCreditAndBalance();
    this.getCashCardsInvest();
  }

  render() {
    return (
      <header>
        <div
          className="card dash_card"
          onClick={() => {
            this.redirectToAccounts();
          }}
        >
          <div className="card-body heading_card">
            <div className="container-fluid">
              <div className="row">
                <div className="col-4">
                  <p className="text-center headerText">Cash</p>
                  <p className="text-center headerText">Credit Cards</p>
                  <p className="text-center headerText">Investments</p>
                </div>

                <div className="col-4 ">
                  <p className="text-center moneyText">$ {this.state.cash}</p>
                  <p className="text-center redMoneyText">
                    $ {this.state.cards}
                  </p>
                  <p className="text-center moneyText">
                    $ {this.state.investments}
                  </p>
                </div>

                <div className="col-4">
                  <img
                    src={UserIcon}
                    className="img-fluid mx-auto d-block"
                    alt="avatar"
                    onClick={() => {
                      this.getCreditAndBalance();
                    }}
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
