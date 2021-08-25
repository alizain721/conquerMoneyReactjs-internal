import "./Dashboard.css";

import React, { Component } from "react";
import axios from "axios";
import Cookie from "js-cookie";

import { API_GENTILES_URL, API_URL } from "../../constants/apiConstants";
import { withRouter, Link } from "react-router-dom";
import Tile from "../Tile/Tile.js";
import income from "../../img/ProHTML/Income.png";
import expense from "../../img/ProHTML/Expense.png";
import g1 from "../../img/ProHTML/g1.png";
import g2 from "../../img/ProHTML/g2.png";
import g3 from "../../img/ProHTML/g3.png";


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
  redirectToFriends() {
    this.props.history.push("/friendPage");
    this.props.updateTitle("FriendPage");
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
        {/* Loading icon */}
        {this.state.loading ? (
          <div id="loadinginfo" className="lds-dual-ring"></div>
        ) : null}
        {/* Financial Feed */}
        <div className="financial_feed mb-2">
          <div className="tile-container">
            <div className="row">
              <div className="col-12">
                <div className="titile_desc ">
                  <h4 className="financial_title proxima-bold text-capitalize mb-2">
                    {" "}
                    Financial feed{" "}
                  </h4>
                  <h5 className="text-capitalize mb-0 ">monthly cash flow</h5>
                  <p className="financial_text grey-color">
                    Here's a look where your money went this month
                  </p>
                </div>
                <div className="percentage_progress">
                  <div className="per_pro_dertail percentage_progress_1">
                    <div className="set-size charts-container">
                      <div className="pie-wrapper progress-45 style-2">
                        <span className="label">
                          45<span className="smaller">%</span>
                        </span>
                        <div className="pie">
                          <div className="left-side half-circle"></div>
                          <div className="right-side half-circle"></div>
                        </div>
                        <div className="shadow"></div>
                      </div>
                    </div>
                  </div>
                  <div className="per_pro_dertail progress_detail">
                    <div className="progress_icon_text">
                      <span className="income_expense_text grey-color">
                        <img src={income} alt="income" /> Income{" "}
                      </span>
                      <h4>
                        $<span>2300.45</span>
                      </h4>
                    </div>
                  </div>
                  <div className="per_pro_dertail percentage_progress_2">
                    <div className="set-size charts-container">
                      <div className="pie-wrapper progress-45 style-2">
                        <span className="label">
                          45<span className="smaller">%</span>
                        </span>
                        <div className="pie">
                          <div className="left-side half-circle"></div>
                          <div className="right-side half-circle"></div>
                        </div>
                        <div className="shadow"></div>
                      </div>
                    </div>
                  </div>
                  <div className="per_pro_dertail progress_detail">
                    <div className="progress_icon_text">
                      <span className="income_expense_text grey-color">
                        <img src={expense} alt="expense" /> Expense
                      </span>
                      <h4>
                        $<span>2300.45</span>
                      </h4>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-primary custom-btn"
                  onClick={() => this.redirectToPA()}
                >
                  Credit Card Analyzer
                </button>
                <button
                  type="button"
                  className="btn btn-primary custom-btn"
                  onClick={() => this.redirectToFriends()}
                >
                  Friends
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Spending */}
        <div className="spending_descreases bg-white my-2">
          <div className="tile-container">
            <div className="row">
              <div className="col-12">
                <div className="spending_descreases_top">
                  <h4 className="financial_title proxima-bold text-capitalize mb-2 mt-3">
                    {" "}
                    Spending Decrease{" "}
                  </h4>
                  <h5 className="financial_sub_text text-capitalize mb-0 grey-color">
                    Your purchases in November were lower than usal{" "}
                  </h5>
                  <div className="spending_graph d-flex justify-content-between py-3">
                    <div className="sg_block sg_1">
                      <div className="sg_img">
                        <img src={g1} alt="g1" />
                      </div>
                      <p className="sg_per">40%</p>
                    </div>
                    <div className="sg_block sg_2">
                      <div className="sg_img">
                        <img src={g2} alt="g2" />
                      </div>
                      <p className="sg_per">15%</p>
                    </div>
                    <div className="sg_block sg_3">
                      <div className="sg_img">
                        <img src={g3} alt="g3" />
                      </div>
                      <p className="sg_per">10%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
        {
          //<Extendtoken></Extendtoken>
        }
      </div>
    );
  }
}

export default withRouter(Dashboard);
