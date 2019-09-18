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
  justify-items: space-apart;
  grid-template-columns: 2fr 1fr;
  font-family: "Merriweather Sans", "Roboto", sans-serif;
  width: 97.5%;
  height: 100%;
  margin: auto;

  @media(max-width: 800px) {
    display: flex;
    flex-direction: column;
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
      .where("borrowerId", "==", user.email)
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
  }, [getBooks]);

  return (
    <ContainerWrapper>
      <div>
        <Container1>
        <h5>
          Borrowed Books
        </h5>
          {borrowedBooks === null ? (
            <div id="noBooks">
              <h6>You have no books that you are currently borrowing</h6>
              <p>Search for books to borrow?</p>
              <NavLink to="/lookup/search">
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
        <Container2>
          <h5>
            Returning Books
          </h5>
          {returnBooks === null ? (
            <div id="noBooks">
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
