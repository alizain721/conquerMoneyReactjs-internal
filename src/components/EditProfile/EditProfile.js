import "../Profile/Profile.css";
import "./EditProfile.css";
import React, { Component } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import { API_GENTILES_URL, API_URL, API_PROFILE, API_GET_PROFILE } from "../../constants/apiConstants";
import { withRouter, Link } from "react-router-dom";

var osiris_stub ={
  First_Name: "Kelly ",
  Last_Name: "Ngaruko",
  title:"Recent grad",
  description: null ,
  number_posts: 0,
  number_connec: 0,
  location:"Dallas,TX"
  };

class EditProfile extends Component {
    constructor() {
      super();
     
      this.state = {
        //profile_pic: null,
        firstName :"",
        lastName : "",
        title: "",
        description: "",
        num_post: "",
        num_connection: "",
        location: "",
        };
      }
      

      redirectToProfile()  {
        this.props.history.push("/profile");
      }
    
            
      render(){
          return(
        
        <div className="top_sec">Edit Profile
        <div>
        <form className= "Profile_form">
        <label htmlFor="title">Title</label>
        <input
          type="title"
          className="enter_title"
          id="title"
          placeholder="Enter title"
          value= {this.state.title}
          />
        <label >{this.state.description}</label>
        <input
          type="description"
          className="enter_description"
          id="description"
          placeholder="Enter description"
          
        />
        <label htmlFor="location">Location</label>
        <input
          type="location"
          className="enter_location"
          id="location"
          placeholder="Enter location"
          value={this.state.location}
        />
        <input 
        type="submit"
        onClick={this.sendDetailsToServer()}
        />
      </form>
      </div>
      </div>
      )
    };
}

export default withRouter(EditProfile)
export var osiris_stub;