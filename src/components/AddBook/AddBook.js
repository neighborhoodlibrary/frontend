import React, { Component } from "react";
import BookMap from "./BookMap";
import styled from 'styled-components';
import { Form, Input, Button, FormGroup } from 'reactstrap';

var booksApi = require("google-books-search");

const AddBookDiv = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Merriweather Sans', sans-serif;
`;

const AddBookForm = styled.form`
  width: 100%;
  display: flex;
  justify-content: space-around;

  input {
    width: 50%;
  }

  select {
    width: 10%;
  }

  button {
    width: 10%;
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
      type: "query",
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

    // booksApi.search(this.state.entry, booksOptions, function(
    //   error,
    //   results,
    //   apiResponse
    // ) {
    //   console.log(results);
    //   something(results);
    // });

    var searchType = {
      query: 'q=',
      author: 'author=',
      isbn: 'isbn='
    }  

    var query = this.state.entry;
    var rp = require("request-promise");
    var url = "https://openlibrary.org/search.json?" +
    searchType[this.state.type] + query;

    rp({
        url: url,
        json: true
    }).catch(function(err){
        console.log(err)
    }).then(function (body) {
        console.log(body)
        something(body);
    })


  };

  render() {
    return (
      <AddBookDiv>
        <Form onSubmit={this.formSubmit}>
              <AddBookForm>
                <Input type="select" onChange={this.handleChanges} name="type">
                  <option value="title">Title</option>
                  <option value="author">Author</option>
                  <option value="isbn">ISBN</option>
                </Input>
                <Input
                  placeholder={this.state.type === null ? "title" : this.state.type}
                  onChange={this.handleChanges}
                  name="entry"
                  value={this.state.value}
                />
                <Button>Search</Button>
              </AddBookForm>
        </Form>
        <BookMap resultsarr={this.state.results.docs} />
      </AddBookDiv>
    );
  }
}
