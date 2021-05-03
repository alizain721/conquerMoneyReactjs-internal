import "./PurchaseAnalysis.css";
import React, { useState, Component } from "react";
import PAcard from "./PAcard.js";

import map from "../../img/Map.png";
import axios from "axios";
import { API_GET_PA, API_URL } from "../../constants/apiConstants";
import Cookie from "js-cookie";

import { withRouter } from "react-router-dom";

function getLocation() {
  console.log("on GetLocation");
  
  if (navigator.geolocation) {
    var location = navigator.geolocation.getCurrentPosition(getPlaces);
    return location;
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

/*
 * We can use this API for more than stores (think restaurants)
 * Allow CORS
 * Here are the current supported types: https://developers.google.com/maps/documentation/places/web-service/supported_types 
 * Note however that only one type can be use at a time
*/
function getPlaces(position){
  console.log("In Places");
  var address = "";
  const key = "AIzaSyAcwSutjKBu4TtPpqB3ZXnuDqXn3cO-BJ0";      //Note this is my (Jose's) key  Read the documentation to see how to get another
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&rankBy=distance&types=restaurant&radius=500&key=${key}`     //You can find documentation here:https://developers.google.com/maps/documentation/places/web-service/search?hl=es_419
  //let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&keyword=cruise&key=${key}`
  fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    console.log(data.results[0].name);
    console.log(data.results[1].name);
    console.log(data.results[2].name);

  })
  .catch(err => console.warn("It didnt work"));
}


class PurchaseAnalysis extends Component {
  constructor() {
    super();

    this.state = {
      location: "",
      cardReward: "",
      cardName: "",
      cardDesc: "",
      cardList: [],
      closeLocation: ["Stop & Shop", "CVS Pharmacy", "Test"],
      successMessage: null,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(changeEvent) {
    this.setState({
      location: changeEvent.target.value,
    });
  }

  getCards() {
    if (this.state.location.length) {
      const token = Cookie.get("token") ? Cookie.get("token") : null;

      const payload = {
        location: this.state.location,
        token: token,
      };

      axios
        .post(API_URL + API_GET_PA, payload)
        .then((response) => {
          if (response.status === 200) {
            this.setState({
              cardsList: response.data.map((d) => (
                <PAcard
                  key={d.id}
                  rewardstype={d.rewardstype}
                  rewardsrate={d.rewardsrate}
                  officialname={d.officialname}
                  benefitname={d.benefitname}
                  userhas={d.userhas}
                  purchasecategory={d.purchasecategory}
                ></PAcard>
              )),
            });

            this.props.showError(null);
          } else if (response.status === 204) {
            this.props.showError("Invalid credentials.");
          } else {
            this.props.showError("Please enter a valid location.");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      this.props.showError("Please enter valid location");
    }
  }
  render() {
    return (
      <div className="top">
        <div className="card">
          <div className="location_card">
            <div className="container-fluid">
              <div className="row1">
                <div className="col-xs-12">
                  <h5 className="text-center section_title">
                    <b>Credit Card Analyzer </b>
                  </h5>
                </div>
              </div>
              <div className="row2">
                <div className="col-xs-12">
                  <h6 className="text-center current_location_tagline">
                    <b>Find the best card to boost your rewards</b>
                  </h6>
                </div>
              </div>
              <div className="row3">
                <div className="col-xs-6">
                  <input
                    type="location"
                    className="form-control"
                    id="location"
                    aria-describedby="emailHelp"
                    placeholder="Where are you charging?"
                    value={this.state.location}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="col-xs-6">
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => this.getCards()}
                  >
                    GO
                  </button>

                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => getLocation()}

                  >
                    Get location
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body heading_cardPA">
            <div>
              <b>It looks like you're near...</b>
            </div>
            <div className="container-fluid">
              <div className="row">
                <div className="col-4">
                  <p className="text-center name1">
                    <b> {this.state.closeLocation[0]} </b>
                  </p>
                  <p className="text-center name2">
                    <b> {this.state.closeLocation[1]} </b>
                  </p>
                  <p className="text-center name3">
                    <b> {this.state.closeLocation[2]} </b>
                  </p>
                </div>

                <div className="col-4">
                  <ul className="selects">
                    <li>
                      <p>Select</p>
                    </li>
                    <li>
                      <p>Select</p>
                    </li>
                    <li>
                      <p>Select</p>
                    </li>
                  </ul>
                </div>

                <div className="col-4">
                  <img
                    src={map}
                    className="img-responsive"
                    alt="current_location"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card2">
          <div className="purchase_card">
            <div className="container-fluid">
              <div className="row4">
                <div className=" col-xs-12">
                  <h5 className="Purchase_text">
                    <b>Best Card Options</b>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">{this.state.cardsList}</div>
      </div>
    );
  }
}

export default withRouter(PurchaseAnalysis);
