import React, { Component } from "react";
import { Jumbotron } from 'reactstrap';

export default class MainShelf extends Component {
  render() {
    return (
      <div>
        <Jumbotron>
          <h1 className="display-3">Hello, User!</h1>
          <p className="lead">Welcome to your personal shelf</p>
          <hr className="my-2" />
          <p>Here we gooooo!</p>
        </Jumbotron>
      </div>
    );
  }
}
