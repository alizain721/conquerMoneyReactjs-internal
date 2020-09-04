import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import {
  API_GET_TRANS,
  API_URL,
  API_GET_ACCOUNTS,
  API_GET_CASH,
} from "../../constants/apiConstants";
import axios from "axios";
import Cookie from "js-cookie";
import "./Accounts.css";
import Card from "react-bootstrap/Card";

class Accounts extends Component {
  constructor() {
    super();

    this.state = {
      accountList: [],
      totalCash: null,
      totalChecking: null,
      totalSavings: null,
    };

    this.loadAccountButtons = this.loadAccountButtons.bind(this);
    this.loadCash = this.loadCash.bind(this);
  }

  loadCash() {
    const token = Cookie.get("token") ? Cookie.get("token") : null;

    const payload = {
      token: token,
    };

    axios
      .post(API_URL + API_GET_CASH, payload)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            totalCash: response.data.totalCash,
            totalChecking: response.data.totalChecking,
            totalSavings: response.data.totalSavings,
          });
          console.log("CASH" + response.data.totalCash);
        } else {
          console.log("else");
          this.props.showError("Some error ocurred");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  loadAccountButtons() {
    const token = Cookie.get("token") ? Cookie.get("token") : null;

    const payload = {
      token: token,
    };

    axios
      .post(API_URL + API_GET_ACCOUNTS, payload)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            accountList: response.data.map((d) => (
              <button
                key={d.id}
                onClick={() => {
                  this.loadOneTable(d.accountID, d.officialname, d.accountname);
                }}
              >
                {d.officialname} {d.accountname}
                <br></br>Current Balance: {d.currentbalance}
              </button>
            )),
          });
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
    this.loadAccountButtons();
    this.loadCash();
  }

  render() {
    return (
      <div className="accountsPage">
        <div className="split left">{this.state.accountList}</div>

        <div className="split right">
          <Card className="cashCard text-center">
            <Card.Header>
              <div className="largeText2">
                <div className="leftText">Total Cash</div>
                <div className="rightText">{this.state.totalCash}</div>
              </div>
            </Card.Header>

            <div className="largeText">
              <div className="leftText">Checking</div>
              <div className="rightText">{this.state.totalChecking}</div>
            </div>
            <div className="largeText">
              <div className="leftText">Savings</div>
              <div className="rightText">{this.state.totalSavings}</div>
            </div>

            <Card.Footer className="text-muted">2 days ago</Card.Footer>
          </Card>

          <Card className="creditCard text-center">
            <Card.Header>
              <div className="largeText2">
                <div className="leftText">Credit Cards</div>
                <div className="rightText">Right Text</div>
              </div>
            </Card.Header>

            <div className="largeText">
              <div className="leftText">Card 1</div>
              <div className="rightText">Right Text</div>
            </div>
            <div className="largeText">
              <div className="leftText">Card 2</div>
              <div className="rightText">Right Text</div>
            </div>

            <Card.Footer className="text-muted">2 days ago</Card.Footer>
          </Card>

          <Card className="loanCard text-center">
            <Card.Header>
              <div className="largeText2">
                <div className="leftText">Loans</div>
                <div className="rightText">Right Text</div>
              </div>
            </Card.Header>

            <div className="largeText">
              <div className="leftText">Loan 1</div>
              <div className="rightText">Right Text</div>
            </div>
            <div className="largeText">
              <div className="leftText">Loan 2</div>
              <div className="rightText">Right Text</div>
            </div>

            <Card.Footer className="text-muted">2 days ago</Card.Footer>
          </Card>
        </div>
      </div>
    );
  }
}

export default withRouter(Accounts);
