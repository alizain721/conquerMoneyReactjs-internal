import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { API_URL } from "../../constants/apiConstants";
import axios from "axios";
import Cookie from "js-cookie";
import "./Tile.css";
import LikeCommentShare from "./LikeCommentShare.js";
import CommentPage from "./CommentPage.js";
import test_pic from "../../img/Map.png";
import hollowLikePic from "../../img/ProHTML/like.png";
import userLikedPic from "../../img/ProHTML/liked_big.png";
import othersLikedPic from "../../img/ProHTML/liked.png";
import comment from "../../img/ProHTML/comment.png";
import share from "../../img/ProHTML/share.png";
import Link from "../Plaid/Link.js";
import {
  Favorite,
  FavoriteBorder,
  AddComment,
  Share,
} from "@material-ui/icons";
import { red } from "@material-ui/core/colors";

class Tile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likesCount: this.props.likesCount,
      //change it back when it's working
      // isLiked: this.props.isLiked,
      isLiked: false,
    };
    this.addLike = this.addLike.bind(this);
    this.removeLike = this.removeLike.bind(this);
  }

  componentDidUpdate() {
    this.setState();
  }

  buttonAction() {
    if (this.props.insightid === 1) {
      this.props.history.push("/purchaseanalysis");
    } else if (this.props.insightid === 2) {
      this.props.history.push("/home");
    } else {
      this.props.history.push("/purchaseanalysis");
    }
  }
  handleClick = () => {
    this.props.history.push(`/post/${this.props.key}/${this.props.title}`);
  };

  //typeid = 1 Tile with button
  //typeid = 2 Tile with no button (informational)
  //typeid else Image Tile
  addLike = () => {
    this.setState({
      likesCount: this.state.likesCount + 1,
      isLiked: true,
    });
    const token = Cookie.get("token") ? Cookie.get("token") : null;
    const payload = {
      token: token,
      postId: this.props.postId,
      tileId: this.props.tileId,
    };
    axios.post(API_URL + "/addlike", payload).then((response) => {
      if (response.status !== 200) {
        this.setState({
          likesCount: this.state.likesCount - 1,
          isLiked: false,
        });
      }
    });
  };
  redirectToCommentPage() {
    this.props.history.push({
      pathname: "/commentPage",
      state: {
        title: this.props.title,
        content: this.props.content,
        createdBy: this.props.createdBy,
        image: this.props.image,
        likeable: this.props.likeable,
        commentable: this.props.commentable,
        shareable: this.props.likeable,
      },
    });
    this.props.updateTitle("CommentPage");
  }
  removeLike = () => {
    this.setState({
      likesCount: this.state.likesCount - 1,
      isLiked: false,
    });
    const token = Cookie.get("token") ? Cookie.get("token") : null;
    const payload = {
      token: token,
      postId: this.props.postId,
      tileId: this.props.tileId,
    };
    axios.post(API_URL + "/deletelike", payload).then((response) => {
      if (response.status !== 200) {
        this.setState({
          likesCount: this.state.likesCount + 1,
          isLiked: true,
        });
      }
    });
  };
  showButton1() {
    return (
      <button type="button" className="btn btn-primary custom-btn">
        {this.props.button1Text}
      </button>
    );
  }
  showButton2() {
    return (
      <button type="button" className="btn btn-primary custom-btn">
        {this.props.button2Text}
      </button>
    );
  }
  likeHandler() {
    this.state.isLiked ? this.removeLike() : this.addLike();
  }

  render() {
    return (
      <div className="tile_no_btn bg-white my-2">
        <div
          className="tile-container"
          onClick={() => {
            this.redirectToCommentPage();
          }}
        >
          <div className="row">
            <div className="col-12">
              <div className="PostIdRow">
                <div className="col-1"></div>
                <div className="col-2">
                  <img
                    src="https://organicthemes.com/demo/profile/files/2018/05/profile-pic.jpg"
                    className="avatartilestyle"
                  />
                </div>
                <div className="col-9 alignLeft">
                  <div className="IdFont">{this.props.createdBy}</div>
                  <div className="TagFont">Sample User Tag Line</div>
                </div>
              </div>

              <div className="tile_no_btn_top">
                <h4 className="financial_title proxima-bold text-capitalize mb-2 mt-3">
                  {this.props.title}
                </h4>
                <h5 className="financial_sub_text text-capitalize mb-0 grey-color">
                  {this.props.content}
                </h5>
                <img
                  id="postIMGID"
                  className="postImg"
                  src={this.props.image}
                />
              </div>
            </div>
          </div>
          <div>
            {this.props.button1Text == null ? null : this.showButton1()}
            {this.props.button2Text == null ? null : this.showButton2()}
          </div>
        </div>
        {this.props.likeable ||
        this.props.commentable ||
        this.props.shareable ? (
          <div>
            {/* <div className="col-12 likes_message">
              <span>
                {this.props.likesCount > 0 ? this.props.likesCount : ""}
              </span>
              <div className="like_comt_share_imgs">{}</div>
            </div> */}
            <div className="like_comt_share d-flex">
              {this.props.likeable ? (
                <div
                  className="d-flex"
                  onClick={() => {
                    this.likeHandler();
                  }}
                >
                  <span>
                    {this.state.isLiked ? (
                      <Favorite style={{ color: red[500] }} />
                    ) : (
                      <FavoriteBorder />
                    )}
                  </span>

                  <span className="l-c-s-text">Like</span>
                </div>
              ) : null}
              {this.props.commentable ? (
                <div
                  className="d-flex"
                  onClick={() => {
                    this.redirectToCommentPage();
                  }}
                >
                  <span> {<AddComment />} </span>
                  <span className="l-c-s-text">Comment</span>
                </div>
              ) : null}
              {this.props.shareable ? (
                <div className="d-flex">
                  <span> {<Share />} </span>
                  <span className="l-c-s-text">Share</span>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
export default withRouter(Tile);
