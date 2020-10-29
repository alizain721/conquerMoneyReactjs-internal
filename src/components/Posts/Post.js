import React, { Component } from "react";
import {Link, withRouter} from "react-router-dom";
import Cookie from "js-cookie";
import axios from "axios";
import {API_GETPOST_URL, API_URL} from "../../constants/apiConstants";
class Post extends Component {
    constructor() {
        super();
        this.state = {
            description: null,
            likes: null,
            comments: [],
        };
    }

    getPost() {
        const token = Cookie.get("token") ? Cookie.get("token") : null;
        const payload = {
            username: "admin",
            token: token,
            id: this.props.match.params.id,
        };
        axios
            .post(API_URL + API_GETPOST_URL, payload)
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        description: response.data.description,
                        likes: response.data.likes,
                        comments: response.data.comments
                    });
                }
            }).catch(() => {
            this.props.showError("An error has occured")
        })
    }
    componentDidMount() {
        this.props.updateTitle(this.props.match.params.title)
        this.getPost()
    }
    render() {
        return (
            <div>
                {this.state.description}
                {this.state.likes === null ? (
                    <p>No likes ):</p>
                ) : (
                    <p>{this.state.likes}</p>
                )}
                {this.state.comments === null ? (
                    <p>No comments</p>
                ) : (
                    <p>{this.state.comments.map((data) => (
                        //TODO this is just placeholder not actual names
                        <div>
                            <p>{data.comment}</p>
                            <p>{data.user}</p>
                        </div>
                    ))}</p>
                )}
            </div>
        )

    }
}

export default withRouter(Post);
