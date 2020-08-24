import React, { useState, Component } from "react";
import gameover from "../../img/source.gif";
import { withRouter } from "react-router-dom";
import "./Tile.css";
import test_pic from "../../img/Map.png";
import Link from "../Plaid/Link.js";

class Tile extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidUpdate() {
    this.setState();
  }

  redirectToPA() {
    this.props.updateTitle("Purchase Analysis");
    this.props.history.push("/purchaseanalysis");
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
                  onClick={() => this.redirectToPA()}
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
              <Link updateTitle={this.props.updateTitle}></Link>
            </div>
          </div>
        </div>
      );
    }
  }
}
export default withRouter(Tile);
