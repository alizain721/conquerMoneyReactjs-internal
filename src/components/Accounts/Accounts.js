import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import {
  API_URL,
  API_GET_ACCOUNTS,
  API_GET_CASH,
  API_GET_CARDS,
  API_GET_LOANS,
} from "../../constants/apiConstants";
import axios from "axios";
import Cookie from "js-cookie";
import "./Accounts.css";
import Card from "react-bootstrap/Card";
import Link from "../Plaid/Link.js";

class Accounts extends Component {
  constructor() {
    super();

    this.state = {
      accountList: [],
      checkAndSaveList: [],
      cardList: [],
      loanList: [],
      totalCash: null,
      totalChecking: null,
      totalSavings: null,
      totalCardDebt: null,
      totalLoanDebt: null,
    };


    // this.loadAccountButtons = this.loadAccountButtons.bind(this);
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
            checkAndSaveList: response.data.checkAndSaveList.map((d) => (
              <div className="largeText"
                key={d.id}>
                <div className="leftText">{d.accountname}</div>
                <div className="rightText">${(d.currentbalance).toFixed(2)}</div>
                <br />
                <div className="bankText">{d.officialname}</div>
              </div>
            )

            ),
          });
          console.log("CASH" + response.data.totalCash);
        }
        else {
          console.log("else");
          this.props.showError("Some error ocurred");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  loadCards() {
    const token = Cookie.get("token") ? Cookie.get("token") : null;

    const payload = {
      token: token,
    };

    axios
      .post(API_URL + API_GET_CARDS, payload)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            cardList: response.data.cardList.map((d) => (
              <div className="largeText" key={d.id}>
                <div className="leftText">{d.officialname}</div>

                <div className="rightText">-${d.currentbalance}</div>
                <br></br>
                <div className="leftTextMuted text-muted">
                  {" "}
                  Limit: ${d.creditlimit}
                </div>
              </div>
            )),
            totalCardDebt: response.data.totalDebt,
          });

          //console.log("CARDS" + response.data.totalCash);
        } else {
          console.log("else");
          this.props.showError("Some error ocurred");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  loadLoans() {
    const token = Cookie.get("token") ? Cookie.get("token") : null;

    const payload = {
      token: token,
    };

    axios
      .post(API_URL + API_GET_LOANS, payload)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            cardList: response.data.loanList.map((d) => (
              <div className="largeText" key={d.id}>
                <div className="leftText">{d.officialname}</div>

                <div className="rightText">-${d.currentbalance}</div>
                <br></br>
              </div>
            )),
            totalLoanDebt: response.data.totalDebt,
          });

          console.log("CARDS" + response.data.totalCash);
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
    this.loadCash();
    this.loadCards();
    this.loadLoans();
  }

  render() {
    var noAccounts = 0;
    var noCards = 0;
    var noLoans = 0;
    if (this.state.checkAndSaveList === undefined || this.state.checkAndSaveList.length == 0) {
      noAccounts = 1;
    }
    if (this.state.cardList === undefined || this.state.cardList.length == 0) {
      noCards = 1;
    }
    if (this.state.loanList === undefined || this.state.loanList.length == 0) {
      noLoans = 1;
    }


    return (
      <div className="accountsPage">
        <div className="center">
          {noAccounts ? null :
            [
              <Card className="cashCard text-center">
                <Card.Header>
                  <div className="largeText2">
                    <div className="leftText">Total</div>
                  <div className="rightText">${this.state.totalCash}</div>
                  </div>
                </Card.Header>

                {this.state.checkAndSaveList}

                <Card.Footer className="text-muted">2 days ago</Card.Footer>
              </Card>
            ]
          }
          {
            noCards ? null :
              [
                <Card className="creditCard text-center">
                  <Card.Header>
                    <div className="largeText2">
                      <div className="leftText">Credit Cards</div>
                      <div className="rightText">-${this.state.totalCardDebt}</div>
                    </div>
                  </Card.Header>

                  {this.state.cardList}

                  <Card.Footer className="text-muted">2 days ago</Card.Footer>
                </Card>
              ]
          }
          {
            noLoans ? null :
            [
              <Card className="loanCard text-center">
            <Card.Header>
              <div className="largeText2">
                <div className="leftText">Loans</div>
                <div className="rightText">{this.state.totalLoanDebt}</div>
              </div>
            </Card.Header>

            {this.state.loanList}

            <Card.Footer className="text-muted"></Card.Footer>
          </Card>
            ]
          }
        <div className="tile_no_btn bg-white my-2">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="tile_no_btn_top">
                  <h4 className="financial_title proxima-bold text-capitalize mb-2 mt-3">
                    Get Started with Plaid!
                  </h4>
                  <Link updateTitle={this.props.updateTitle}></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Accounts);
