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
  display: flex;
  justify-content: space-around;
`;

const Container1 = styled.div`
  display: grid;
  min-height: 75vh
  width:48vw
  border: 2px solid #28a745
  grid-template-columns: 1fr 1fr;
  
  @media (max-width: 1100px) {
    width: 48vw
    grid-template-columns: 1fr 1fr;
    
  }
  
  @media (max-width: 870px) {
    width: 48vw
    grid-template-columns: 1fr;
  }
  
  @media (max-width: 550px) {
    width:48vw
    grid-template-columns: 1fr;
  }
  `;
const Container2 = styled.div`
  display: grid;
  min-height: 75vh
  width: 48vw
  border: 2px solid #28a745
  grid-template-columns: 1fr 1fr;

  @media (max-width: 1100px) {
    width: 48vw
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 870px) {
    width:48vw
    grid-template-columns: 1fr; 
  }

  @media (max-width: 550px) {
    width:48vw
    grid-template-columns: 1fr;
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
        setRequestedBooks(tempRequestedBooksArr);
        setToBeGivenBooks(tempToBeGivenBooksArr);
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
          {requestedBooks.length > 0 ? (
            requestedBooks.map(book => (
              <RequestedBook
                key={Math.random()}
                book={book}
                getRequested={getRequested}
              />
            ))
          ) : (
            <div>
              <h6>No one has requested a book from you</h6>
              <h6>You can initiate... start a dialogue</h6>
              <h6>Search for other libraries</h6>
              <NavLink to="/shelf/search">
                <Button>Search for other libraries in your area</Button>
              </NavLink>
            </div>
          )}
        </Container1>
      </div>
      <div>
        <h5>
          <u>Books To Loan:</u>
        </h5>
        <Container2>
          {toBeGivenBooks.length > 0 ? (
            toBeGivenBooks.map(book => (
              <ToBeGivenBook
                key={Math.random()}
                book={book}
                getRequested={getRequested}
              />
            ))
          ) : (
            <div>
              <h6>Someone needs to request a book first...</h6>
            </div>
          )}
        </Container2>
      </div>
    </ContainerWrapper>
  );
};

export default Requested;
