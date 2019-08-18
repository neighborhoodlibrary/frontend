import React, { useState, useEffect } from "react";
import firebase from "../../firebase/firebase.utils";
import "firebase/auth";
import LoanedBook from "./LoanedBook";
import RecoverBook from "./RecoverBook";
import { NavLink } from "react-router-dom";
import { Button } from "reactstrap";
import styled from "styled-components";

const ContainerWrapper = styled.div`
  box-sizing: border-box;
  display: grid;
  justify-content: space-apart;
  grid-template-columns: 2fr 1fr;
  font-family: 'Merriweather Sans', 'Roboto', sans-serif;
  width: 100%;
  height: 100%;

  h5 {
    font-family: 'Merriweather', serif;
  }
`;

const Container1 = styled.div`
  display: grid;
  height: 100%;
`;
const Container2 = styled.div`

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
