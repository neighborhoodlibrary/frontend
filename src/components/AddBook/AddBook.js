import React, { useState } from "react";
import BookMap from "./BookMap";
import ManualAddBookModal from "./ManualAddBookModal";
import styled from "styled-components";
import { useAlert } from "react-alert";
import { Form, Input, Button, Label } from "reactstrap";
import Axios from "axios";
//
const booksApi = require("google-books-search");
//
const rp = require("request-promise");
//
const URL = "https://neighborhoodlibraryback.herokuapp.com";
// const URL = "http://localhost:9500";

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
const ManualAddButtonDiv = styled.div`
  margin-top: 15px;
`;

const AddBook = () => {
  const alert = useAlert();
  const [values, setValues] = useState({
    apiChoice: "google",
    searchType: "title",
    entry: ""
  });
  const [bookResults, setBookResults] = useState([]);
  const [passApiVal, setPassApiVal] = useState("google");
  const [manualAddModal, setManualAddModal] = useState(false);

  const handleChanges = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setBookResults([]);
  };

  const toggleManualAddModal = () => {
    manualAddModal ? setManualAddModal(false) : setManualAddModal(true);
  };

  const formSubmit = e => {
    e.preventDefault();
    if (values.apiChoice === "google") {
      alert.info("Please wait searching the google books api...");
      setPassApiVal("google");
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
        if (results === undefined) {
          setBooksFunc([]);
        } else {
          console.log(results);
          setBooksFunc(results);
        }
      });
    } else if (values.apiChoice === "goodreads") {
      alert.info(
        "Please wait a few seconds, searching the goodreads api takes some time"
      );
      setPassApiVal("goodreads");
      let body = {
        query: values.entry,
        search: values.searchType
      };
      Axios.post(`${URL}/goodreads`, body).then(res => {
        console.log(res);
        setBooksFunc(res.data);
      });
    } else if (values.apiChoice === "ol") {
      setPassApiVal("ol");
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
      <ManualAddButtonDiv>
        <Button onClick={toggleManualAddModal}>Add a Book Manually</Button>
      </ManualAddButtonDiv>
      {bookResults.length > 0 ? (
        <BookMap bookResults={bookResults} passApiVal={passApiVal} />
      ) : (
        <div id="sorryToInform">
          Can't find what you are looking for? Try manually adding the book.
        </div>
      )}
      <ManualAddBookModal
        manualAddModal={manualAddModal}
        toggleManualAddModal={toggleManualAddModal}
      />
    </AddBookDiv>
  );
};

export default AddBook;
