import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import comment from "../../img/ProHTML/comment.png";
import share from "../../img/ProHTML/share.png";
import "./Tile.css";
import {Favorite, FavoriteBorder, AddComment, Share} from '@material-ui/icons';
import { red} from "@material-ui/core/colors";



class LikeCommentShare extends Component {
    constructor(props) {
        super(props);
        this.state ={};
    }
    
    render() {
        var likeHandler = this.props.isLiked
            ?this.props.removeLike
            :this.props.addLike;
        var othersLikedIndicator = (this.props.likesCount < 1)
            ?<p></p>
            :<Favorite style={{color:red[500],fontSize: 15 }}/>;
        var likeButtonIcon = this.props.isLiked
            ?<Favorite style={{color:red[500]}}/>
            :<FavoriteBorder/>;

        
        
        return (
          <div>
            {/* <div className="col-12 likes_message">
              <span>
                {this.props.likesCount > 0 ? this.props.likesCount : ""}
              </span>
              <div className="like_comt_share_imgs">{othersLikedIndicator}</div>
            </div> */}
            <div className="like_comt_share d-flex">
              {this.props.likeable ? (
                <div className="d-flex" onClick={likeHandler}>
                  <span> {likeButtonIcon} </span>
                  <span className="l-c-s-text">Like</span>
                </div>
              ) : null}
              {this.props.commentable ? (
                <div className="d-flex">
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
        );
    }
}
export default withRouter(LikeCommentShare);