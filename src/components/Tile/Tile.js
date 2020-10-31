import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./Tile.css";
import test_pic from "../../img/Map.png";
import g1 from "../../img/ProHTML/g1.png";
import g2 from "../../img/ProHTML/g2.png";
import g3 from "../../img/ProHTML/g3.png";
import like from "../../img/ProHTML/like.png";
import comment from "../../img/ProHTML/comment.png";
import share from "../../img/ProHTML/share.png";
import Link from "../Plaid/Link.js";
import income from "../../img/ProHTML/Income.png";
import expense from "../../img/ProHTML/Expense.png";

class Tile extends Component {
  constructor(props) {
    super();

    this.state = {};
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
    this.props.history.push(`/post/${this.props.data.id}/${this.props.data.title}`);
  }

  //typeid = 1 Tile with button
  //typeid = 2 Tile with no button (informational)
  //typeid else Image Tile

  render() {
    if (this.props.typeid === 1) {
      return (
        <div className="tile_no_btn bg-white my-2">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="tile_no_btn_top">
                  <h4 className="financial_title proxima-bold text-capitalize mb-2 mt-3">
                    {this.props.title}
                  </h4>
                  <h5 className="financial_sub_text text-capitalize mb-0 grey-color">
                    {this.props.description}
                  </h5>
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
          </div>
        </div>
      );
    } else if (this.props.typeid === 2) {
      return (
        <div className="tile_no_btn bg-white my-2">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="tile_no_btn_top">
                  <h4 className="financial_title proxima-bold text-capitalize mb-2 mt-3">
                    <div onClick={this.handleClick}>{this.props.title}</div>
                  </h4>
                  <h5 className="financial_sub_text text-capitalize mb-0 grey-color"
                      onClick={this.handleClick}
                  >
                    {this.props.description}
                  </h5>
                </div>
              </div>
            </div>
          </div>

          <div className="like_comt_share">
            <a className="comment_a">
              <div className="like_comt_share_imgs">
                <img src={like} alt="like" />
              </div>
              <span>like</span>
            </a>
            <a className="comment_a">
              {" "}
              {/*href="www.etc.com"*/}
              <div className="like_comt_share_imgs">
                <img src={comment} alt="comment" />
              </div>
              <span>Comment</span>
            </a>
            <a className="comment_a">
              <div className="like_comt_share_imgs">
                <img src={share} alt="share" />
              </div>
              <span>Share</span>
            </a>
          </div>
        </div>
      );
    } else if (this.props.typeid === 3) {
      //IMG TILE
      return (
        <div className="tile_no_btn bg-white my-2">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="tile_no_btn_top">
                  <h4 className="financial_title proxima-bold text-capitalize mb-2 mt-3">
                    {this.props.title}
                  </h4>
                  <div className="tile_img_box">
                    <img
                      src={test_pic}
                      className="img-fluid mx-auto d-block"
                      alt="avatar"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (this.props.typeid === 4) {
      //PLAID TILE
      return (
        <div className="tile_no_btn bg-white my-2">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="tile_no_btn_top">
                  <h4 className="financial_title proxima-bold text-capitalize mb-2 mt-3">
                    Get Started with Plaid!
                  </h4>
                  <Link updateTitle={this.props.updateTitle}></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (this.props.typeid === 5) {
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
          <div className="like_comt_share">
            <a className="comment_a">
              <div className="like_comt_share_imgs">
                <img src={like} alt="like" />
              </div>
              <span>like</span>
            </a>
            <a className="comment_a">
              <div className="like_comt_share_imgs">
                <img src={comment} alt="comment" />
              </div>
              <span>Comment</span>
            </a>
            <a className="comment_a">
              <div className="like_comt_share_imgs">
                <img src={share} alt="share" />
              </div>
              <span>Share</span>
            </a>
          </div>
        </div>
      );
    } else if (this.props.typeid === 6) {
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
                  <p className="grey-color">
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
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
export default withRouter(Tile);
