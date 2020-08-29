import "./PurchaseAnalysis.css";
import React, {  } from "react";
import chase from "../../img/Chase.png";
import discover from "../../img/Discover.png";
import express from "../../img/Express.png";
import map from "../../img/Map.png";

import { withRouter } from "react-router-dom";

function PurchaseAnalysis(props) {
  const redirectToLogin = () => {
    props.history.push("/login");
    props.updateTitle("Login");
  };
  // const redirectToDash = () => {
  //   props.history.push("/dashboard");
  //   props.updateTitle("Dashboard");
  // };

  return (
    <div>
      <div className="card">
        <div className="location_card">
          <div className="container-fluid">
            <div className="row1">
              <div className="col-xs-12">
                <h5 className="text-center section_title">
                  <b>Which card should you use?</b>
                </h5>
              </div>
            </div>
            <div className="row2">
              <div className="col-xs-12">
                <h6 className="text-center current_location_tagline">
                  <b>It looks like you are at Target</b>
                </h6>
              </div>
            </div>
            <div className="row3">
              <div className=" col-xs-6">
                <h6 className="text-center other_locations_title">
                  <b>Other locations nearby:</b>
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-body heading_cardPA">
          <div className="container-fluid">
            <div className="row">
              <div className="col-4">
                <p className="text-center name1">
                  <b>Stop & Shop</b>
                </p>
                <p className="text-center name2">
                  <b>CVS Pharmacy</b>
                </p>
                <p className="text-center name3">
                  <b>Donaldsons</b>
                </p>
              </div>

              <div className="col-4">
                <ul className="selects">
                  <li>
                    <a href="text-center">Select</a>
                  </li>
                  <li>
                    <a href="text-center">Select</a>
                  </li>
                  <li>
                    <a href="text-center">Select</a>
                  </li>
                </ul>
              </div>

              <div className="col-4">
                <img
                  src={map}
                  className="img-responsive"
                  alt="current_location"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card2">
        <div className="purchase_card">
          <div className="container-fluid">
            <div className="row4">
              <div className=" col-xs-12">
                <h5 className="Purchase_text">
                  <b>This purchase will earn:</b>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4">
          <div className="cardBodies">
            <img
              // width="100"
              //  height="225"
              className="card-img-top"
              src={discover}
              alt="discover"
            />
            <div className="card-body credit-cards">
              <div className="container-fluid">
                <h5 className="card-title">
                  <b>1% CASH BACK</b>
                </h5>
                <p className="card-text">Explanation</p>
                <div className="text-center">
                  <button type="button" className="btn-primary">
                    USE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="cardBodies">
            <img
              //  width="100"
              //  height="225"
              className="card-img-top"
              src={chase}
              alt="chase"
            />
            <div className="card-body credit-cards">
              <div className="container-fluid">
                <h5 className="card-title">
                  <b>1.5% CASH BACK</b>
                </h5>
                <p className="card-text">Explanation</p>
                <div className="text-center">
                  <button type="button" className="btn-primary">
                    USE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="cardBodies">
            <img
              //   width="100"
              //  height="225"
              className="card-img-top"
              src={express}
              alt="express"
            />
            <div className="card-body credit-cards">
              <div className="container-fluid">
                <h5 className="card-title">
                  <b>2% CASH BACK</b>
                </h5>
                <p className="card-text">Explanation</p>
                <div className="text-center">
                  <button type="button" className="btn-primary">
                    USE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2>
        <span className="loginText" onClick={() => redirectToLogin()}>
          Back to Login
        </span>
      </h2>
    </div>
  );
}

export default withRouter(PurchaseAnalysis);
