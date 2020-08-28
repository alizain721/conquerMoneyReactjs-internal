import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import {
  API_GET_TRANS,
  API_URL,
  API_GET_ACCOUNTS,
} from "../../constants/apiConstants";
import axios from "axios";
import Cookie from "js-cookie";
import "./Table.css";
import Header from "../Header/Header.js";

class Table extends Component {
  constructor() {
    super();

    this.state = {
      tableList: [],
      tableTitle: [],
      rowData: [],
      columnDefs: [
        {
          headerName: null,
          children: [
            {
              headerName: "Amount",
              field: "amount",
              sortable: true,
              filter: true,
            },
            {
              headerName: "Category",
              field: "category",
              sortable: true,
              filter: true,
            },
            { headerName: "Name", field: "name", sortable: true, filter: true },
            {
              headerName: "Payment Channel",
              field: "paymentChannel",
              sortable: true,
              filter: true,
            },
            {
              headerName: "Pending",
              field: "pending",
              sortable: true,
              filter: true,
            },
          ],
        },
      ],
    };
  }
  /*
  componentDidMount() {
    fetch(
      "https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/sample-data/smallRowData.json"
    )
      .then((result) => result.json())
      .then((rowData) => this.setState({ rowData }));
  }
*/
  /*
  componentDidMount() {
    const token = Cookie.get("token") ? Cookie.get("token") : null;
    
    fetch(API_URL + API_GET_TRANS, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
      }),
    })
      //.then((result) => result.json())
     
      .then((rowData) => this.setState({ rowData }));
  }
*/

  componentDidMount() {
    const token = Cookie.get("token") ? Cookie.get("token") : null;
    const payload = {
      token: token,
    };
    axios
      .post(API_URL + API_GET_TRANS, payload)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            rowData: response.data.transactionsList,
            tableTitle: response.data.accountList.map((d) => d.officialname),
          });
          console.log(this.state.tableTitle);
          this.setState({
            tableList: response.data.accountList.map((d) => (
              <AgGridReact
                key={d.id}
                columnDefs={[
                  {
                    headerName: d.accountname + " " + d.officialname,
                    children: [
                      {
                        headerName: "Amount",
                        field: "amount",
                        sortable: true,
                        filter: true,
                      },
                      {
                        headerName: "Category",
                        field: "category",
                        sortable: true,
                        filter: true,
                      },
                      {
                        headerName: "Name",
                        field: "name",
                        sortable: true,
                        filter: true,
                      },
                      {
                        headerName: "Date",
                        field: "date",
                        sortable: true,
                        filter: true,
                      },
                      {
                        headerName: "Payment Channel",
                        field: "paymentChannel",
                        sortable: true,
                        filter: true,
                      },
                      {
                        headerName: "Pending",
                        field: "pending",
                        sortable: true,
                        filter: true,
                      },
                    ],
                  },
                ]}
                headerName={d.officialname}
                rowData={this.state.rowData} //.shift to get different transactions
              />
            )),
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
  render() {
    return (
      <div
        className="ag-theme-alpine"
        style={{
          height: "300px",
          width: "800px",
        }}
      >
        {/*{this.state.tableTitle}*/}
        {this.state.tableList}
        {/*} <AgGridReact
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}
      ></AgGridReact>*/}
      </div>
    );
  }
}

export default withRouter(Table);
