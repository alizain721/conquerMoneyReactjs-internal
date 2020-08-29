import React, { useState } from "react";
 
import DisplayHeader from "./components/DisplayHeader/DisplayHeader";
import LoginForm from "./components/LoginForm/LoginForm";
import Dashboard from "./components/Dashboard/Dashboard";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm"; 
import Home from "./components/Home/Home";
import withSplashScreen from "./components/SplashScreen/withSplashScreen";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AlertComponent from "./components/AlertComponent/AlertComponent";
import PurchaseAnalysis from "./components/PurchaseAnalysis/PurchaseAnalysis";
import AddCard from "./components/AddCard/AddCard"; 

//import { makeStyles } from "@material-ui/core/styles"; 

import "./App.css";
import BottomNav from "./components/BottomNav/BottomNav";

import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-loader-spinner";
import Table from "./components/Table/Table"; 
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

// const useStyles = makeStyles({
//   root: {
//     width: 500,
//   },
// });

const LoadingIndicator = (props) => {
  const { promiseInProgress } = usePromiseTracker();
  return (
    promiseInProgress && (
      <div
        style={{
          width: "100%",
          height: "100",
          display: "flex",
          zIndex: "9999",

          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Loader
          type="ThreeDots"
          color="#2BAD60"
          height="100"
          width="100"
          z-index="9999"
        />
      </div>
    )
  );
};

function App() {
  const [title, updateTitle] = useState(null);

  const [errorMessage, updateErrorMessage] = useState(null);

  const [isLoggedIn, updateIsLoggedIn] = useState(false);
  /*
  const [state, setState] = useState({
    columnDefs: [
      {
        headerName: "Make",
        field: "make",
        sortable: true,
        filter: true,
      },
      {
        headerName: "Model",
        field: "model",
        sortable: true,
        filter: true,
      },
      {
        headerName: "Price",
        field: "price",
        sortable: true,
        filter: true,
      },
    ],
    /*
    rowData: [
      {
        make: "Toyota",
        model: "Celica",
        price: 35000,
      },
      {
        make: "Ford",
        model: "Mondeo",
        price: 32000,
      },
      {
        make: "Porsche",
        model: "Boxter",
        price: 72000,
      },
    ],
    
  });

  useEffect(() => {
    if ({ title } === "Transactions") {
      fetch(
        "https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/sample-data/smallRowData.json"
      )
        .then((result) => result.json())
        .then((rowData) => setState({ rowData }));
    }
  });
*/
  return (
    <Router>
      <DisplayHeader isLoggedIn={isLoggedIn} title={title} />
      <div className="App">
        <LoadingIndicator />
        {/*<Tile LoadingIndicator={LoadingIndicator} updateTitle={updateTitle} />*/}
        <div className="container d-flex align-items-center flex-column">
          <Switch>
            <Route path="/" exact={true}>
              <LoginForm
                showError={updateErrorMessage}
                updateTitle={updateTitle}
                updateIsLoggedIn={updateIsLoggedIn}
              />
            </Route>
            <Route path="/register">
              <RegistrationForm
                showError={updateErrorMessage}
                updateTitle={updateTitle}
              />
            </Route>
            <Route path="/transactions">
              <Table
                showError={updateErrorMessage}
                updateTitle={updateTitle}
              ></Table>
            </Route>

            <Route path="/login">
              <LoginForm
                showError={updateErrorMessage}
                updateTitle={updateTitle}
                updateIsLoggedIn={updateIsLoggedIn}
              />
            </Route>
            <Route path="/home">
              <Home showError={updateErrorMessage} updateTitle={updateTitle} />
            </Route>
            <Route path="/dashboard">
              <Dashboard
                showError={updateErrorMessage}
                updateTitle={updateTitle}
              />
            </Route>
            <Route path="/purchaseanalysis">
              <PurchaseAnalysis
                showError={updateErrorMessage}
                updateTitle={updateTitle}
              />
            </Route>

            <Route path="/addcard">
              <AddCard
                showError={updateErrorMessage}
                updateTitle={updateTitle}
              />
            </Route>
          </Switch>

          <AlertComponent
            errorMessage={errorMessage}
            hideError={updateErrorMessage}
          />
        </div>
        <footer className="footer">
          <BottomNav></BottomNav>
        </footer>
      </div>
    </Router>
  );
}

export default withSplashScreen(App);
