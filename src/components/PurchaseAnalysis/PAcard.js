import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./PurchaseAnalysis.css";
import chase from "../../img/Chase.png";
import discover from "../../img/Discover.png";
import express from "../../img/Express.png";

class PAcard extends Component {
  constructor(props) {
    super();

    this.state = {};
  }

  componentDidUpdate() {
    this.setState();
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

  render() {
    if (this.props.userhas === 1) {
      return (
        <div className="PAcardContainer">
          <div
            className="cardBodies1"
           
          >
            <div className="row">
              <div className="col"></div>
              <div className="col">
                <p className="rewardP">
                  {this.props.rewardsrate +
                    " " +
                    this.props.rewardstype +
                    " back"}
                </p>
              </div>
            </div>

            <div className=" credit-cards">
              <h5 className="card-title">
                <b>{this.props.officialname}</b>
              </h5>
              <p className="card-text">
                {this.props.rewardsrate +
                  " " +
                  this.props.rewardstype +
                  " back at "}{" "}
                {this.props.purchasecategory + " locations. "}{" "}
                {this.props.benefitname}
              </p>
              <div className="text-center">
                <button type="button" className="btn-secondary">
                  USE
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="PAcardContainer">
          <div className="cardBodies2">
            <div className="row">
              <div className="col">
                <img className="card-img-top" src={discover} alt="discover" />
              </div>
              <div className="col">
                <div className="card-body credit-cards">
                  <h5 className="card-title">
                    <b>{this.props.officialname}</b>
                  </h5>
                  <p className="card-text">
                    {this.props.rewardsrate +
                      " " +
                      this.props.rewardstype +
                      " back at "}{" "}
                    {this.props.purchasecategory + " locations. "}{" "}
                    {this.props.benefitname}
                  </p>
                </div>
                <p className="rewardP">
                  {this.props.rewardsrate +
                    " " +
                    this.props.rewardstype +
                    " back"}
                </p>
              </div>
            </div>

            <div className="text-center">
              <button
                type="button"
                className="btn btn-primary custom-btn btn-secondary2"
              >
                APPLY NOW
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
}
export default withRouter(PAcard);
