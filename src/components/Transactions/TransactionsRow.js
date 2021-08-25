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
import bankFees from "../../img/transactionLogos/Bank Fees.png";
import foodAndDrink from "../../img/transactionLogos/Food and Drink.png";
import interest from "../../img/transactionLogos/Interest.png";
import payment from "../../img/transactionLogos/Payment.png";
import recreation from "../../img/transactionLogos/Recreation.png";
import shops from "../../img/transactionLogos/Shops.png";
import transfer from "../../img/transactionLogos/Transfer.png";
import travel from "../../img/transactionLogos/Payment.png";

class Transactions extends Component {
  constructor(props) {
    super(props);

    this.addDefaultSrc = this.addDefaultSrc.bind(this)

  }

  addDefaultSrc(ev){
    var categ = this.props.category;
    console.log(typeof(categ));
    console.log(categ);
    if (categ == null){
      ev.target.src = 'https://i.pinimg.com/474x/14/04/8d/14048d06bdf4c1d0f724370b7eabc45e.jpg'
    }else if (categ.startsWith('Bank Fees')){
      ev.target.src = bankFees;
    }else if (categ.startsWith('Food and Drink')){
      ev.target.src = foodAndDrink;
    }else if (categ.startsWith('Interest')){
      ev.target.src = interest;
    }else if (categ.startsWith('Payment')){
      ev.target.src = payment;
    }else if (categ.startsWith('Recreation')){
      ev.target.src = recreation;
    }else if (categ.startsWith('Shops')){
      ev.target.src = shops;
    }else if (categ.startsWith('Transfer')){
      ev.target.src = transfer;
    }else if (categ.startsWith('Travel')){
      ev.target.src = travel;
    }else{
      ev.target.src = 'https://i.pinimg.com/474x/14/04/8d/14048d06bdf4c1d0f724370b7eabc45e.jpg'
    }
    ev.onerror=null;
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
                onError={this.addDefaultSrc} />
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
                onError={this.addDefaultSrc}  />
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
