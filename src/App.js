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
import Post from './components/Posts/Post';
import ResetPassword from "./components/ResetPassword/ResetPassword";
import EmailVerification from "./components/ResetPassword/EmailVerification";
import Settings from "./components/Settings/Settings";
import CommentPage from "./components/Tile/CommentPage";


//import { makeStyles } from "@material-ui/core/styles";

import "./App.css";
import "./device.css";
import "./style.css";

import "./responsive-style.css";
import BottomNav from "./components/BottomNav/BottomNav";

import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-loader-spinner";
import Transactions from "./components/Transactions/Transactions";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import AddPost from "./components/AddPost/AddPost";
import Accounts from "./components/Accounts/Accounts";
import Profile from "./components/Profile/Profile";

import PublicProfile from "./components/PublicProfile/publicProfile";
import FriendPage from "./components/FriendPage/FriendPage";
//import { Settings } from "@material-ui/icons";

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
      <DisplayHeader
        isLoggedIn={isLoggedIn}
        title={title}
        updateTitle={updateTitle}
      />
      <div className="App">
        <LoadingIndicator />

        <div className="container2 d-flex align-items-center flex-column">
          <Switch>
            <Route path="/post/:id/:title" exact={true}>
              <Post showError={updateErrorMessage} updateTitle={updateTitle} />
            </Route>
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
              <Transactions
                showError={updateErrorMessage}
                updateTitle={updateTitle}
              ></Transactions>
            </Route>

            <Route path="/accounts">
              <Accounts
                showError={updateErrorMessage}
                updateTitle={updateTitle}
              ></Accounts>
            </Route>

            <Route path="/addpost">
              <AddPost
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

            <Route path="/profile">
              <Profile showError={updateErrorMessage} />
            </Route>

            <Route path="/publicProfile">
              <PublicProfile showError={updateErrorMessage} />
            </Route>

            <Route path="/FriendPage">
              <FriendPage showError={updateErrorMessage} />
            </Route>

            <Route path="/settings">
              <Settings
                showError={updateErrorMessage}
                updateTitle={updateTitle}
              />
            </Route>

            <Route
              path="/commentPage"
              render={(props) => (
                <CommentPage
                  showError={updateErrorMessage}
                  updateTitle={updateTitle}
                  {...props}
                />
              )}
            />
            

            <Route path="/resetPassword">
              <ResetPassword
                showError={updateErrorMessage}
                updateTitle={updateTitle}
              />
            </Route>

            <Route path="/emailVerification">
              <EmailVerification
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
      <footer className="footer">
        <BottomNav
          showError={updateErrorMessage}
          updateTitle={updateTitle}
        ></BottomNav>
      </footer>
    </Router>
  );
}

export default withSplashScreen(App);
