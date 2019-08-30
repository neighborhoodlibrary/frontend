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

  h5 {
    font-family: "Merriweather", serif;
  }
`;

const Container1 = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  background-color: rgba(0,0,0,.11);
  border: 1px solid rgba(0,0,0,.3);
  border-radius: 2px;
`;
const Container2 = styled.div`
  background-color: rgba(0,0,0,.1);
  padding: 10px;
  border-radius: 2px;
  border: 1px solid rgba(0,0,0,.3);
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
        <h5>
          <u>Requested Books:</u>
        </h5>
        <Container1>
          {requestedBooks === null ? (
            <div>
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
        <h5>
          <u>Books To Loan:</u>
        </h5>
        <Container2>
          {toBeGivenBooks === null ? (
            <div>
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
