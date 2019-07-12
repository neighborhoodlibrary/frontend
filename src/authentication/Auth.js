import React, { Component } from "react";

const Auth = MainContainer => Landing =>
  class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loggedIn: false
      };
    }

    componentDidMount() {
      if (localStorage.getItem("uid")) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    }
    logOut = () => {
      this.setState({ loggedIn: false });
    };

    render() {
      return <div>{this.state.loggedIn ? <MainContainer /> : <Landing />}</div>;
    }
  };

export default Auth;
