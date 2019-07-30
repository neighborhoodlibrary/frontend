import React, { Component } from "react";
const sgMail = require("@sendgrid/mail");

const apiKey = process.env.REACT_APP_SENDGRID_API_KEY;
sgMail.setApiKey(apiKey);

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
    console.log(`${e.target.name}: ${e.target.value} `);
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  submitEmail = e => {
    const msg = this.state;
    console.log(msg);
    e.preventDefault();
    sgMail.send(msg);
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

// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// const msg = {
//   to: 'test@example.com',
//   from: 'test@example.com',
//   subject: 'Sending with Twilio SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };
// sgMail.send(msg);
