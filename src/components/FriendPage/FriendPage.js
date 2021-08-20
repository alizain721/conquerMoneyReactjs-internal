import "./FriendPage.css";
import React, { Component } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import $ from "jquery";
import AvatarEditor from "react-avatar-editor";
import {
  API_URL,
  API_GET_PUBLIC_PROFILE,
  API_GET_FRIEND_LIST,
  API_CREATE_FRIEND_REQUEST,
} from "../../constants/apiConstants";

import { withRouter, Link } from "react-router-dom";

import anonAvatar from "../../img/anonProfilePicture.png";
import {GoogleApiWrapper} from 'google-maps-react';
import { Timer } from "@material-ui/icons";

function validateLocationChange(value) {
  const re = /[A-Za-z\s\-]+,\s?[A-Za-z]{2}$/;
  return re.test(String(value).toLowerCase());
}

class FriendPage extends Component {
  constructor() {
    super();
    this.state = {
      FriendList: [],
      ProfileList: [],
    };
  }

 
  /*
  * TODO -> Eventually we will need to either pass the user current friendList to avoid repeats
    or simply change the function in the backend to the same
  */
 
  getFriendList() {
      const token = Cookie.get("token") ? Cookie.get("token") : null;
      
      const payload = {
          token: token,
      };
      axios
      .post(API_URL + API_GET_FRIEND_LIST, payload)
      .then((response) => {
        if (response.status === 200) {
            console.log("sucesss");
            //console.log(response.data);
            const keys = Object.keys(response.data);
            console.log(keys);
            const values = Object.values(response.data);
            console.log(values);
          this.setState({
            FriendList: keys,
            ProfileList: values
          });
          console.log("Lets see");
          console.log(this.state.FriendList);
          console.log(this.state.ProfileList[0].firstName);
        }
      })
      .catch(() => {
        console.log("error in getFriendList");
      this.props.showError("An error has occured");
    });
  }

  createFriendRequest(friends){
    console.log(friends);
    const token = Cookie.get("token") ? Cookie.get("token") : null;
    const FriendUserName = friends;
      
    const payload = {
        token: token,
        accountID: FriendUserName,
    };
    axios
    .post(API_URL + API_CREATE_FRIEND_REQUEST, payload)
    .then((response) => {
      if (response.status === 200) {
          console.log("sucesss");
      }
    })
    .catch(() => {
      console.log("error in CreateFriendList");
    this.props.showError("An error has occured");
  });
  }

  addDefaultSrc(ev) {
    ev.target.src = "https://i.imgur.com/RsPiQHZ.png" // this could be an imported image or url
  }


  componentDidMount() {
      if(Cookie.get("token")){
        //this.randomData();
        this.getFriendList();
      }
}
  render() {
    return (
      <div className="ProfilePage">
        {this.state.FriendList.map((friends, i) => (
          <div key={`Friends-${i}`}>
            <div className="recommended_friends">
              <div className="">
                <Link to={"publicProfile/" + friends}>
                  <img
                    src={this.state.ProfileList[i].profilePicture}
                    alt="loading"
                    onError={this.addDefaultSrc}
                    width="64"
                    height="64"
                  />
                </Link>
              </div>
              <div className="recommended_friend">
                <h3>
                  {this.state.ProfileList[i].firstName +
                    " " +
                    this.state.ProfileList[i].lastName}
                </h3>
                <p>
                  <button
                    className="friend_button btn btn-primary custom-btn"
                    onClick={() => this.createFriendRequest(friends)}
                  >
                    Add as a friend
                  </button>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
export default withRouter(FriendPage);
