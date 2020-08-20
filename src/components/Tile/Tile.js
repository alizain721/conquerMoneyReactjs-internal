import React, { useState, Component } from "react";
import gameover from "../../img/source.gif";
import { withRouter } from "react-router-dom";
import "./Tile.css";
import test_pic from "../../img/Map.png";
import Link from "../Plaid/Link.js";
import axios from "axios";
import { API_POPACCOUNTS_URL, API_URL } from "../../constants/apiConstants";
import Cookie from "js-cookie";

class Tile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listItems: [],
      done: window.$done,
    };
  }

  componentDidUpdate() {
    this.setState();
  }

  redirectToPA() {
    this.props.history.push("/purchaseanalysis");
    this.props.updateTitle("Purchase Analysis");
  }

  buttonAction() {
    if (this.props.insightid === 1) {
      this.props.history.push("/purchaseanalysis");
    } else if (this.props.insightid === 2) {
      this.props.history.push("/home");
    } else {
      this.props.history.push("/purchaseanalysis");
    }
  }

  //typeid = 1 Tile with button
  //typeid = 2 Tile with no button (informational)
  //typeid else Image Tile

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
          // var accounts = response.data;
          // const listItems = stuff.map((number) => <li>{number}</li>);
          // this.setState({ accountList: accounts });

          this.setState({
            listItems: response.data.map((d) => (
              <li key={d.id}>
                {d.accountname} {d.currentbalance} {""}
                <button
                  type="button"
                  className="listButton"
                  onClick={() => this.deleteAccount(d.accountID)}
                >
                  Delete
                </button>
              </li>
            )),
          });

          this.props.showError(null);
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
  render() {
    if (this.props.typeid === 1) {
      return (
        <div className="card">
          <div className="card-body people-cards">
            <div className="container-fluid">
              <h3 className="card-title">
                <b>{this.props.title}</b>
              </h3>
              <p className="card-text">{this.props.description}</p>
              <div className="text-center">
                <button
                  type="button"
                  className="btn btn-primary custom-btn"
                  onClick={() => this.buttonAction()}
                >
                  Large button
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (this.props.typeid === 2) {
      return (
        <div className="card">
          <div className="card-body people-cards">
            <div className="container-fluid">
              <h3 className="card-title">
                <b>{this.props.title}</b>
              </h3>
              <p className="card-text">{this.props.description}</p>
              <div className="text-center"></div>
            </div>
          </div>
        </div>
      );
    } else if (this.props.typeid === 3) {
      return (
        <div className="card">
          <div className="card-body people-cards">
            <div className="container-fluid">
              <h3 className="card-title">
                <b>{this.props.title}</b>
              </h3>
              <img
                src={test_pic}
                className="img-fluid mx-auto d-block"
                alt="avatar"
              />
            </div>
          </div>
        </div>
      );
    } else if (this.props.typeid === 4) {
      return (
        <div className="card">
          <div className="card-body people-cards">
            <div className="container-fluid">
              <h3 className="card-title">
                <b>Get Started with Plaid!</b>
              </h3>
              <Link> </Link>

              {window.$done ? (
                <div className="viewTrans">View Transactions</div>
              ) : (
                <p>no</p>
              )}
              <h5>
                <b>Your Accounts</b>
              </h5>
              <div className="accountListContainer">
                <div className="accountListDiv">{this.state.listItems}</div>
              </div>
              <div className="text-center"></div>
            </div>
          </div>
        </div>
      );
    }
  }
}
export default withRouter(Tile);
