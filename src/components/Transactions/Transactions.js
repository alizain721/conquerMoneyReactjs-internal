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
import TransactionsRow from "./TransactionsRow";

class Transactions extends Component {
  constructor() {
    super();

    this.state = {
      accountList: [],
      newAccountList: [],

      rowData: [],
      columnDefs: [],
      transactionsSorted: [],
    };
    this.loadOneTable = this.loadOneTable.bind(this);
    this.loadAccountButtons = this.loadAccountButtons.bind(this);
    this.dateFormating = this.dateFormating.bind(this);
    this.sortedTransactions = this.sortedTransactions.bind(this);
  }

  loadAccountButtons() {
    const token = Cookie.get("token") ? Cookie.get("token") : null;

    const payload = {
      token: token,
    };

    axios
      .post(API_URL + API_GET_ACCOUNTS, payload)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            accountList: response.data.map((d) => (
              <button className = "splitButton"
                key={d.id}
                onClick={() => {
                  this.loadOneTable(d.accountID, d.officialname, d.accountname);
                }}
              >
                {d.officialname} {d.accountname}
                <br></br>Current Balance: {d.currentbalance}
              </button>
            )),
            newAccountList: this.state.accountList.concat(
              <button className = "splitButton"
                key={new Date().getTime()}
                onClick={() => {
                  this.loadOneTable();
                }}
              >
                All Transactions
              </button>
            ),
          });

          this.setState({
            newAccountList: this.state.newAccountList.concat(
              this.state.accountList
            ),
          });
        } else {
          console.log("else");
          this.props.showError("Some error ocurred");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  loadOneTable(accountID, officialname, accountname) {
    const token = Cookie.get("token") ? Cookie.get("token") : null;
    var title = "All Transactions";
    

    if (officialname && accountname !== undefined) {
      title = officialname + " " + accountname;
    }
    var payload = {};
    console.log("testing");
    if (accountID === undefined) {
      payload = {
        token: token,
      };
    } else {
      payload = {
        token: token,
        accountID: accountID,
      };
    }
    axios
      .post(API_URL + API_GET_TRANS, payload)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            rowData: response.data.transactionsList,
            columnDefs: [
              {
                headerName: title,

                children: [
                  {
                    headerName: "Amount",
                    field: "amount",
                    sortable: true,
                    filter: true,
                    resizable: true,
                  },
                  {
                    headerName: "Category",
                    field: "category",
                    sortable: true,
                    filter: true,
                    resizable: true,
                  },
                  {
                    headerName: "Name",
                    field: "name",
                    sortable: true,
                    filter: true,
                    resizable: true,
                  },
                  {
                    headerName: "Date",
                    field: "date",
                    sortable: true,
                    filter: true,
                    resizable: true,
                  },
                  {
                    headerName: "Payment Channel",
                    field: "paymentChannel",
                    sortable: true,
                    filter: true,
                    resizable: true,
                  },
                  {
                    headerName: "Pending",
                    field: "pending",
                    sortable: true,
                    filter: true,
                    resizable: true,
                  },
                ],
              },
            ],
          });
        } else {
          console.log("else");
          this.props.showError("Some error ocurred");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  dateFormating(date){
    const yearMonthDate = date.split('-');
    var dateFormat = "";
    switch (yearMonthDate[1]){
      case "01":
        dateFormat += "January ";
        break;
      case "02":
        dateFormat += "Febuary ";
        break;
      case "03":
        dateFormat += "March ";
        break;
      case "04":
        dateFormat += "April ";
        break;
      case "05":
        dateFormat += "May ";
        break;
      case "06":
        dateFormat += "June ";
        break;
      case "07":
        dateFormat += "July ";
        break;
      case "08":
        dateFormat += "August ";
        break;
      case "09":
        dateFormat += "September ";
        break;
      case "10":
        dateFormat += "October ";
        break;
      case "11":
        dateFormat += "November ";
        break;
      case "12":
        dateFormat += "December ";
        break;
    }
    dateFormat = dateFormat + yearMonthDate[2] + ", " + yearMonthDate[0];
    return dateFormat;
  }

  sortedTransactions(){
    var sorted = this.state.rowData.sort((a,b) => a.date.localeCompare(b.date));
    this.setState.transactionsSorted = sorted;
    for (var i = 0; i < sorted.length; i++){
      if (i==0){
        sorted[i].newDate = true;
      }else if (sorted[i].date==sorted[i-1].date){
        sorted[i].newDate = false;
      }else{
        sorted[i].newDate = true;
      }
    }
    return sorted;
  }

  componentDidMount() {
    this.loadOneTable();
    this.loadAccountButtons();
  }

  render() {
    return (
      <div className="transPage">
        
        <div className="split topp">
        
          <div className="transdropdown"><span>transactions</span>
            <div className="transdropdown-content">
              {this.state.newAccountList}
            </div>
          </div>
        
          </div>
        <div className="split bottom">
        {
            <div className="board">
              {this.sortedTransactions().map((list) => {
                  return (
                    <TransactionsRow
                      name= {list.name}
                      category= {list.category}
                      amount= {list.amount}
                      ifpending= {list.pending}
                      date= {this.dateFormating(list.date)}
                      newDate={list.newDate}
                      logo={"https://logo.clearbit.com/" + list.name.replace(/\s+/g, '') + ".com"}
                    />
                  );
              })}
            </div>
            }
        </div>
      </div>
    );
  }
}

export default withRouter(Transactions);
