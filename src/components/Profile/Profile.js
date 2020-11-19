import "./Profile.css";
import "../HeaderDash/HeaderDash.css"
import React, { Component } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import { API_GENTILES_URL, API_URL, API_PROFILE } from "../../constants/apiConstants";
import { withRouter, Link } from "react-router-dom";



class Profile extends Component {
    constructor() {
      super();
      this.state = {
        successMessage: null,
      
       
      };
    }
   

    render() {
        return (
          <div className="main_wrapper">
                <div
                  className="profile" >
                  
                    <div className="top_section">
                    {/*top section*/}
                    
                            
                    </div> 
                  </div>
            </div>
        );
    }
}
       
    

export default withRouter(Profile);
