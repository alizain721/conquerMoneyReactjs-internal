import React, { Component } from "react";
import "./HeaderDash.css";

import { withRouter } from "react-router-dom";
import notification from "../../img/ProHTML/notification.png";
//import profile_image from "../../img/ProHTML/profile_image.png";
import profile from "../../img/ProHTML/profile.jpg";

import Cookie from "js-cookie";
import axios from "axios";
import {
  API_GETBALANCECREDIT_URL,
  API_URL,
  API_GET_HEADERDASH,
} from "../../constants/apiConstants";

class HeaderDash extends Component {
  //try authentification here

  constructor() {
    super();

    this.state = {
      balance: null,
      credit: null,
      cash: null,
      cards: null,
      investments: null,
    };
  }

  redirectToProfile() {
    this.props.history.push("/profile");
    this.props.updateTitle("Profile");
  };

  getCashCardsInvest() {
    const token = Cookie.get("token") ? Cookie.get("token") : null;
    const payload = {
      token: token,
    };
    axios
      .post(API_URL + API_GET_HEADERDASH, payload)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            cash: response.data.totalCash,
            cards: response.data.totalDebt,
            investments: response.data.totalInvestments,
          });
        } else if (response.status === 204) {
          console.log("204");
        } else {
          console.log("else");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getCreditAndBalance() {
    //this.setState({});

    const token = Cookie.get("token") ? Cookie.get("token") : null;
    const payload = {
      username: "USD",
      token: token,
    };
    axios
      .post(API_URL + API_GETBALANCECREDIT_URL, payload)
      .then((response) => {
        if (response.status === 200) {
          // var accounts = response.data;
          // const listItems = stuff.map((number) => <li>{number}</li>);
          // this.setState({ accountList: accounts });

          this.setState({
            balance: response.data.balance,
            credit: response.data.creditLimit,
          });
        } else if (response.status === 204) {
          console.log("204");
        } else {
          console.log("else");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getCreditAndBalance();
    //this.getCashCardsInvest();
  }

  render() {
    return (
      <div className="main_wrapper">
        <div
          className="header-top-sec pb-2"
          onClick={() => {
            this.redirectToProfile(); //clicking on the profile picture redirects to profile page
            
          }}
        >
          <div className="top_section">
            {/*top section*/}
            <div className="container">
              {/*container*/}
              
              <div className="row  no-gutters align-items-center avaliableBalance">
                

                {/*row*/}
                
                <div className="col-4 ">
                  <div className="balance_section">
                    <div className="available_balance">
                      <h4>
                        &#36;<span>{this.state.balance}</span>
                      </h4>
                      <h5 className="text-capitalize margintop0" >available balance</h5>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="credit_section marginleft2 ">
                    <div className="credit_balance">
                      <h4>
                        &#36;<span>{this.state.credit}</span>
                      </h4>
                      <h5 className="text-capitalize margintop0">credit balance</h5>
                    </div>
                  </div>
                </div>
                
                  
                
              </div>{" "}
              
              <div className="d-flex align-items-center profile_notification_section">
                  
                    <div className="profile_img">
                      <img
                        className="img-fluid mx-auto d-block"
                        src={profile}
                        alt="profile"
                      />
                    </div>
                  </div>
                  <div className="d-flex align-items-center profile_notification_section2">
              <div class="notification-box">
              <span class="notification-count">N</span>
              <div class="notification-bell">
            <span class="bell-top"></span>
           <span class="bell-middle"></span>
           <span class="bell-bottom"></span>
           <span class="bell-rad"></span>
            </div>
            </div>
            </div>
              {/*row*/}
            </div>{" "}
            {/*container*/}
          </div>{" "}
          {/*top section*/}
        </div>
      </div>
    );
  }
}
export default withRouter(HeaderDash);
