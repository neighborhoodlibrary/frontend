import React, { useState, useEffect } from "react";
import firebase from "../../firebase/firebase.utils";
import "firebase/auth";
import ReceivingBook from "./ReceivingBook";
import { NavLink } from "react-router-dom";
import { Button } from "reactstrap";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (max-width: 870px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 550px) {
    grid-template-columns: 1fr;
  }
`;

const EmptyBooksContainer = styled.div`
min-height: 50vh;
width: 98vw
border: 2px solid #28a745
`;

const Receiving = () => {
  const auth = firebase.auth();
  const user = auth.currentUser;
  const docRef = firebase.firestore().collection("books");

  const [receivingBooks, setReceivingBooks] = useState([]);

  const getReceiving = () => {
    let tempReceivingBooksArr = [];
    docRef
      .where("transitionUser", "==", user.uid)
      .where("requestedId", "array-contains", user.uid)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let book = doc.data();
          tempReceivingBooksArr.push(book);
        });
      })
      .then(() => {
        setReceivingBooks(tempReceivingBooksArr);
      })
      .catch(error => {
        console.log("Error getting the documents:", error);
      });
  };
  useEffect(() => {
    getReceiving();
  }, []);

  return (
    <div>
      <h5>
        <u>Receiving Books:</u>
      </h5>
      <Container>
        {receivingBooks.length > 0 ? (
          receivingBooks.map(book => (
            <ReceivingBook
              key={Math.random()}
              book={book}
              getReceiving={getReceiving}
            />
          ))
        ) : (
          <EmptyBooksContainer>
            <h6>You need to request a book first</h6>
            <h6>
              Requesting a book will auto-generate an email to the other user
            </h6>
            <h6>Then the other user can set a book to be loaned to you</h6>
            <h6>What are you waiting for?</h6>
            <h6>Start searching libraries in your area</h6>
            <NavLink to="/shelf/search">
              <Button>Search libraries</Button>
            </NavLink>
          </EmptyBooksContainer>
        )}
      </Container>
    </div>
  );
};

export default Receiving;
