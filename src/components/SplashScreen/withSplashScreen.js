import React, { Component } from "react";
import avatar from "../../img/SpartanLogo.jpg";
import Loader from "react-loader-spinner";
import "./withSplashScreen.css";

function LoadingMessage() {
  return (
    <div className="splash-screen">
      Wait a moment while we load your app...
      <div className="imgcontainer">
        <img src={avatar} alt="avatar" className="avatar" />
      </div>
      <h1>
        <b>Conquer Money</b>
      </h1>
      <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} //3 secs
      />
    </div>
  );
}

function testFunction() {
  if (1 == 1) {
    return;
  }
}

function withSplashScreen(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: true,
      };
    }

    async componentDidMount() {
      try {
        await testFunction();
        setTimeout(() => {
          this.setState({
            loading: false,
          });
        }, 1500);
      } catch (err) {
        console.log(err);
        this.setState({
          loading: false,
        });
      }
    }

    render() {
      // while checking user session, show "loading" message
      if (this.state.loading) return LoadingMessage();

      // otherwise, show the desired route
      return <WrappedComponent {...this.props} />;
    }
  };
}

export default withSplashScreen;
