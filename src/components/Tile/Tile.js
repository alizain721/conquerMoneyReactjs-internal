import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { API_URL } from "../../constants/apiConstants";
import axios from "axios";
import Cookie from "js-cookie";
import "./Tile.css";
import LikeCommentShare from "./LikeCommentShare.js";
import test_pic from "../../img/Map.png";
import g1 from "../../img/ProHTML/g1.png";
import g2 from "../../img/ProHTML/g2.png";
import g3 from "../../img/ProHTML/g3.png";
import hollowLikePic from "../../img/ProHTML/like.png";
import userLikedPic from "../../img/ProHTML/liked_big.png";
import othersLikedPic from "../../img/ProHTML/liked.png";
import comment from "../../img/ProHTML/comment.png";
import share from "../../img/ProHTML/share.png";
import Link from "../Plaid/Link.js";
import income from "../../img/ProHTML/Income.png";
import expense from "../../img/ProHTML/Expense.png";

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

  redirectToPA() {
    this.props.updateTitle("Purchase Analysis");
    this.props.history.push("/purchaseanalysis");
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
  redirectToFriends() {
    this.props.history.push("/friendPage");
    this.props.updateTitle("FriendPage");
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

  render() {
    if (this.props.postType === "SIX") {
      return (
        <div className="financial_feed mb-2">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="titile_desc py-2 py-sm-4 ">
                  <h4 className="financial_title proxima-bold text-capitalize mb-2">
                    {" "}
                    Financial feed{" "}
                  </h4>
                  <h5 className="text-capitalize mb-0 ">monthly cash flow</h5>
                  <p className="financial_text grey-color">
                    Here's a look where your money went this month
                  </p>
                </div>
                <div className="percentage_progress">
                  <div className="per_pro_dertail percentage_progress_1">
                    <div className="set-size charts-container">
                      <div className="pie-wrapper progress-45 style-2">
                        <span className="label">
                          45<span className="smaller">%</span>
                        </span>
                        <div className="pie">
                          <div className="left-side half-circle"></div>
                          <div className="right-side half-circle"></div>
                        </div>
                        <div className="shadow"></div>
                      </div>
                    </div>
                  </div>
                  <div className="per_pro_dertail progress_detail">
                    <div className="progress_icon_text">
                      <span className="income_expense_text grey-color">
                        <img src={income} alt="income" /> Income{" "}
                      </span>
                      <h4>
                        $<span>2300.45</span>
                      </h4>
                    </div>
                  </div>
                  <div className="per_pro_dertail percentage_progress_2">
                    <div className="set-size charts-container">
                      <div className="pie-wrapper progress-45 style-2">
                        <span className="label">
                          45<span className="smaller">%</span>
                        </span>
                        <div className="pie">
                          <div className="left-side half-circle"></div>
                          <div className="right-side half-circle"></div>
                        </div>
                        <div className="shadow"></div>
                      </div>
                    </div>
                  </div>
                  <div className="per_pro_dertail progress_detail">
                    <div className="progress_icon_text">
                      <span className="income_expense_text grey-color">
                        <img src={expense} alt="expense" /> Expense
                      </span>
                      <h4>
                        $<span>2300.45</span>
                      </h4>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-primary custom-btn"
                  onClick={() => this.redirectToPA()}
                >
                  Credit Card Analyzer
                </button>
                <button
                  type="button"
                  className="btn btn-primary custom-btn"
                  onClick={() => this.redirectToFriends()}
                >
                  Friends
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (this.props.postType === "FOUR") {
      //PLAID TILE
      return null;
    } else if (this.props.postType === "FIVE") {
      return (
        <div className="spending_descreases bg-white my-2">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="spending_descreases_top">
                  <h4 className="financial_title proxima-bold text-capitalize mb-2 mt-3">
                    {" "}
                    Spending Decrease{" "}
                  </h4>
                  <h5 className="financial_sub_text text-capitalize mb-0 grey-color">
                    Your purchases in November were lower than usal{" "}
                  </h5>
                  <div className="spending_graph d-flex justify-content-between py-3">
                    <div className="sg_block sg_1">
                      <div className="sg_img">
                        <img src={g1} alt="g1" />
                      </div>
                      <p className="sg_per">40%</p>
                    </div>
                    <div className="sg_block sg_2">
                      <div className="sg_img">
                        <img src={g2} alt="g2" />
                      </div>
                      <p className="sg_per">15%</p>
                    </div>
                    <div className="sg_block sg_3">
                      <div className="sg_img">
                        <img src={g3} alt="g3" />
                      </div>
                      <p className="sg_per">10%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="tile_no_btn bg-white my-2">
          <div className="container">
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
              {this.props.likeable ? (
                <LikeCommentShare
                  key={this.props.key}
                  likesCount={this.state.likesCount}
                  isLiked={this.state.isLiked}
                  removeLike={this.removeLike}
                  addLike={this.addLike}
                />
              ) : null}
            </div>
          </div>
        </div>
      );
    }

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
