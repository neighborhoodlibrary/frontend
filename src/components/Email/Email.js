import React, { Component } from "react";
import Axios from "axios";
const URL = "https://neighborhoodlibraryback.herokuapp.com/email";

class Email extends Component {
  constructor(props) {
    super(props);
    this.state = {
      to: "",
      from: "",
      subject: "",
      text: "",
      html: ""
    };
  }

  inputHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  submitEmail = e => {
    const msg = this.state;
    e.preventDefault();
    Axios.post(URL, msg).then(res => {
      console.log(res.data);
    });
  };

  render() {
    return (
      <div>
        <p>Email Component:</p>
        <form onSubmit={this.submitEmail}>
          <input
            type="email"
            placeholder="to-email"
            name="to"
            onChange={this.inputHandler}
            value={this.state.to}
          />
          <input
            type="email"
            placeholder="from-email"
            name="from"
            onChange={this.inputHandler}
            value={this.state.from}
          />
          <input
            type="text"
            placeholder="subject, or title"
            name="subject"
            onChange={this.inputHandler}
            value={this.state.subject}
          />
          <textarea
            type="text"
            placeholder="body of text"
            name="text"
            onChange={this.inputHandler}
            value={this.state.text}
          />
          <input
            type="text"
            placeholder="html????"
            name="html"
            onChange={this.inputHandler}
            value={this.state.html}
          />
          <button type="onSubmit">submit email</button>
        </form>
      </div>
    );
  }
}

export default Email;
