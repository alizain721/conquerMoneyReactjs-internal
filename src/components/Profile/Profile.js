import "./Profile.css";
import "../HeaderDash/HeaderDash.css"
import "../HeaderDash/HeaderDash"
import React, { Component } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import { API_GENTILES_URL, API_URL, API_PROFILE, API_GET_PROFILE, API_UPDATE_PROFILE } from "../../constants/apiConstants";
import { withRouter, Link } from "react-router-dom";
import { Height } from "@material-ui/icons";


function validateLocationChange(value) {
  const re = /[A-Za-z\s\-]+,\s?[A-Za-z]{2}/;
  return re.test(String(value).toLowerCase());
}

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
        showForm: false,
        locationFalse: null,
        locationErrorMessage: ""
      };

      this.handleSubmitClick= this.handleSubmitClick.bind(this);
      this.handleTitleChange= this.handleTitleChange.bind(this);
      this.handleDescriptionChange= this.handleDescriptionChange.bind(this);
      this.handleLocationChange= this.handleLocationChange.bind(this);
    }

      
      handleClick() {
        console.log("CLICK");
      }

      handleSubmitClick(e) {
        if(!validateLocationChange(this.state.location)){
            this.state.locationErrorMessage = "Location must be of the form: \"New York, NY\"";
            this.state.locationFalse = true;
            e.preventDefault();
        }
        else{
          this.state.locationErrorMessage = null;
          this.state.locationFalse = false;
          this.sendDetailsToServer();   
        }   
      }

      handleTitleChange(e){
        this.setState({
          title: e.target.value
        })
      }

      handleDescriptionChange(e){
        this.setState({
          description: e.target.value
        })
      }

      handleLocationChange(e){
          this.setState({
            location: e.target.value,
          });
      }

      sendDetailsToServer() {
        const token = Cookie.get("token") ? Cookie.get("token") : null;
        const payload = {
          token : token,
          title: this.state.title,
          description: this.state.description,
          location: this.state.location
        };
        axios
        .post(API_URL + API_UPDATE_PROFILE, payload)
        .then((response) => {
          if (response.status === 200) {
            this.getProfile();
          }
        }).catch(() => {
          this.props.showError("An error has occured")
        })
      }

      showForm (){
        return(
            <form className= "edit_profile_form">
                <div className= "edit_profile_form_group">
                  <p>Title:</p>
                  <textarea className= "form_control" type= "title" id = "title" value={this.state.title} onChange={this.handleTitleChange} maxLength= "50"></textarea>
                </div>

                <div className= "edit_profile_form_group">
                  <p>Description:</p>
                  <textarea className= "form_control" type= "description" id= "description" value={this.state.description} onChange={this.handleDescriptionChange} maxLength= "100"></textarea>
                </div>

                <div className= "edit_profile_form_group"> 
                  <p>Location:</p>
                  <textarea className= "form_control" type= "location" id= "location" value={this.state.location} onChange={this.handleLocationChange} maxLength= "20"></textarea>
                </div>
                
                <div
                  className="loctationErrorMessage"
                  style={{ display: this.state.locationErrorMessage && this.state.locationFalse ? "block" : "none" }}
                >
                  <p>{this.state.locationErrorMessage}</p>
                </div>

              <button
                type="submit"
                onClick={this.handleSubmitClick}
              >
                Submit
              </button>
            </form>
        );
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
              <div>
                <button
                  type="button"
                  name="edit profile"
                  className="edit_profile_button"
                  onClick={() => this.setState({showForm: true}) }
                > Edit Profile
                </button>
                {this.state.showForm ? this.showForm() : null}
              </div>
              <div className= "random_container"></div>
              
        </div>       
      )
    }        
  }  
export default withRouter(Profile);
