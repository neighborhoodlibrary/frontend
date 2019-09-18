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
  }, [getBooks]);

  return (
    <ContainerWrapper>
      <div>
        <Container1>
          <h5>
            Loaned Books
          </h5>
          {loanedBooks === null ? (
            <div id="noBooks">
              <h6>You have no books currently checked-out</h6>
              <p>Add more books to your library?</p>
              <NavLink to="/lookup/add">
                <Button>Add book</Button>
              </NavLink>
              <p>Change the location of your personal library?</p>
              <NavLink to="/settings/map">
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
        <Container2>
          <h5>
            Check-In Books
          </h5>
          {recoverBooks === null ? (
            <div id="noBooks">
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
