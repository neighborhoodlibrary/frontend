import React, { useState, useEffect } from "react";
import firebase from "../../firebase/firebase.utils";
import "firebase/auth";
import ReceivingBook from "./ReceivingBook";
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

const Receiving = () => {
  const auth = firebase.auth();
  const user = auth.currentUser;
  const docRef = firebase.firestore().collection("books");

  const [receivingBooks, setReceivingBooks] = useState([]);

  const getReceiving = () => {
    let tempReceivingBooksArr = [];
    docRef
      .where("transitionUser", "==", user.uid)
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
      Receiving Page:
      <Container>
        {receivingBooks.map(book => (
          <ReceivingBook key={Math.random()} book={book} />
        ))}
      </Container>
    </div>
  );
};

export default Receiving;
