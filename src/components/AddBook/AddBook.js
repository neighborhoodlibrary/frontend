import React, { Component } from "react";
import BookMap from "./BookMap";

var booksApi = require("google-books-search");

export default class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: null,
      title: "",
      author: "",
      results: null,
      bookData: null
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.results === null) {
      return null;
    } else if (prevState.results !== this.state.results) {
      this.setState({
        type: null
      });
    }
  }

  handleChanges = e => {
    console.log(e);
    console.log(this.state);
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  bookSearch(type = `${this.state.type}`, entry) {
    var booksOptions = {
      field: type,
      offset: 0,
      limit: 10,
      type: "books",
      order: "relevance",
      lang: "en"
    };

    booksApi.search(entry, booksOptions, function(error, results, apiResponse) {
      if (!error) {
        console.log(results);
      } else {
        console.log(error);
      }
    });
  }

  formSubmit = e => {
    e.preventDefault();
    var resultsarr = this.bookSearch(
      this.state.type,
      this.state.type === "title" ? this.state.title : this.state.author
    );
    console.log(resultsarr);
  };

  render() {
    console.log(this.state.type);
    return (
      <div>
        <h2>Add a Book!</h2>
        <div>Choose search parameter: </div>
        <form>
          <label>
            Title
            <input
              type="radio"
              name="type"
              value="title"
              checked={this.state.type === "title"}
              onChange={this.handleChanges}
            />
          </label>
          <label>
            Author
            <input
              type="radio"
              name="type"
              value="author"
              checked={this.state.type === "author"}
              onChange={this.handleChanges}
            />
          </label>
        </form>

        <form onSubmit={this.formSubmit}>
          <input
            placeholder={this.state.type === "title" ? "title" : "author"}
            onChange={this.handleChanges}
            name={this.state.type === "title" ? "title" : "author"}
            value={
              this.state.type === null
                ? "Pick parameters first"
                : this.state.type === "title"
                ? this.state.title
                : this.state.author
            }
          />
          <button>Search</button>
        </form>
        <BookMap resultsarr={this.state.results} />
      </div>
    );
  }
}
