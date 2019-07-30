import React, { Component } from "react";
import BookMap from "./BookMap";
import styled from 'styled-components';
import { Form, Input, Button, Label } from 'reactstrap';

var booksApi = require("google-books-search");

const AddBookDiv = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Merriweather Sans', sans-serif;

  #sorryToInform {
    padding: 15px;
    font-size: 1.2em;
    justify-content: center;
    align-items: center;
  }
`;

const AddBookForm = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 3fr .8fr;
  grid-gap: 10px;


  @media(max-width: 800px){
    flex-direction: column;
    align-items: center;
  }
`;

export default class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "title",
      entry: "",
      results: [],
      bookData: null,
      apiChoice: "google"
    };
    this.formSubmit = this.formSubmit.bind(this);
  }

  handleChanges = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  formSubmit = e => {
    e.preventDefault();

    this.setState({
      results: []
    });

    let something = results => {
      this.setState({
        results
      });
    };

    if(this.state.apiChoice === "google") {

      var booksOptions = {
        field: `${this.state.type}`,
        offset: 0,
        limit: 20,
        type: "books",
        order: "relevance",
        lang: "en"
      };
  
      booksApi.search(this.state.entry, booksOptions, function(
        error,
        results,
        apiResponse
      ) {
        console.log(results);
        something(results);
      });

      return console.log("Success");
    } else if (this.state.apiChoice === "ol"){
        var searchType = {
          title: 'q=',
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
        }).then(function (body) {
            console.log(body)
            something(body);
        }).catch(function(err){
          console.log(err)
        })

        return console.log("Success")
    }

    this.setState({
      entry: ""
    })

    return console.log("formSubmit complete")
  };

  render() {
    return (
      <AddBookDiv>
        <Form onSubmit={this.formSubmit}>
              <AddBookForm>
                <div>
                  <Label>Api Choice</Label>
                  <Input type="select" onChange={this.handleChanges} name="apiChoice">
                    <option name="google" value="google">Google</option>
                    <option name= "ol" value="ol">Open Library</option>
                  </Input>
                </div>
                <div>
                  <Label>Search Type</Label>
                  <Input type="select" onChange={this.handleChanges} name="type">
                    <option name="title" value="title">Title</option>
                    <option name="author" value="author">Author</option>
                    <option name="isbn" value="isbn">ISBN</option>
                  </Input>
                </div>
                <div>
                  <Label>Entry</Label>
                  <Input
                    placeholder={this.state.type === null ? "title" : this.state.type}
                    onChange={this.handleChanges}
                    name="entry"
                    value={this.state.value}
                  />
                </div>
                <Button>Search</Button>
              </AddBookForm>
        </Form>
        {this.state.results ? (<BookMap resultsarr={this.state.results.docs ? this.state.results.docs : this.state.results} /> ) : <div id="sorryToInform">No results found</div>}
      </AddBookDiv>
    );
  }
}
