import React, { useState, useEffect } from "react";
import firebase from "../../firebase/firebase.utils";
import "firebase/auth";
import Book from "./Book";
import ReturnBook from "./ReturnBook";
import styled from "styled-components";

const ContainerWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Container = styled.div`
  width: 50vw
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

const Borrowed = () => {
  const [booksInfo, setBooksInfo] = useState([]);
  const [returnBooks, setReturnBooks] = useState([]);

  const auth = firebase.auth();

  const user = auth.currentUser;

  const docRef = firebase.firestore().collection("books");

  const getBooks = () => {
    let tempBorrowedBooksArr = [];
    let tempReturnBooksArr = [];
    docRef
      .where("borrowerId", "==", user.uid)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let book = doc.data();
          if (book.transitionUser) {
            tempReturnBooksArr.push(book);
          } else {
            tempBorrowedBooksArr.push(book);
          }
        });
      })
      .then(() => {
        setBooksInfo(tempBorrowedBooksArr);
        setReturnBooks(tempReturnBooksArr);
      })
      .catch(error => {
        console.log("Error gettting the docs:", error);
      });
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <ContainerWrapper>
      <Container>
        {booksInfo.map(book => (
          <Book key={Math.random()} book={book} getBooks={getBooks} />
        ))}
      </Container>
      <Container>
        Return Requested Books:
        {returnBooks.map(book => (
          <ReturnBook key={Math.random()} book={book} getBooks={getBooks} />
        ))}
      </Container>
    </ContainerWrapper>
  );
};

export default Borrowed;
