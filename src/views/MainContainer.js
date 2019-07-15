import React, { Component } from "react";
import Header from "../components/Header/Header";

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Header />
        <p>After Login container for all components</p>
      </div>
    );
  }
}

export default MainContainer;
