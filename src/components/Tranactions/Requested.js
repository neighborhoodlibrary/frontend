import React, { useState, useEffect } from "react";
import firebase from "../../firebase/firebase.utils";
import "firebase/auth";
import { NavLink } from "react-router-dom";
import { Button } from "reactstrap";
import styled from "styled-components";
//
import RequestedBook from "./RequestedBook";
import ToBeGivenBook from "./ToLoanBook";

const ContainerWrapper = styled.div`
  box-sizing: border-box;
  display: grid;
  justify-content: space-apart;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  font-family: "Merriweather Sans", "Roboto", sans-serif;
  width: 100%;
  height: 100%;

  @media(max-width: 800px) {
    display: flex;
    flex-direction: column;
  }

  h5 {
    font-family: "Merriweather", serif;
  }
`;

const Container1 = styled.div`
  min-height: 600px;
  border-radius: 2px;
  background-color: rgb(127, 173, 80);
  color: rgb(20,20,20);
  padding: 10px;
  box-sizing: border-box;

  h5 {
    color: rgb(250,250,250);
    font-family: "Merriweather", serif;
    text-decoration: none;
    border-bottom: 1px solid rgba(255,255,255,0.2);
    padding: 3px 0px;
  }
`;
const Container2 = styled.div`
  background-color: rgb(80,80,80);
  min-height: 600px;
  border-radius: 2px;
  color: rgb(20,20,20);
  padding: 10px;
  box-sizing: border-box;

  h5 {
    color: rgb(250,250,250);
    font-family: "Merriweather", serif;
    text-decoration: none;
    border-bottom: 1px solid rgba(255,255,255,0.2);
    padding: 3px 0px;
  }
`;

const Requested = () => {
  const auth = firebase.auth();
  const user = auth.currentUser;
  const docRef = firebase.firestore().collection("books");

  const [requestedBooks, setRequestedBooks] = useState([]);
  const [toBeGivenBooks, setToBeGivenBooks] = useState([]);

  const getRequested = () => {
    let tempRequestedBooksArr = [];
    let tempToBeGivenBooksArr = [];
    docRef
      .where("ownerId", "==", user.uid)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let book = doc.data();
          if (book.requestedId.length > 0 && !book.transitionUser) {
            tempRequestedBooksArr.push(book);
          } else if (book.requestedId.length > 0 && book.transitionUser) {
            tempToBeGivenBooksArr.push(book);
          }
        });
      })
      .then(() => {
        tempRequestedBooksArr.length > 0
          ? setRequestedBooks(tempRequestedBooksArr)
          : setRequestedBooks(null);
        tempToBeGivenBooksArr.length > 0
          ? setToBeGivenBooks(tempToBeGivenBooksArr)
          : setToBeGivenBooks(null);
      })
      .catch(error => {
        console.log("Error getting the documents:", error);
      });
  };

  useEffect(() => {
    getRequested();
  }, []);
  return (
    <ContainerWrapper>
      <div>
        <Container1>
          <h5>
            Requested Books
          </h5>
          {requestedBooks === null ? (
            <div id="noBooks">
              <h4>No one has requested a book from you</h4>
              <h6>When a user wants to read a book from your library</h6>
              <h6>It'll show up here</h6>
              <h6>Did you mean to borrow a book?</h6>
              <NavLink to="/lookup/search">
                <Button>Search your area</Button>
              </NavLink>
            </div>
          ) : (
            requestedBooks.map(book => (
              <RequestedBook
                key={Math.random()}
                book={book}
                getRequested={getRequested}
              />
            ))
          )}
        </Container1>
      </div>
      <div>
        <Container2>
          <h5>
            Books To Loan
          </h5>
          {toBeGivenBooks === null ? (
            <div id="noBooks">
              <h6>
                Set a user to loan a book, and the book will be placed here
              </h6>
            </div>
          ) : (
            toBeGivenBooks.map(book => (
              <ToBeGivenBook
                key={Math.random()}
                book={book}
                getRequested={getRequested}
              />
            ))
          )}
        </Container2>
      </div>
    </ContainerWrapper>
  );
};

export default Requested;
