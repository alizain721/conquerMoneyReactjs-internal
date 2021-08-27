import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { API_URL } from "../../constants/apiConstants";
import comment from "../../img/ProHTML/comment.png";
import share from "../../img/ProHTML/share.png";
import "./Tile.css";
import "./CommentPage.css";
import {
  Favorite,
  FavoriteBorder,
  AddComment,
  Share,
} from "@material-ui/icons";
import { red } from "@material-ui/core/colors";

class CommentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.location.state.title,
    };
  }
  showComments() {
    return (
      <div className="comment-section">
        <div className="eachComment">
          <div className="commentIdRow">
            <div className="col-2 comment-avatar-row">
              <img
                src="https://organicthemes.com/demo/profile/files/2018/05/profile-pic.jpg"
                className="comment-avatar"
              />
            </div>
            <div className="col-9 alignLeft">
              <div className="IdFont">Sample User</div>
              <div className="TagFont">Sample User Tag Line</div>
            </div>
          </div>
          <div className="tile_no_btn_top">
            <h4 className="financial_title  mb-2 mt-3">Sample comment</h4>

            <img
              id="postIMGID"
              className="postImg"
              src={this.props.location.state.image}
            />
          </div>
        </div>
        <hr></hr>
        <div className="eachComment">
          <div className="commentIdRow">
            <div className="col-2 comment-avatar-row">
              <img
                src="https://organicthemes.com/demo/profile/files/2018/05/profile-pic.jpg"
                className="comment-avatar"
              />
            </div>
            <div className="col-9 alignLeft">
              <div className="IdFont">Sample User</div>
              <div className="TagFont">Sample User Tag Line</div>
            </div>
          </div>
          <div className="tile_no_btn_top">
            <h4 className="financial_title  mb-2 mt-3">Sample comment</h4>

            <img
              id="postIMGID"
              className="postImg"
              src={this.props.location.state.image}
            />
          </div>
        </div>
        <hr></hr>
      </div>
    );
  }
  noCommentMessage() {
    return (
      <div className="comment-section">
        <h5 className="financial_title proxima-bold text-capitalize mb-2 mt-3">
          Comment Closed
        </h5>
      </div>
    );
  }

  render() {
    return (
      <div className="commentPage">
        <div className="goBack" onClick={() => window.history.back()}>
          <div>
            <span className="arrow arrow-left"></span>
          </div>
        </div>

        <div className="tile-section">
          <div className="tile-container2">
            <div className="row">
              <div className="col-12">
                <div className="PostIdRow">
                  <div className="col-2 comment-avatar-row">
                    <img
                      src="https://organicthemes.com/demo/profile/files/2018/05/profile-pic.jpg"
                      className="avatartilestyle"
                    />
                  </div>
                  <div className="col-9 alignLeft">
                    <div className="IdFont">
                      {this.props.location.state.createdBy}
                    </div>
                    <div className="TagFont">Sample User Tag Line</div>
                  </div>
                </div>

                <div className="tile_no_btn_top">
                  <h4 className="financial_title proxima-bold text-capitalize mb-2 mt-3">
                    {this.props.location.state.title}
                  </h4>
                  <h5 className="financial_sub_text text-capitalize mb-0 grey-color">
                    {this.props.location.state.content}
                  </h5>
                  <img
                    id="postIMGID"
                    className="postImg"
                    src={this.props.location.state.image}
                  />
                </div>
              </div>
            </div>
          </div>
          {this.props.location.state.likeable ||
          this.props.location.state.commentable ||
          this.props.location.state.shareable ? (
            <div>
              <div className="col-12 likes_message">
                <span>
                  {this.props.likesCount > 0 ? this.props.likesCount : ""}
                </span>
                <div className="like_comt_share_imgs">
                  {/* {othersLikedIndicator} */}
                </div>
              </div>
              <div className="like_comt_share d-flex">
                {this.props.location.state.likeable ? (
                  <div className="d-flex">
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
                {this.props.location.state.commentable ? (
                  <div className="d-flex">
                    <span> {<AddComment />} </span>
                    <span className="l-c-s-text">Comment</span>
                  </div>
                ) : null}
                {this.props.location.state.shareable ? (
                  <div className="d-flex">
                    <span> {<Share />} </span>
                    <span className="l-c-s-text">Share</span>
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
        {this.props.location.state.commentable == false
          ? this.noCommentMessage()
          : this.showComments()}
      </div>
    );
  }
}
export default withRouter(CommentPage);
