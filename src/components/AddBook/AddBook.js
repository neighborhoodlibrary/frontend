import React, { Component } from "react";
import BookMap from "./BookMap";
import styled from 'styled-components';

var booksApi = require("google-books-search");

const AddBookDiv = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Merriweather Sans', sans-serif;
`;

const AddBookForm = styled.form`
  display: flex;
  justify-content: space-around;

  input {
    padding: 10px;
    border-radius: 2px;
    width: 50%;
    border: 1px solid rgb(0,0,0,.2)
  }

  select {
    padding: 10px;
    border-radius: 2px;
    text-align: center;
    width: 10%;
    border: 1px solid rgb(0,0,0,.2)
  }

  button {
    padding: 10px;
    border-radius: 2px;
    width: 10%;
    border: 1px solid rgb(0,0,0,.2)
  }

  @media(max-width: 800px){
    flex-direction: column;
    align-items: center;

    input {
      width: 75%
      margin: 10px;
    }
  
    select {
      width: 30%
    }
  
    button {
      width: 20%
    }
  }
`;

export default class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: null,
      entry: "",
      results: [],
      bookData: null
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.results === null) {
      this.setState({
        results: []
      })
    } else if (prevState.results === undefined){
      this.setState({
        results: []
      });
    } else if (prevState.results !== this.state.results) {
      this.setState({
        type: null
      });
    }
  }

  handleChanges = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  formSubmit = e => {
    e.preventDefault();

    var booksOptions = {
      field: `${this.state.type}`,
      offset: 0,
      limit: 20,
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
      something(results);
    });
  };

  render() {
    return (
      <AddBookDiv>
        <AddBookForm onSubmit={this.formSubmit}>
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
        </AddBookForm>
        <BookMap resultsarr={this.state.results} />
      </AddBookDiv>
    );
  }
}
