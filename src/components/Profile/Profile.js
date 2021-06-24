import "./Profile.css";
import "./pictureeditor.css"
import React, { Component } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import $ from 'jquery';
import AvatarEditor from 'react-avatar-editor'
import { API_GENTILES_URL, API_URL, API_PROFILE, API_GET_PROFILE, API_UPDATE_PROFILE, API_UPDATE_PICTURE } from "../../constants/apiConstants";
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
        picture: null,
        croppedimg: null,
        imageDestination:"",
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
      
    handleUploadClick() {
      
       this.sendPictureToServer();   
       this.setState({
        showPictureEditor: false, 
         
         profilePicture: this.state.croppedimg,
      })   
      }
      /* handleAvatarChange(e){
         this.setState({
          profilePictureSrc: e.target.value,
         })
       } */

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
      
      sendPictureToServer() {
        const token = Cookie.get("token") ? Cookie.get("token") : null;
        const payload = {
          token : token,
          profilePicture: this.state.croppedimg,
          
        };
        axios
        
        .post(API_URL + API_UPDATE_PICTURE, payload)
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
    /* fetchPictureData=(editorData)=>{
          this.setState({
          profilePicture: editorData.picture,
            profilePictureSrc: editorData.src
        })
      } */
      editPicture(){
        
        return(
          <div className="edit_profile_form">
            <div className="edit_profile_form_group">
            <div className='editorForm' > 
            <input
              name= "newImage"
              type='file'
              onChange={this.handleNewImage.bind(this)}
            />
        
       <AvatarEditor
        ref={this.setEditorRef}
        image={this.state.picture}
        width={250}
        height={250}
        border={30}
        borderRadius={100}
        color={[255, 255, 255, 0.6]} 
        scale={1.2}
        rotate={0}
      />

      <button
        onClick={()=>this.handleSave()}>
        Save
      </button>
      
      <img src={this.state.croppedimg}/>
      </div>
              <button onClick={() => this.handleUploadClick()} >
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
      setEditorRef = (editor) => this.editor = editor
      handleNewImage = (e) => {
        this.setState({ picture: e.target.files[0] })
      }
      sendData=()=>{this.props.pictureEditorData(this.state)}
      handleSave = (data) => {
        const img = this.editor.getImageScaledToCanvas().toDataURL()
        const rect = this.editor.getCroppingRect()
    
        this.setState({
          croppedimg : img,
         
        })
      }
    /* uploadPicture() {
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
      } */

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
                        profilePicture:response.data.profilePicture,
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
              <div className="width100">
                <div className="top_sec2"></div>       
                <button className="AvatarEditor" onClick={() => this.setState({ showPictureEditor: true })}>
                  <img className="ProfilePic" src={this.state.profilePicture} />
                </button>
              </div> 
              <div className="title_box">
                {this.state.title}
              </div>
              <div className="name_box">
                {this.state.FirstName + " " + this.state.LastName}
              </div>
              <div className="location_box"
              >{this.state.location}</div>
              <div className="description_box" 
              >{this.state.description} </div>
              <div className="post_connect_box">
                <div className="num_post"
                >{this.state.num_post}</div>
                <div className="num_connect"
                >{this.state.num_connection}</div>
            </div>
            </div>
            {this.state.showPictureEditor ? this.editPicture() : null}
            <div className="upper_line"></div>
            <div  className="lower_line"></div>
            <button
              className="edit_profile_button"
              onClick={() => this.setState({showForm: true}) }
              > Edit Profile
            </button>
            {this.state.showForm ? this.showForm() : null}
             <div className= "random_container">
                
              </div> 
          </div>
                    
      )
    }        
  }  
export default withRouter(Profile);
