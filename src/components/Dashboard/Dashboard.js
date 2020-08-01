import "./Dashboard.css";
import React from "react";
import avatar from "../../img/dash_pic.jpeg";

import { withRouter } from "react-router-dom";

function Dashboard(props) {
  const redirectToLogin = () => {
    props.history.push("/login");
    props.updateTitle("Login");
  };

  const redirectToPA = () => {
    props.history.push("/purchaseanalysis");
    props.updateTitle("Purchase Analysis");
  };

  const redirectToAddCard = () => {
    props.history.push("/addcard");
    props.updateTitle("Add New Card");
  };

  return (
    <div>
      <button type="button" className="button1" onClick={redirectToAddCard}>
        + Add Account
      </button>
      <div className="card">
        <div className="card-body heading_card">
          <div className="container-fluid">
            <div className="row">
              <div className="col-4">
                <h1 className="text-center available_balance">
                  <b>$2300.45</b>
                </h1>
                <p className="text-center available_balance_tagline">
                  Available Balance
                </p>
              </div>

              <div className="col-4 ">
                <h1 className="text-center credit_balance">
                  <b>$2103.05</b>
                </h1>
                <p className="text-center available_credit_tagline">
                  Available Credit
                </p>
              </div>

              <div className="col-4">
                <img
                  src={avatar}
                  className="img-fluid mx-auto d-block"
                  alt="avatar"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body people-cards">
              <div className="container-fluid">
                <h3 className="card-title">
                  <b>Credit Card Analyzer</b>
                </h3>
                <p className="card-text">
                  Choose the best card for your purchase
                </p>
                <div className="text-center">
                  <button
                    type="button"
                    className="btn btn-primary custom-btn"
                    onClick={redirectToPA}
                  >
                    Large button
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-body people-cards">
              <div className="container-fluid">
                <h3 className="card-title">
                  <b>Credit Card Analyzer</b>
                </h3>
                <p className="card-text">
                  Choose the best card for your purchase
                </p>
                <div className="text-center">
                  <button
                    type="button"
                    className="btn btn-primary custom-btn"
                    onClick={redirectToPA}
                  >
                    Large button
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body people-cards">
              <div className="container-fluid">
                <h3 className="card-title">
                  <b>Credit Card Analyzer</b>
                </h3>
                <p className="card-text">
                  Choose the best card for your purchase
                </p>
                <div className="text-center">
                  <button
                    type="button"
                    className="btn btn-primary custom-btn"
                    onClick={redirectToPA}
                  >
                    Large button
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

export default withRouter(Dashboard);
