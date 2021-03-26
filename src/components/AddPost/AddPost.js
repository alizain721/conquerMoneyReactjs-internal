import React, { Component } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import { API_URL } from "../../constants/apiConstants";
import "./AddPost.css";
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
    };

    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.sendDetailsToServer = this.sendDetailsToServer.bind(this);
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

  sendDetailsToServer() {
    const token = Cookie.get("token") ? Cookie.get("token") : null;
    console.log("CONTENT: " + this.state.content);
    //console.log("POSTTYPEID: " + this.state.posttypeid);

    this.props.showError(null);
    const payload = {
      title: this.state.title,
      content: this.state.content,
      postType: this.state.postType,
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
      <div>
        <form>
        <div className="form-group">
            <textarea
              className="form-control"
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
              className="form-control"
              type="content"
              id="content"
              placeholder="What's happening?"
              maxLength="140"
              rows="7"
              cols="60"
              value={this.state.content}
              onChange={this.handleContentChange}
            ></textarea>
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

          <button
            type="button"
            id="submit"
            name="submit"
            className="btn-primary.custom-btn"
            onClick={() => this.sendDetailsToServer()}
          >
            Add Post
          </button>
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
