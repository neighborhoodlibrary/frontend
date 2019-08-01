import React, { useState, useEffect } from "react";
import firebase from "../../firebase/firebase.utils";
import "firebase/auth";
import styled from "styled-components";
//
import RequestedBook from "./RequestedBook";

const ContainerWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Container = styled.div`
  width: 50vw;
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

const Requested = () => {
  const auth = firebase.auth();
  const user = auth.currentUser;
  const docRef = firebase.firestore().collection("books");

  const [requestedBooks, setRequestedBooks] = useState([]);

  const getRequested = () => {
    let tempBooksArr = [];
    docRef
      .where("ownerId", "==", user.uid)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let book = doc.data();
          if (book.requestedId.length > 0) {
            tempBooksArr.push(book);
          }
        });
      })
      .then(() => {
        setRequestedBooks(tempBooksArr);
      })
      .catch(error => {
        console.log("Error getting the documents:", error);
      });
  };

  useEffect(() => {
    getRequested();
  }, []);
  console.log();
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
      <Container>Books To be given:</Container>
    </ContainerWrapper>
  );
};

export default Requested;
