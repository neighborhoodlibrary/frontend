import React, { useState, useEffect } from "react";
import firebase from "../../firebase/firebase.utils";
import "firebase/auth";
import BorrowedBook from "./BorrowedBook";
import ReturnBook from "./ReturnBook";
import { NavLink } from "react-router-dom";
import { Button } from "reactstrap";
import styled from "styled-components";

const ContainerWrapper = styled.div`
  box-sizing: border-box;
  display: grid;
  justify-content: space-apart;
  grid-template-columns: 2fr 1fr;
  font-family: "Merriweather Sans", "Roboto", sans-serif;
  width: 100%;
  height: 100%;

  h5 {
    font-family: "Merriweather", serif;
  }
`;

const Container1 = styled.div`
  display: grid;
  height: 100%;
`;
const Container2 = styled.div``;

const Borrowed = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [returnBooks, setReturnBooks] = useState([]);
  const auth = firebase.auth();
  const user = auth.currentUser;
  const docRef = firebase.firestore().collection("books");

  const getBooks = () => {
    let tempBorrowedBooksArr = [];
    let tempReturnBooksArr = [];
    docRef
      .where("borrowerId", "==", user.uid)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let book = doc.data();
          if (book.transitionUser) {
            tempReturnBooksArr.push(book);
          } else {
            tempBorrowedBooksArr.push(book);
          }
        });
      })
      .then(() => {
        tempBorrowedBooksArr.length > 0
          ? setBorrowedBooks(tempBorrowedBooksArr)
          : setBorrowedBooks(null);
        tempReturnBooksArr.length > 0
          ? setReturnBooks(tempReturnBooksArr)
          : setReturnBooks(null);
      })
      .catch(error => {
        console.log("Error getting the docs:", error);
      });
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <ContainerWrapper>
      <div>
        <h5>
          <u>Borrowed Books:</u>
        </h5>
        <Container1>
          {borrowedBooks === null ? (
            <div>
              <h6>You have no books that you are currently borrowing</h6>
              <p>Search for books to borrow?</p>
              <NavLink to="/shelf/search">
                <Button>Search for books</Button>
              </NavLink>
            </div>
          ) : (
            borrowedBooks.map(book => (
              <BorrowedBook
                key={Math.random()}
                book={book}
                getBooks={getBooks}
              />
            ))
          )}
        </Container1>
      </div>
      <div>
        <h5>
          <u>Returning Books:</u>
        </h5>
        <Container2>
          {returnBooks === null ? (
            <div>
              <h6>You need to borrow a book first...</h6>
            </div>
          ) : (
            returnBooks.map(book => (
              <ReturnBook key={Math.random()} book={book} getBooks={getBooks} />
            ))
          )}
        </Container2>
      </div>
    </ContainerWrapper>
  );
};

export default Borrowed;
