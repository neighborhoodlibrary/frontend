import React, { Component } from 'react';
import BookMap from './BookMap';

var booksApi = require("google-books-search");

export default class AddBook extends Component {
    constructor(props){
        super(props);
        this.state = {
            type: null,
            title: "",
            results: null,
            bookData: null
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.results === null){
            return null
        } else if (prevState.results !== this.state.results) {
            this.setState({
                type: null
            })
        }
    }

    handleChanges = e => {
        console.log(this.state)
        this.setState({
          [e.target.name]: e.target.value
        });
      };
    

    bookSearch(type = 'title', entry){
        var booksOptions = {
            field: type,
            offset: 0,
            limit: 10,
            type: 'books',
            order: 'relevance',
            lang: 'en'
        }

        booksApi.search(entry, booksOptions, function(error, results, apiResponse) {
            if(!error){
                console.log(results)
            } else {
                console.log(error)
            }
        })
    }

    formSubmit = e => {
        e.preventDefault();
        var resultsarr = this.bookSearch(this.state.type, this.state.title);
        console.log(resultsarr)
    }

    render() {
        return (
            <div>
                <h2>Add a Book!</h2>
                <form onSubmit={this.formSubmit}>
                    <input placeholder="Title" onChange={this.handleChanges} name="title" value={this.state.title} />
                    <button>Search</button>
                </form>
                <BookMap resultsarr={this.state.results} />
            </div>
        )
    }
}
