import React, { useState, useEffect } from "react";
import firebase from "../../firebase/firebase.utils";
import "firebase/auth";
import Book from "./Book";
import LoanedBook from "./LoanedBook";
import RecoverBook from "./RecoverBook";
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
  width: 75vw
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

const Loaned = () => {
  const [loanedBooks, setLoanedBooks] = useState([]);
  const [recoverBooks, setRecoverBooks] = useState([]);
  const auth = firebase.auth();
  const user = auth.currentUser;
  const docRef = firebase.firestore().collection("books");

  const getBooks = () => {
    let tempLoanedBooksArr = [];
    let tempRecoverBooksArr = [];
    docRef
      .where("ownerId", "==", user.uid)
      .where("checkedOut", "==", true)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let book = doc.data();
          if (book.transitionUser) {
            tempRecoverBooksArr.push(book);
          } else {
            tempLoanedBooksArr.push(book);
          }
        });
      })
      .then(() => {
        tempLoanedBooksArr.length > 0
          ? setLoanedBooks(tempLoanedBooksArr)
          : setLoanedBooks(null);
        tempRecoverBooksArr.length > 0
          ? setRecoverBooks(tempRecoverBooksArr)
          : setRecoverBooks(null);
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
          <u>Loaned Books:</u>
        </h5>
        <Container1>
          {loanedBooks === null ? (
            <div>
              <h6>You have no books currently checked-out</h6>
              <p>Add more books to your library?</p>
              <NavLink to="/shelf/add">
                <Button>Add book</Button>
              </NavLink>
              <p>Change the location of your personal library?</p>
              <NavLink to="/shelf/map">
                <Button>Map settings</Button>
              </NavLink>
            </div>
          ) : (
            loanedBooks.map(book => (
              <LoanedBook key={Math.random()} book={book} getBooks={getBooks} />
            ))
          )}
        </Container1>
      </div>
      <div>
        <h5>
          <u>Check-In Books:</u>
        </h5>
        <Container2>
          {recoverBooks === null ? (
            <div>
              <h6>You have no pending books to be checked in...</h6>
            </div>
          ) : (
            recoverBooks.map(book => (
              <RecoverBook
                key={Math.random()}
                book={book}
                getBooks={getBooks}
              />
            ))
          )}
        </Container2>
      </div>
    </ContainerWrapper>
  );
};

export default Loaned;
