import React, { useState, useEffect } from "react";
import firebase from "../../firebase/firebase.utils";
import "firebase/auth";
import styled from "styled-components";
//
import RequestedBook from "./RequestedBook";
import ToBeGivenBook from "./ToBeGivenBook";

const ContainerWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Container = styled.div`
  width: 50vw;
  display: grid;
  border-left: 1px solid gray;
  border-right: 1px solid gray;
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
  // console.log(toBeGivenBooks);
  return (
    <ContainerWrapper>
      <Container>
        Requested Books:
        {requestedBooks.map(book => (
          <RequestedBook
            key={Math.random()}
            book={book}
            getRequested={getRequested}
          />
        ))}
      </Container>
      <Container>
        Books To be given:
        {toBeGivenBooks.map(book => (
          <ToBeGivenBook
            key={Math.random()}
            book={book}
            getRequested={getRequested}
          />
        ))}
      </Container>
    </ContainerWrapper>
  );
};

export default Requested;
