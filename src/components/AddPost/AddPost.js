import React, { Component } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import { API_GET_PROFILE, API_URL } from "../../constants/apiConstants";
import "./AddPost.css";
import AvatarEditor from "react-avatar-editor";
import { withRouter } from "react-router-dom";
import { API_ADDPOST_URL } from "../../constants/apiConstants";


class AddPost extends Component {
  constructor() {
    super();

    //MessageTypeID and PostTypeID commented out for now to work with Tiles.

    this.state = {
      title: "",
      content: "",
      postType: "TWO",
      //messagetypeid: "1",
      //posttypeid: "",
      successMessage: "",
      picture: null,
      FirstName: "",
      LastName: "",
      postPicture: null,
      profilePicture: null,
    };

    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.sendDetailsToServer = this.sendDetailsToServer.bind(this);
  }
  getProfilePicture() {
    const token = Cookie.get("token") ? Cookie.get("token") : null;
    const payload = {
      token: token,
    };
    axios
      .post(API_URL + API_GET_PROFILE, payload)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            profilePicture: response.data.profilePicture,
            FirstName: response.data.firstName,
            LastName: response.data.lastName,
          });
        }
      })
      .catch(() => {
        this.props.showError("An error has occured");
      });
  }

  handleOptionChange(changeEvent) {
    this.setState({
      postType: changeEvent.target.value,
    });
  }

  handleTitleChange(changeEvent) {
    this.setState({
      title: changeEvent.target.value,
    });
  }

  handleContentChange(changeEvent) {
    this.setState({
      content: changeEvent.target.value,
    });
  }
  setEditorRef = (editor) => (this.editor = editor);
  handleNewImage = (e) => {
    var wholeImg = e.target.files[0];

    this.toDataUrl(URL.createObjectURL(wholeImg, 0.7), (myBase64) => {
      this.setState({ postPicture: myBase64 });
    });
  };
  //convert
  toDataUrl = (url, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      const reader = new FileReader();
      reader.onloadend = () => {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  };
  componentDidMount() {
    this.getProfilePicture();
  }

  sendDetailsToServer() {
    setTimeout(() => {
      const token = Cookie.get("token") ? Cookie.get("token") : null;
      console.log("CONTENT: " + this.state.content);
      //console.log("POSTTYPEID: " + this.state.posttypeid);

      this.props.showError(null);
      const payload = {
        title: this.state.title,
        content: this.state.content,
        postType: this.state.postType,
        image: this.state.postPicture,
        //messagetypeid: "1",
        //posttypeid: this.state.posttypeid,
        token: token,
      };
      axios
        .post(API_URL + API_ADDPOST_URL, payload)
        .then((response) => {
          if (response.status === 200) {
            this.setState({
              successMessage:
                "Post Added Succesfully. Redirecting to Dashboard..",
            });
            setTimeout(() => {
              this.redirectToDash();
            }, 1500);

            this.props.showError(null);
          } else if (response.status == 401) {
            this.props.showError(
              "Token has expired you are being redirected to login..."
            );
            setTimeout(() => {
              this.redirectToLogin();
            }, 1500);
          } else {
            this.props.showError("Some error ocurred");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }, 1000);
  }
  redirectToDash() {
    this.props.updateTitle("Dashboard");
    this.props.history.push("/dashboard");
  }
  redirectToLogin() {
    this.props.updateTitle("Login");
    this.props.history.push("/login");
  }

  render() {
    return (
      <div className="postPage">
        <div className="post-header d-flex">
          <div className="post-userinfo d-flex">
            <div className="post-profile-img profile_img">
              <img
                className="img-fluid mx-auto d-block"
                src={this.state.profilePicture}
                alt="profile"
              />
            </div>
            <div className="post-name d-flex">
              
              {this.state.FirstName + " " + this.state.LastName}
            </div>
          </div>

          <button
            type="button"
            id="submit"
            name="submit"
            className="btn btn-primary custom-btn post-btn"
            onClick={() => this.sendDetailsToServer()}
          >
            Post
          </button>
        </div>
        <form className="no-border">
          <div className="form-group">
            <textarea
              className="form-control100 post-text"
              type="title"
              id="title"
              placeholder="Title goes here"
              maxLength="30"
              value={this.state.title}
              onChange={this.handleTitleChange}
            ></textarea>
          </div>

          <div className="form-group">
            <textarea
              className="form-control100 post-text"
              type="content"
              id="content"
              placeholder="What do you want to talk about?"
              maxLength="140"
              rows="7"
              cols="60"
              value={this.state.content}
              onChange={this.handleContentChange}
            ></textarea>
          </div>
          <div className="form-group alignLeft">
            <label for="file-upload" className="custom-file-upload">
              <i className="material-icons">&#xe439;</i>
            </label>
            <input
              name="newImage"
              id="file-upload"
              type="file"
              onChange={this.handleNewImage.bind(this)}
            />
            <img className="uploadImg" src={this.state.postPicture} />
          </div>

          <div className="form-group">
            <div className="category">
              <label>
                <input
                  type="radio"
                  name="category"
                  value="ONE"
                  onChange={this.handleOptionChange}
                  //checked={this.state.posttypeid === "1"}
                />
                Option 1
              </label>
              <label>
                <input
                  type="radio"
                  name="category"
                  value="TWO"
                  onChange={this.handleOptionChange}
                  //checked={this.state.posttypeid === "2"}
                />
                Option 2
              </label>
              <label>
                <input
                  type="radio"
                  name="category"
                  value="THREE"
                  onChange={this.handleOptionChange}
                  //checked={this.state.posttypeid === "3"}
                />
                Option 3
              </label>
              <label>
                <input
                  type="radio"
                  name="category"
                  value="FOUR"
                  onChange={this.handleOptionChange}
                  //checked={this.state.posttypeid === "4"}
                />
                Option 4
              </label>
            </div>
          </div>
        </form>
        <div
          className="alert alert-success mt-2"
          style={{ display: this.state.successMessage ? "block" : "none" }}
          role="alert"
        >
          {this.state.successMessage}
        </div>
      </div>
    );
  }
}

export default withRouter(AddPost);
