import "./Dashboard.css";

import React, { useState, Component } from "react";
import avatar from "../../img/dash_pic.jpeg";
import axios from "axios";
import Cookie from "js-cookie";

import {
  API_GENTILES_URL,
  API_POPACCOUNTS_URL,
  API_URL,
} from "../../constants/apiConstants";
import { withRouter } from "react-router-dom";
import Tile from "../Tile/Tile.js";
import Link from "../Plaid/Link.js";

class Dashboard extends Component {
  state = {
    successMessage: null,
    // accountList: [],
    listItems: [],
    tiles: [],
    tileList: [],
    title: "test",
    description: "something",
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

  deleteAccount(accountID) {}

  handleSubmit() {
    // handleSubmit = (event) => {
    this.props.showError(null);
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

          //console.log("response " + this.state.accountList.Data);

          this.setState((prevState) => ({
            ...prevState,
            successMessage: "Recieved Token",
          }));

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

  generateTiles() {
    this.props.showError(null);
    const token = Cookie.get("token") ? Cookie.get("token") : null;
    const payload = {
      username: "admin",
      token: token,
    };
    axios
      .post(API_URL + API_GENTILES_URL, payload)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            tileList: response.data.map((d) => (
              <Tile
                key={d.id}
                title={d.title}
                description={d.description}
                typeid={d.typeid}
              />
            )),
          });

          this.setState((prevState) => ({
            ...prevState,
            successMessage: "Recieved Token",
          }));

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
    this.handleSubmit();
    this.generateTiles();
  }

  render() {
    return (
      <div>
        {/*}
        {Object.keys(this.state.tiles).map((key) => (
          <div className="container">
            <span className="right">
              {this.state.tiles[key].title}
              {this.state.tiles[key].description}
            </span>
          </div>
        ))}
        */}
        <Link></Link>

        <div className="accountListContainer">
          <div className="accountListDiv">{this.state.listItems}</div>
        </div>

        {this.state.tileList}

        {/*<Tile title={this.state.title} description={this.state.description} />*/}
        {/*
        <button
          type="button"
          className="btn btn-primary custom-btn"
          onClick={() => this.redirectToAddCard()}
        >
          + Add Account
        </button>
        */}

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
