import React, { useState } from "react";

import Header from "./components/Header/Header";
import LoginForm from "./components/LoginForm/LoginForm";
import Dashboard from "./components/Dashboard/Dashboard";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import Home from "./components/Home/Home";
import withSplashScreen from "./components/SplashScreen/withSplashScreen";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AlertComponent from "./components/AlertComponent/AlertComponent";
import PurchaseAnalysis from "./components/PurchaseAnalysis/PurchaseAnalysis";
import AddCard from "./components/AddCard/AddCard";

import "./App.css";

function App() {
  const [title, updateTitle] = useState(null);

  const [errorMessage, updateErrorMessage] = useState(null);
  return (
    <Router>
      <Header title={title} />
      <div className="App">
        <div className="container d-flex align-items-center flex-column">
          <Switch>
            <Route path="/" exact={true}>
              <LoginForm
                showError={updateErrorMessage}
                updateTitle={updateTitle}
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
      </div>
    </Router>
  );
}

export default withSplashScreen(App);
