import React, { useState, useEffect } from "react";
import firebase from "../../firebase/firebase.utils";
import "firebase/auth";
import ReceivingBook from "./ReceivingBook";
import { NavLink } from "react-router-dom";
import { Button } from "reactstrap";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  font-family: "Merriweather Sans", sans-serif;
`;

const MapHold = styled.div`
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

const Receiving = () => {
  const auth = firebase.auth();
  const user = auth.currentUser;
  const docRef = firebase.firestore().collection("books");

  const [receivingBooks, setReceivingBooks] = useState([]);

  const getReceiving = () => {
    let tempReceivingBooksArr = [];
    docRef
      .where("transitionUser", "==", user.email)
      .where("requestedId", "array-contains", user.email)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let book = doc.data();
          tempReceivingBooksArr.push(book);
        });
      })
      .then(() => {
        tempReceivingBooksArr.length > 0
          ? setReceivingBooks(tempReceivingBooksArr)
          : setReceivingBooks(null);
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
        {receivingBooks === null ? (
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
        ) : (
          receivingBooks.map(book => (
            <ReceivingBook
              key={Math.random()}
              book={book}
              getReceiving={getReceiving}
            />
          ))
        )}
      </Container>
    </div>
  );
};

export default Receiving;
