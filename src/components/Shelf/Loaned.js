import React, { useState, useEffect } from "react";
import firebase from "../../firebase/firebase.utils";
import "firebase/auth";
import Book from "./Book";
import RecoverBook from "./RecoverBook";
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

const Loaned = () => {
  const [booksInfo, setBooksInfo] = useState([]);
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
        setBooksInfo(tempLoanedBooksArr);
        setRecoverBooks(tempRecoverBooksArr);
      })
      .catch(error => {
        console.log("Error getting the docs:", error);
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
        Recover Books:
        {recoverBooks.map(book => (
          <RecoverBook key={Math.random()} book={book} getBooks={getBooks} />
        ))}
      </Container>
    </ContainerWrapper>
  );
};

export default Loaned;
