import React, { useState, useEffect } from "react";
import firebase from "../../firebase/firebase.utils";
import "firebase/auth";
import Book from "./Book";
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
        tempBooksArr.length > 0
          ? setBooksInfo(tempBooksArr)
          : setBooksInfo(null);
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
      {booksInfo === null ? (
        <EmptyBooksContainer>
          <h6>You currently have no books in your library...</h6>
          <h6>Get started by searching through an option of 3 APIs</h6>
          <h6>Including Google Books, Goodreads, and Open Library</h6>
          <h6>If you still can't find what you are looking for</h6>
          <h6>Add a book manually to your library</h6>
          <NavLink to="/shelf/add">
            <Button>Add a book</Button>
          </NavLink>
        </EmptyBooksContainer>
      ) : (
        booksInfo.map(book => (
          <Book
            key={Math.random()}
            book={book}
            getBooks={getBooks}
            userUid={user.uid}
          />
        ))
      )}
    </Container>
  );
};

export default Library;
