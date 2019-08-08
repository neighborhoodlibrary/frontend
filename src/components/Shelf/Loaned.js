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

const Container1 = styled.div`
  display: grid;
  width:80vw
  border-right: 1px solid gray;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  @media (max-width: 1100px) {
    width: 75vw
    grid-template-columns: 1fr 1fr 1fr;
    
  }

  @media (max-width: 870px) {
    width: 66vw
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 550px) {
    width:50vw
    grid-template-columns: 1fr;
  }
`;
const Container2 = styled.div`
  display: grid;
  width: 20vw
  border-left: 1px solid gray
  grid-template-columns:1fr;

  @media (max-width: 1100px) {
    width: 25vw
    grid-template-columns: 1fr; 
  }

  @media (max-width: 870px) {
    width:33vw
    grid-template-columns: 1fr; 
  }

  @media (max-width: 550px) {
    width:50vw
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
      <div>
        <h5>
          <u>Loaned Books:</u>
        </h5>
        <Container1>
          {booksInfo.map(book => (
            <Book key={Math.random()} book={book} getBooks={getBooks} />
          ))}
        </Container1>
      </div>
      <div>
        <h5>
          <u>Recovering Books:</u>
        </h5>
        <Container2>
          {recoverBooks.map(book => (
            <RecoverBook key={Math.random()} book={book} getBooks={getBooks} />
          ))}
        </Container2>
      </div>
    </ContainerWrapper>
  );
};

export default Loaned;
