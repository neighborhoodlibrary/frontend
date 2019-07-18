import React, { Component } from "react";
import BookMap from "./BookMap";
import firebase from "../../firebase/firebase.utils";

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

  bookSearch(type = 'title', entry) {
    var booksOptions = {
      field: type,
      offset: 0,
      limit: 10,
      type: "books",
      order: "relevance",
      lang: "en"
    };

    booksApi.search(entry, booksOptions, function(error, results, apiResponse) {
      const db = firebase.firestore();
      if (!error) {
        console.log(results);
        db.collection('books').doc().set({
          author: results[0].authors[0],
          description: results[0].description
        })
      } else {
        console.log(error);
      }
    });
  }

  formSubmit = e => {
    e.preventDefault();
    var resultsarr = this.bookSearch(
      this.state.type,
      this.state.entry  );
    console.log(resultsarr);
  };

  render() {
    console.log(this.state.type);
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
