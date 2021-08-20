import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { API_URL } from "../../constants/apiConstants";
import axios from "axios";
import Cookie from "js-cookie";
import "./Tile.css";
import LikeCommentShare from "./LikeCommentShare.js";
import test_pic from "../../img/Map.png";

import hollowLikePic from "../../img/ProHTML/like.png";
import userLikedPic from "../../img/ProHTML/liked_big.png";
import othersLikedPic from "../../img/ProHTML/liked.png";
import comment from "../../img/ProHTML/comment.png";
import share from "../../img/ProHTML/share.png";
import Link from "../Plaid/Link.js";


class Tile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likesCount: this.props.likesCount,
      isLiked: this.props.isLiked,
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

  render() {
    
      return (
        <div className="tile_no_btn bg-white my-2">
          <div className="tile-container">
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
              <LikeCommentShare
                key={this.props.key}
                likesCount={this.state.likesCount}
                isLiked={this.state.isLiked}
                removeLike={this.removeLike}
                addLike={this.addLike}
                likeable={this.props.likeable}
                commentable={this.props.commentable}
                shareable={this.props.shareable}
              />
            ) : null}
        </div>
      );
    

    // else if (this.props.postType === "TWO") {
    //   return (
    //     <div className="tile_no_btn bg-white my-2">
    //       <div className="container">
    //         <div className="row">
    //           <div className="col-12">
    //             <div className="tile_no_btn_top">
    //               <h4 className="financial_title proxima-bold text-capitalize mb-2 mt-3">
    //                 <div onClick={this.handleClick}>{this.props.title}</div>
    //               </h4>
    //               <h5
    //                 className="financial_sub_text text-capitalize mb-0 grey-color"
    //                 onClick={this.handleClick}
    //               >
    //                 {this.props.content}
    //               </h5>
    //               <img className="postImg" src={this.props.postPicture} />
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       <LikeCommentShare
    //         key={this.props.key}
    //         likesCount={this.state.likesCount}
    //         isLiked={this.state.isLiked}
    //         removeLike={this.removeLike}
    //         addLike={this.addLike}
    //       />
    //     </div>
    //   );
    // }
    // else if (this.props.postType === "THREE") {
    //   //IMG TILE
    //   return (
    //     <div className="tile_no_btn bg-white my-2">
    //       <div className="container-fluid">
    //         <div className="row">
    //           <div className="col-12">
    //             <div className="tile_no_btn_top">
    //               <h4 className="financial_title proxima-bold text-capitalize mb-2 mt-3">
    //                 {this.props.title}
    //               </h4>
    //               <div className="tile_img_box">
    //                 <img
    //                   src={test_pic}
    //                   className="img-fluid mx-auto d-block"
    //                   alt="avatar"
    //                 />
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       <LikeCommentShare
    //         key={this.props.key}
    //         likesCount={this.state.likesCount}
    //         isLiked={this.state.isLiked}
    //         removeLike={this.removeLike}
    //         addLike={this.addLike}
    //       />
    //     </div>
    //   );
    // }
  }
}
export default withRouter(Tile);
