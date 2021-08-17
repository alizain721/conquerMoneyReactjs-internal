import "./PublicProfile.css";
import React, { Component } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import $ from "jquery";
import AvatarEditor from "react-avatar-editor";
import {
  API_GENTILES_URL,
  API_URL,
  API_PROFILE,
  API_GET_PUBLIC_PROFILE,
} from "../../constants/apiConstants";

import { withRouter, Link } from "react-router-dom";

import anonAvatar from "../../img/anonProfilePicture.png";
import {GoogleApiWrapper} from 'google-maps-react';
import { Timer } from "@material-ui/icons";

function validateLocationChange(value) {
  const re = /[A-Za-z\s\-]+,\s?[A-Za-z]{2}$/;
  return re.test(String(value).toLowerCase());
}

class PublicProfile extends Component {
  constructor() {
    super();
    this.state = {
      profilePicture: null,
      picture: null,
      selectedFile: null,
      FirstName: "",
      LastName: "",
      title: "",
      description: "Hi Im new to conquer Money",
      num_post: 0,
      num_connection: 0,
      location: "",
      showForm: false,
      showPictureEditor: false,
      locationFalse: null,
      locationErrorMessage: "",
    };
  }

  getProfile() {

   // const userName = window.location.href.substr(36);
    const token = Cookie.get("token") ? Cookie.get("token") : null;
    //0onst token = window.location.href.substr(36);
    //console.log("What is my token: " + token);
    const payload = {
      token: token,
      accountID: window.location.href.substr(36),
    };
    axios
      .post(API_URL + API_GET_PUBLIC_PROFILE, payload)
      .then((response) => {
        if (response.status === 200) {
            console.log("sucesss");
          this.setState({
            FirstName: response.data.firstName,
            LastName: response.data.lastName,
            title: response.data.title,
            description: response.data.description,
            location: response.data.location,
            profilePicture: response.data.profilePicture,
            picture: response.data.profilePicture,
          });
        }
      })
      .catch(() => {
          console.log("error");
        this.props.showError("An error has occured");
      });
  }

  componentDidMount() {
    this.getProfile();
  }
  render() {
    return (
      <div className="profilePage">
        <div className="top_sec" id="top_sec">
          <div className="width100">
            <div className="top_sec2"></div>

            <img className="AvatarEditor" src={this.state.profilePicture} />
          </div>

          <div className="title_box">{this.state.title}</div>
          <div className="name_box">
            {this.state.FirstName + " " + this.state.LastName}
          </div>
          <div className="location_box">{this.state.location}</div>
          <div className="description_box">{this.state.description} </div>
          <div className="post_connect_box">
            <div className="connect_box_2">
              <div className="connect_text">posts</div>
              <div className="num_post">{this.state.num_post}</div>
            </div>
            <div className="connect_box_2">
              <div className="connect_text">friends</div>
              <div className="num_connect">{this.state.num_connection}</div>
            </div>
          </div>
        </div>

        <div className="mid_sec">
          <p>mid_sec</p>
        </div>
        <div className="bot_sec">
          <p>bot_sec</p>
        </div>
        <div className="random_container"></div>
      </div>
    );
  }
}
export default withRouter(PublicProfile);
