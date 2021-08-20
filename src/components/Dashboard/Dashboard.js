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
      loading: true,
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
            tileList: response.data.map((GeneralTile) => (
              <Tile
                key={GeneralTile.id}
                Id={GeneralTile.id}
                button1Text={GeneralTile.button1Text}
                button1URL={GeneralTile.button1URL}
                button2Text={GeneralTile.button2Text}
                button2URL={GeneralTile.button2URL}
                commentable={GeneralTile.commentable}
                content={GeneralTile.content}
                createdBy={GeneralTile.createdBy}
                avatarTiles={GeneralTile.image}
                image={GeneralTile.image}
                insightHtml={GeneralTile.insightHtml}
                lastUpdatedBy={GeneralTile.lastUpdatedBy}
                lastUpdated={GeneralTile.lastuUpdated}
                likeable={GeneralTile.likeable}
                likesCount={GeneralTile.likes_count}
                referenceTileId={GeneralTile.referenceTileId}
                shareable={GeneralTile.shareable}
                title={GeneralTile.title}
                transactionHtml={GeneralTile.transactionHtml}
                user_id={GeneralTile.user_id}
                videoURL={GeneralTile.videoURL}
                postPicture={GeneralTile.postPicture}
                postType={GeneralTile.postType}
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
  
  componentDidUpdate() {
    
   
    var element = document.getElementById("loadinginfo");
    element.classList.add("noDisplay");
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
        {this.state.loading ? (
          <div id="loadinginfo" className="lds-dual-ring">
            
          </div>
        ) : null}

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
