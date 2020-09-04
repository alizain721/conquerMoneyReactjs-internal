import React, { useState, Component } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import { API_URL } from "../../constants/apiConstants";
import "./AddPost.css";
import { withRouter } from "react-router-dom";
import { API_ADDPOST_URL } from "../../constants/apiConstants";

function AddPost(props) {
  const token = Cookie.get("token") ? Cookie.get("token") : null;

  const [state, setState] = useState({
    description: "",
    messagetypeid: "1",
    posttypeid: "",
    successMessage: null,
  });
  /*
  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
      posttypeid: e.target.value,
    }));
  };
  */

  const handleOptionChange = (changeEvent) => {
    setState({
      posttypeid: changeEvent.target.value,
    });
  };

  const handleDescChange = (changeEvent) => {
    setState({
      description: changeEvent.target.value,
    });
  };

  const sendDetailsToServer = () => {
    console.log("DESC: " + state.description);
    console.log("POSTTYPEID: " + state.posttypeid);

    if (state.description.length) {
      props.showError(null);
      const payload = {
        description: state.description,
        typeid: state.typeid,
        messagetypeid: "1",
        posttypeid: state.posttypeid,
        token: token,
      };
      axios
        .post(API_URL + API_ADDPOST_URL, payload)
        .then(function (response) {
          if (response.status === 200) {
            setState((prevState) => ({
              ...prevState,
              successMessage:
                "Post Added Succesfully. Redirecting to Dashboard..",
            }));
            setTimeout(() => {
              redirectToDash();
            }, 1500);

            props.showError(null);
          } else if (response.status === 204) {
            props.showError(
              "Token has expired you are being redirected to login..."
            );
            setTimeout(() => {
              redirectToLogin();
            }, 1500);
          } else {
            props.showError("Some error ocurred");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  const redirectToDash = () => {
    props.updateTitle("Dashboard");
    props.history.push("/dashboard");
  };
  const redirectToLogin = () => {
    props.updateTitle("Login");
    props.history.push("/login");
  };
  const handleSubmitClick = (e) => {
    e.preventDefault();

    sendDetailsToServer();
  };

  return (
    <div>
      <form>
        <div className="form-group">
          <textarea
            className="form-control"
            type="description"
            id="description"
            placeholder="What's happening?"
            maxlength="140"
            rows="7"
            cols="60"
            value={state.description}
            onChange={handleDescChange}
          ></textarea>
        </div>
        ​
        <div className="form-group">
          <div className="category">
            <label>
              <input
                type="radio"
                name="category"
                value="1"
                onChange={handleOptionChange}
                checked={state.posttypeid === "1"}
              />
              Option 1
            </label>
            <label>
              <input
                type="radio"
                name="category"
                value="2"
                onChange={handleOptionChange}
                checked={state.posttypeid === "2"}
              />
              Option 2
            </label>
            <label>
              <input
                type="radio"
                name="category"
                value="3"
                onChange={handleOptionChange}
                checked={state.posttypeid === "3"}
              />
              Option 3
            </label>
            <label>
              <input
                type="radio"
                name="category"
                value="4"
                onChange={handleOptionChange}
                checked={state.posttypeid === "4"}
              />
              Option 4
            </label>
          </div>
        </div>
        ​
        <button
          type="button"
          id="submit"
          name="submit"
          className="btn-primary.custom-btn"
          onClick={handleSubmitClick}
        >
          Add Post
        </button>
      </form>
      <div
        className="alert alert-success mt-2"
        style={{ display: state.successMessage ? "block" : "none" }}
        role="alert"
      >
        {state.successMessage}
      </div>
    </div>
  );
}

export default withRouter(AddPost);
