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

class Transactions extends Component {
  constructor() {
    super();

    this.state = {
      accountList: [],
      newAccountList: [],

      rowData: [],
      columnDefs: [],
    };
    this.loadOneTable = this.loadOneTable.bind(this);
    this.loadAccountButtons = this.loadAccountButtons.bind(this);
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
              <button
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
              <button
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

  componentDidMount() {
    this.loadOneTable();
    this.loadAccountButtons();
  }

  render() {
    return (
      <div className="transPage">
        <div className="split left">{this.state.newAccountList}</div>

        <div className="split right">
          <div
            className="ag-theme-alpine"
            style={{
              height: "90%",
              width: "90%",
            }}
          >
            {/* {this.state.tableList}*/}

            <AgGridReact
              columnDefs={this.state.columnDefs}
              rowData={this.state.rowData}
            ></AgGridReact>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Transactions);
