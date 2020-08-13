import React, { useState } from "react";
import gameover from "../../img/source.gif";
import { withRouter } from "react-router-dom";
import "./Tile.css";

function Tile(props) {
  const redirectToPA = () => {
    props.history.push("/purchaseanalysis");
    //props.updateTitle("Purchase Analysis");
  };

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
              onClick={() => redirectToPA()}
            >
              Large button
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Tile);
