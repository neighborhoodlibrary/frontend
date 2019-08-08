import React, { useState } from "react";
import BookMap from "./BookMap";
import styled from "styled-components";
import { useAlert } from "react-alert";
import { Form, Input, Button, Label } from "reactstrap";
import Axios from "axios";
//
const booksApi = require("google-books-search");
//
const rp = require("request-promise");
//
// const goodreadsKey = process.env.REACT_APP_GOODREADS_API_KEY;
// const URL = "https://neighborhoodlibraryback.herokuapp.com";
const URL = "http://localhost:9500";

const AddBookDiv = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Merriweather Sans", sans-serif;

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
  grid-template-columns: 1fr 1fr 3fr 0.8fr;
  grid-gap: 10px;

  @media (max-width: 800px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ButtonDiv = styled.div`
  margin-top: 32px;
`;

const Space = styled.span`
  margin-left: 15px;
  margin-right: 15px;
`;

const AddBook = () => {
  const alert = useAlert();
  const [values, setValues] = useState({
    apiChoice: "google",
    searchType: "title",
    entry: ""
  });
  const [bookResults, setBookResults] = useState([]);

  const handleChanges = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const formSubmit = e => {
    e.preventDefault();
    alert.info(`Please wait searching the ${values.apiChoice} books api...`);
    if (values.apiChoice === "google") {
      let booksOptions = {
        field: `${values.searchType}`,
        offset: 0,
        limit: 20,
        type: "books",
        order: "relevance",
        lang: "en"
      };

      booksApi.search(values.entry, booksOptions, function(
        error,
        results,
        apiResponse
      ) {
        console.log(results);
        setBooksFunc(results);
      });
    } else if (values.apiChoice === "goodreads") {
      let body = {
        query: values.entry,
        search: values.searchType
      };
      let booksHolderArr = [];
      let finalgrBooksArr = [];
      async function asyncForEach(arr, cb) {
        for (let i = 0; i < arr.length; i++) {
          await cb(arr[i], i, arr);
        }
      }
      Axios.post(`${URL}/goodreads`, body)
        .then(res => {
          booksHolderArr = res.data;
        })
        .then(() => {
          console.log(booksHolderArr);
          const aFunc = async () => {
            await asyncForEach(booksHolderArr, async book => {
              let secondBody = { bookId: book.best_book[0].id[0]._ };
              await Axios.post(`${URL}/grdetails`, secondBody).then(res => {
                finalgrBooksArr.push(res);
              });
            });
            console.log(finalgrBooksArr);
          };
          aFunc();
        });
    } else if (values.apiChoice === "ol") {
      let searchType = {
        title: "q=",
        author: "author=",
        isbn: "isbn="
      };
      let query = values.entry;
      let url =
        "https://openlibrary.org/search.json?" +
        searchType[values.searchType] +
        query;

      rp({
        url: url,
        json: true
      })
        .then(function(body) {
          let results = body.docs;
          if (results.length > 20) {
            results = results.slice(0, 20);
          }
          console.log(results);
          setBooksFunc(results);
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  };

  const setBooksFunc = results => {
    setBookResults(results);
  };

  return (
    <AddBookDiv>
      <Form onSubmit={formSubmit}>
        <AddBookForm>
          <div>
            <Label>Api Choice</Label>
            <Input type="select" onChange={handleChanges} name="apiChoice">
              <option name="google" value="google">
                Google
              </option>
              <option name="goodreads" value="goodreads">
                GoodReads
              </option>
              <option name="ol" value="ol">
                Open Library
              </option>
            </Input>
          </div>
          <div>
            <Label>Search Type</Label>
            <Input type="select" onChange={handleChanges} name="searchType">
              <option name="title" value="title">
                Title
              </option>
              <option name="author" value="author">
                Author
              </option>
              <option name="isbn" value="isbn">
                ISBN
              </option>
            </Input>
          </div>
          <div>
            <Label>Entry</Label>
            <Input
              placeholder={values.searchType}
              onChange={handleChanges}
              name="entry"
              value={values.entry}
            />
          </div>
          <div>
            <ButtonDiv>
              <Button type="submit">
                <Space />
                Search
                <Space />
              </Button>
            </ButtonDiv>
          </div>
        </AddBookForm>
      </Form>
      {bookResults ? (
        <BookMap bookResults={bookResults} />
      ) : (
        <div id="sorryToInform">No results found</div>
      )}
    </AddBookDiv>
  );
};

export default AddBook;

// export default class AddBook extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       type: "title",
//       entry: "",
//       results: [],
//       bookData: null,
//       apiChoice: "google"
//     };
//     this.formSubmit = this.formSubmit.bind(this);
//   }

//   handleChanges = e => {
//     this.setState({
//       [e.target.name]: e.target.value
//     });
//   };

//   formSubmit = e => {
//     e.preventDefault();

//     this.setState({
//       results: []
//     });

//     let something = results => {
//       this.setState({
//         results
//       });
//     };

//     if(this.state.apiChoice === "google") {

//       var booksOptions = {
//         field: `${this.state.type}`,
//         offset: 0,
//         limit: 20,
//         type: "books",
//         order: "relevance",
//         lang: "en"
//       };

//       booksApi.search(this.state.entry, booksOptions, function(
//         error,
//         results,
//         apiResponse
//       ) {
//         console.log(results);
//         something(results);
//       });

//       return console.log("Success");
//     } else if (this.state.apiChoice === "ol"){
//         var searchType = {
//           title: 'q=',
//           author: 'author=',
//           isbn: 'isbn='
//         }

//         var query = this.state.entry;
//         var rp = require("request-promise");
//         var url = "https://openlibrary.org/search.json?" +
//         searchType[this.state.type] + query;

//         rp({
//             url: url,
//             json: true
//         }).then(function (body) {
//             console.log(body)
//             something(body);
//         }).catch(function(err){
//           console.log(err)
//         })

//         return console.log("Success")
//     }

//     this.setState({
//       entry: ""
//     })

//     return console.log("formSubmit complete")
//   };

//   render() {
//     return (
//       <AddBookDiv>
//         <Form onSubmit={this.formSubmit}>
//               <AddBookForm>
//                 <div>
//                   <Label>Api Choice</Label>
//                   <Input type="select" onChange={this.handleChanges} name="apiChoice">
//                     <option name="google" value="google">Google</option>
//                     <option name= "ol" value="ol">Open Library</option>
//                   </Input>
//                 </div>
//                 <div>
//                   <Label>Search Type</Label>
//                   <Input type="select" onChange={this.handleChanges} name="type">
//                     <option name="title" value="title">Title</option>
//                     <option name="author" value="author">Author</option>
//                     <option name="isbn" value="isbn">ISBN</option>
//                   </Input>
//                 </div>
//                 <div>
//                   <Label>Entry</Label>
//                   <Input
//                     placeholder={this.state.type === null ? "title" : this.state.type}
//                     onChange={this.handleChanges}
//                     name="entry"
//                     value={this.state.value}
//                   />
//                 </div>
//                 <Button>Search</Button>
//               </AddBookForm>
//         </Form>
//         {this.state.results ? (<BookMap resultsarr={this.state.results.docs ? this.state.results.docs : this.state.results} /> ) : <div id="sorryToInform">No results found</div>}
//       </AddBookDiv>
//     );
//   }
// }
