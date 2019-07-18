import React, { Component } from "react";
import BookMap from "./BookMap";

var booksApi = require("google-books-search");

export default class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: null,
      entry: "",
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

  formSubmit = e => {
    e.preventDefault();

    var booksOptions = {
      field: `${this.state.type}`,
      offset: 0,
      limit: 10,
      type: "books",
      order: "relevance",
      lang: "en"
    };
    let something = results => {
      this.setState({
        results
      });
    };

    booksApi.search(this.state.entry, booksOptions, function(
      error,
      results,
      apiResponse
    ) {
      console.log(results);
      console.log(something);
      something(results);
    });
  };

  render() {
    console.log(this.state.type);
    console.log(this.state.results);
    return (
      <div>
        <h2>Add a Book!</h2>
        <form onSubmit={this.formSubmit}>
          <select onChange={this.handleChanges} name="type">
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="isbn">ISBN</option>
          </select>
          <input
            placeholder={this.state.type === null ? "title" : this.state.type}
            onChange={this.handleChanges}
            name="entry"
            value={this.state.value}
          />
          <button>Search</button>
        </form>
        <BookMap resultsarr={this.state.results} />
      </div>
    );
  }
}
