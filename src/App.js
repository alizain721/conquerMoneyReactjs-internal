import React, { useState } from "react";

import Header from "./components/Header/Header";
import DisplayHeader from "./components/DisplayHeader/DisplayHeader";
import LoginForm from "./components/LoginForm/LoginForm";
import Dashboard from "./components/Dashboard/Dashboard";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import HeaderDash from "./components/HeaderDash/HeaderDash";
import Home from "./components/Home/Home";
import withSplashScreen from "./components/SplashScreen/withSplashScreen";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AlertComponent from "./components/AlertComponent/AlertComponent";
import PurchaseAnalysis from "./components/PurchaseAnalysis/PurchaseAnalysis";
import AddCard from "./components/AddCard/AddCard";
import Tile from "./components/Tile/Tile";

import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

import "./App.css";
import BottomNav from "./components/BottomNav/BottomNav";

import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-loader-spinner";

const useStyles = makeStyles({
  root: {
    width: 500,
  },
});

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
