import React, { useState, useEffect } from "react";
import firebase from "../../firebase/firebase.utils";
import "firebase/auth";
import Book from "./Book";
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

const Library = () => {
  const [booksInfo, setBooksInfo] = useState([]);

  const auth = firebase.auth();

  const user = auth.currentUser;

  const docRef = firebase.firestore().collection("books");

  const getBooks = () => {
    let tempBooksArr = [];
    docRef
      .where("ownerId", "==", user.uid)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let book = doc.data();
          tempBooksArr.push(book);
        });
      })
      .then(() => {
        setBooksInfo(tempBooksArr);
      })
      .catch(error => {
        console.log("Error getting the documents:", error);
      });
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <Container>
      {booksInfo.map(book => (
        <Book key={Math.random()} book={book} getBooks={getBooks} />
      ))}
    </Container>
  );
};

export default Library;
