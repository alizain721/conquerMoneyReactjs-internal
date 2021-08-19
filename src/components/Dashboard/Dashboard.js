import "./Dashboard.css";

import React, { Component } from "react";
import axios from "axios";
import Cookie from "js-cookie";

import { API_GENTILES_URL, API_URL } from "../../constants/apiConstants";
import { withRouter, Link } from "react-router-dom";
import Tile from "../Tile/Tile.js";


class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      successMessage: null,
      // accountList: [],
      listItems: [],
      tiles: [],
      tileList: [],
      title: "test",
      postPicture: null,
      description: "something",
    };

    this.redirectToPA = this.redirectToPA.bind(this);
    //this.handleOnSuccess = this.handleOnSuccess.bind(this);
  }

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
    this.props.history.push("/");
    this.props.updateTitle("Login");
  }

  deleteAccount(accountID) {}

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
        //console.log("res:"+response.status);
        if (response.status === 200) {
          this.setState({
            tileList: response.data.map((tile) => (
              <Tile
                key={tile.id}
                Id={tile.id}
                createdBy={tile.createdBy}
                avatarTiles={tile.image}
                image={tile.image}
                insightHtml={tile.insightHtml}
                lastUpdatedBy={tile.lastUpdatedBy}
                lastUpdated={tile.lastuUpdated}
                likeable={tile.likeable}
                likesCount={tile.likes_count}
                referenceTileId={tile.referenceTileId}
                shareable={tile.shareable}
                title={tile.title}
                transactionHtml={tile.transactionHtml}
                user_id={tile.user_id}
                videoURL={tile.videoURL}
                content={tile.content}
                postPicture={tile.postPicture}
                postType={tile.postType}
                
                
                updateTitle={this.props.updateTitle}
              />
            )),
          });
          /*
          this.setState((prevState) => ({
            ...prevState,
            successMessage: "Recieved Token",
          }));
*/
          this.props.showError(null);
        } else if (response.status === 401) {
          this.unauth();
        } else {
          console.log("else");
          this.props.showError("Some error ocurred");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  unauth() {
    {
      console.log("UNAUTHORIZED");
      this.props.showError(
        "Token has expired you are being redirected to login..."
      );
      setTimeout(() => {
        this.redirectToLogin();
      }, 1500);
    }
  }
  componentDidMount() {
    if (Cookie.get("token")) {
      this.generateTiles();
    }
  }

  render() {
    return (
      <div className="dashboard">
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
        {/*}
        <Link></Link>

        <div className="accountListContainer">
          <div className="accountListDiv">{this.state.listItems}</div>
        </div>
      */}
        <Tile postType={"SIX"} updateTitle={this.props.updateTitle} />
        {this.state.tileList}
        <Tile postType={"ONE"} updateTitle={this.props.updateTitle} />
        <Tile postType={"FIVE"} updateTitle={this.props.updateTitle} />

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
        {
          //<Extendtoken></Extendtoken>
        }
      </div>
    );
  }
}

export default withRouter(Dashboard);
