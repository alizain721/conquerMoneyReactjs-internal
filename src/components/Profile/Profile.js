import "./Profile.css";
import React, { Component } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import {  API_URL,  API_GET_PROFILE } from "../../constants/apiConstants";
import { withRouter, Link } from "react-router-dom";



class Profile extends Component {
    constructor() {
      super();
      this.state = {
        profile_pic: null,
        FirstName : "",
        LastName : "",
        title: "",
        description: "",
        num_post: 0,
        num_connection: 0,
        location: "",
      };
    }

      redirectToEditProfile()  {
        this.props.history.push("/editprofile");
      }
      handleClick() {
        console.log("CLICK");
      }


      getProfile() {
        const token = Cookie.get("token") ? Cookie.get("token") : null;
        const payload = {
          token: token,
        };
        axios
            .post(API_URL + API_GET_PROFILE, payload)
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        FirstName : response.data.firstName,
                        LastName : response.data.lastName,
                        title: response.data.title,
                        description: response.data.description,
                        location:response.data.location,
                    });
                }
            }).catch(() => {
            this.props.showError("An error has occured")
        })
    }
    componentDidMount() {
        this.getProfile()
    }

      render() {
        return (
          <div className= "Profile">
              <div className="top_sec">
                <div className= "circle">
                </div> 
              </div> 
              <div className="name_box"
              >{this.state.FirstName+" "+this.state.LastName}</div>  
              <div className="title_box"
              >{this.state.title}</div> 
              <div className="upper_line"></div>
              <div className="description_box"
              >{this.state.description}</div>
              <div className="location_box"
              >{this.state.location}</div>
              <div className="num_post"
              >{this.state.num_post}</div>
              <div className="num_connect"
              >{this.state.num_connection}</div>
              <div  className="lower_line"></div>
              <button
              type="button"
              name="edit profile"
              className="edit_profile"
              onClick={() => {
                this.redirectToEditProfile();
              }}
              > Edit Profile
              </button>
              <div className= "random_container"></div>
              
        </div>       
      )
    }        
  }  
    

       
    

export default withRouter(Profile);
