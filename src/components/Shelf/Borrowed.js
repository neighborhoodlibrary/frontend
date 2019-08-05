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

const Container1 = styled.div`
  display: grid;
  width:80vw
  border-left: 1px solid gray
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
  border-right: 1px solid gray;
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
      <div>
        <h5>
          <u>Borrowed Books:</u>
        </h5>
        <Container1>
          {booksInfo.map(book => (
            <Book key={Math.random()} book={book} getBooks={getBooks} />
          ))}
        </Container1>
      </div>
      <div>
        <h5>
          <u>Returning Books:</u>
        </h5>
        <Container2>
          {returnBooks.map(book => (
            <ReturnBook key={Math.random()} book={book} getBooks={getBooks} />
          ))}
        </Container2>
      </div>
    </ContainerWrapper>
  );
};

export default Borrowed;
