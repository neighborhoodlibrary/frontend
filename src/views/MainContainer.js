import React, { Component } from "react";
import Header from "../components/Header/Header";
import MyShelf from "./MyShelf/MyShelf";

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Header />
        <MyShelf />
      </div>
    );
  }
}

export default MainContainer;
