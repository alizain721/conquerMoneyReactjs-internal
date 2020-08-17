import React, { useState } from "react";
import gameover from "../../img/source.gif";
import { withRouter } from "react-router-dom";
import "./Tile.css";
import test_pic from "../../img/Map.png";

function Tile(props) {
  const redirectToPA = () => {
    props.history.push("/purchaseanalysis");
    //props.updateTitle("Purchase Analysis");
  };

  const buttonAction = () => {
    if (props.insightid === 1) {
      props.history.push("/purchaseanalysis");
    } else if (props.insightid === 2) {
      props.history.push("/home");
    } else {
      props.history.push("/purchaseanalysis");
    }
  };

  //typeid = 1 Tile with button
  //typeid = 2 Tile with no button (informational)
  //typeid else Image Tile

  if (props.typeid === 1) {
    return (
      <div className="card">
        <div className="card-body people-cards">
          <div className="container-fluid">
            <h3 className="card-title">
              <b>{props.title}</b>
            </h3>
            <p className="card-text">{props.description}</p>
            <div className="text-center">
              <button
                type="button"
                className="btn btn-primary custom-btn"
                onClick={() => buttonAction()}
              >
                Large button
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (props.typeid === 2) {
    return (
      <div className="card">
        <div className="card-body people-cards">
          <div className="container-fluid">
            <h3 className="card-title">
              <b>{props.title}</b>
            </h3>
            <p className="card-text">{props.description}</p>
            <div className="text-center"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-body people-cards">
        <div className="container-fluid">
          <h3 className="card-title">
            <b>{props.title}</b>
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
}

export default withRouter(Tile);
