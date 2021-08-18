import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";

import {
  API_GET_TRANS,
  API_URL,
  API_GET_ACCOUNTS,
} from "../../constants/apiConstants";
import axios from "axios";
import Cookie from "js-cookie";
import "./Transactions.css";
import "./Transactions.js"

class Transactions extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    if (this.props.newDate){
      return (
        <div>
          <div className = "dateBox">
              {this.props.date}
          </div> 
          <div className="transactionBox">
            <div className="logoBox">
              <img className ="logoImage" 
                src={this.props.logo} 
                onerror="this.onerror=null;this.src='https://i.pinimg.com/474x/14/04/8d/14048d06bdf4c1d0f724370b7eabc45e.jpg';" />
            </div>
            <div className="main">
                <div className="name">
                  {this.props.name}
                </div>
                <div className="category">
                  {this.props.category}
                </div>
            </div>
            <div className="amount">
              <div className= {this.props.amount<0 ? 'positive' : 'negative'}>
                ${(this.props.amount<0 ? this.props.amount*(-1) : this.props.amount).toFixed(2)}
              </div>
              <div className="pending">   
                {this.props.pending ? "PENDING" : ""}
              </div>
            </div>
          </div>
        </div>
      );
    }
    else {
      return (
        <div>
          <div className="transactionBox">
            <div className="logoBox">
              <img className ="logoImage" 
                src={this.props.logo} 
                onerror="this.onerror=null;this.src='https://i.pinimg.com/474x/14/04/8d/14048d06bdf4c1d0f724370b7eabc45e.jpg';" />
            </div>
            <div className="main">
                <div className="name">
                  {this.props.name}
                </div>
                <div className="category">
                  {this.props.category}
                </div>
            </div>
            <div className="amount">
              <div className= {this.props.amount<0 ? 'positive' : 'negative'}>
                ${(this.props.amount<0 ? this.props.amount*(-1) : this.props.amount).toFixed(2)}
              </div>
              <div className="pending">   
                {this.props.pending ? "PENDING" : ""}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default withRouter(Transactions);
