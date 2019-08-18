import React, { useState, useEffect } from "react";
import firebase from "../../firebase/firebase.utils";
import "firebase/auth";
import BorrowedBook from "./BorrowedBook";
import ReturnBook from "./ReturnBook";
import { NavLink } from "react-router-dom";
import { Button } from "reactstrap";
import styled from "styled-components";

const ContainerWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Container1 = styled.div`
  display: grid;
  min-height: 75vh
  width:75vw
  border: 2px solid #28a745
  grid-template-columns: 1fr 1fr 1fr 1fr;
  
  @media (max-width: 1100px) {
    width: 70vw
    grid-template-columns: 1fr 1fr 1fr;
    
  }
  
  @media (max-width: 870px) {
    width: 63vw
    grid-template-columns: 1fr 1fr;
  }
  
  @media (max-width: 550px) {
    width:48vw
    grid-template-columns: 1fr;
  }
  `;
const Container2 = styled.div`
  display: grid;
  min-height: 75vh
  width: 20vw
  border: 2px solid #28a745
  grid-template-columns:1fr;

  @media (max-width: 1100px) {
    width: 25vw
    grid-template-columns: 1fr; 
  }

  @media (max-width: 870px) {
    width:33vw
    grid-template-columns: 1fr; 
  }

  @media (max-width: 550px) {
    width:48vw
    grid-template-columns: 1fr;
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
