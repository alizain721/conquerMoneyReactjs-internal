import "./Profile.css";
import "./pictureeditor.css"
import React, { Component } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import  MyEditor from "./pictureeditor";
import { API_GENTILES_URL, API_URL, API_PROFILE, API_GET_PROFILE, API_UPDATE_PROFILE } from "../../constants/apiConstants";

import { withRouter, Link } from "react-router-dom";

import anonAvatar from "../../img/anonProfilePicture.png";

function validateLocationChange(value) {
  const re = /[A-Za-z\s\-]+,\s?[A-Za-z]{2}$/;
  return re.test(String(value).toLowerCase());
}
class Profile extends Component {
    constructor() {
      super();
      this.state = {
        profilePicture: null,
          profilePictureSrc: null,
          selectedFile: null ,
        FirstName : "",
        LastName : "",
        title: "",
        description: "Hi Im new to conquer Money",
        num_post: 0,
        num_connection: 0,
        location: "",
        showForm: false,
        showPictureEditor: false,
        locationFalse: null,
        locationErrorMessage: ""
      };

      this.handleSubmitClick= this.handleSubmitClick.bind(this);
      this.handleTitleChange= this.handleTitleChange.bind(this);
      this.handleDescriptionChange= this.handleDescriptionChange.bind(this);
      this.handleLocationChange= this.handleLocationChange.bind(this);
      //this.handleAvatarChange=this.handleAvatarChange.bind(this);

      this.myEditor= new MyEditor;
    }
     
      handleClick() {
        console.log("CLICK");
      }

    handleSubmitClick(e) {
        debugger
        if(!validateLocationChange(this.state.location)){
          this.setState({
            locationErrorMessage: "Location must be of the form: \"New York, NY\"",
            locationFalse: true
          })
            e.preventDefault();
        }
        else{
          this.setState({
            locationErrorMessage: null,
            locationFalse: false
          })
          this.sendDetailsToServer();   
        }   
      }
      // handleAvatarChange(e){
      //   this.setState({
      //     profilePictureSrc: e.target.value,
          
      //   })
      // }

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
                  <textarea className= "form_control" type= "description" id= "description" value={this.state.description} onChange={this.handleDescriptionChange} maxLength= "150"></textarea>
                </div>

                <div className= "edit_profile_form_group"> 
                  <p>Location:</p>
                  <textarea className= "form_control" type= "location" id= "location" value={this.state.location} onChange={this.handleLocationChange} maxLength= "20"></textarea>
                </div>
                
                <div
                  className="locationErrorMessage"
                  style= {{display: this.state.locationFalse ? "block" : "none" }}
                >
                  <p>{this.state.locationErrorMessage}</p>
                </div>

              <button
                type="submit"
                onClick={this.handleSubmitClick}
              >
                Submit
              </button>
              <button
                type="submit"
                onClick={() => this.setState({showForm: false}) }
              >
                Cancel
              </button>
            </form>
        );
      }
    fetchPictureData=(editorData)=>{
          this.setState({
          profilePicture: editorData.picture,
            profilePictureSrc: editorData.src
        })
      }
      editPicture(){
        
        return(
          <div className="edit_profile_form">
            <div className="edit_profile_form_group">
              <MyEditor
                pictureEditorData={this.fetchPictureData}
                // value={{
                // picture: this.state.profilePicture,
                // src: this.state.profilePictureSrc}} 
                // onChange={()=> this.uploadPicture}
                >
              </MyEditor>
              <button
              onClick={() => this.uploadPicture()} 
              >
                Upload
              </button>
              <button
      onClick={() => this.setState({showPictureEditor: false}) }>
        Cancel
      </button>
            </div>
          </div>
        );
        
      }
    uploadPicture() {
        console.log(this.state.selectedFile)
        const token = Cookie.get("token") ? Cookie.get("token") : null;
        const payload = {
            token: token,
        };
        axios
            .post(API_URL + API_UPDATE_PROFILE, payload)
            .then((response) => {
                if (response.status === 200) {
                }
            }).catch(() => {
                this.props.showError("An error has occured")
            })

        this.setState({
          showPictureEditor: false, 
           //profilePicture: this.myEditor.state.picture,
           //profilePictureSrc: this.myEditor.state.src,
        })
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
          <div className="profilePage">
          
              <div className="top_sec">

                

                <div class="hover11">
                  {/*Current bug: Hover effect is applied outside of the img might be a problem with Top sec, hover 11 or img */}
                  <button 
                className= "AvatarEditor"
                onClick={() => this.setState({showPictureEditor: true})}>
                  <img src={this.state.profilePictureSrc}
                      />
                </button> 
                  {/*<figure><img src= {anonAvatar} alt ="anonAvatar" className= "anonAvatar" /></figure>*/}
                 </div> 

              </div> 
              
              {this.state.showPictureEditor ? this.editPicture() : null}
                <div className="name_box">
                    {this.state.FirstName + " " + this.state.LastName}
                </div>  
                <div className="title_box">
                    {this.state.title}
                </div> 
              <div className="upper_line"></div>
              <div className="description_box"
              >{this.state.description} </div>
              <div className="location_box"
              >{this.state.location}</div>
              <div className="num_post"
              >{this.state.num_post}</div>
              <div className="num_connect"
              >{this.state.num_connection}</div>
              <div  className="lower_line"></div>
              <div>
                <button
                  className="edit_profile_button"
                  onClick={() => this.setState({showForm: true}) }
                > Edit Profile
                </button>
                {this.state.showForm ? this.showForm() : null}
              </div>
              <div className= "random_container">
                
              <img src={this.state.profilePictureSrc}
                      />
              </div>
              
                        </div>
                    
      )
    }        
  }  
export default withRouter(Profile);
