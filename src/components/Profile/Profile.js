import "./Profile.css";

import React, { Component } from "react";
import axios from "axios";
import Cookie from "js-cookie";

import { API_GENTILES_URL, API_URL } from "../../constants/apiConstants";
import { withRouter, Link } from "react-router-dom";
import Tile from "../Tile/Tile.js";

class Profile extends Component{
    constructor(){
        super();

        this.state = {
            successMessage = null,
            tiles: [],
            tileList: [],
            title: "test",
            description: "something",
        };
    }

    render(){
        return (
            <div classname="profilePage">
                <div classname="header">
                    <p>Test</p>
                </div>
            </div>
        );
    }
}
export default withRouter(Profile);