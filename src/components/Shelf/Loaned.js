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

  const auth = firebase.auth();

  const user = auth.currentUser;

  const docRef = firebase.firestore().collection("books");

  const getBooks = () => {
    let tempBooksArr = [];
    docRef
      .where("ownerId", "==", user.uid)
      .where("checkedOut", "==", true)
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
        <RecoverBook />
      </Container>
    </ContainerWrapper>
  );
};

export default Loaned;
