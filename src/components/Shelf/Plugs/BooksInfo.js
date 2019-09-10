import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../../context/user/userContext";
import firebase from "../../../firebase/firebase.utils";
import "firebase/auth";
// styling
import styled from "styled-components";

const BooksInfoDiv = styled.div`
  background-color: rgb(127, 173, 80);
  color: white;
  font-family: 'Merriweather Sans', sans-serif;
  font-size: 0.95em;
  padding: 25px;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border-left: 1px solid rgb(0,0,0,.2);
  border-right: 1px solid rgb(0,0,0,.2);
  border-bottom: 1px solid rgba(0,0,0,.2);

  #abook {
    padding: 10px;
    border: 1px solid rgba(0,0,0,.2);
    margin: 3px;
  }

  #counthold {
    display: flex;
    justify-content: space-between;

    @media(max-width: 600px){
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }

  #count {
    display: flex;
    align-items: center;
    font-size: 1.2em;
    padding: 0;
    margin: 0;
  }

  #countemp {
    display: flex;
    align-items: center;
    font-size: 1.2em;
    min-height: 80px;
  }

  div {
    padding: 5px 0px;
  }
`

const BookInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid rgba(255,255,255,.4);
  margin-bottom: 20px;
`;

const BookMap = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: flex-end;
  width: 100%;

  @media(max-width: 600px){
    justify-content: center;
    align-items: center;
  }
`

const BooksInfo = () => {
  const userContext = useContext(UserContext);
  const curUser = userContext.userState.user;
  const auth = firebase.auth();
  const curUid = auth.currentUser.uid;
  const docRef = firebase.firestore().collection("books");
  const [borrowedBooks, setBorrowedBooks] = useState(null);
  const [loanedBooks, setLoanedBooks] = useState(null);
  const [requestedBooks, setRequestedBooks] = useState(null);
  const [returningBooks, setReturningBooks] = useState(null);

  useEffect(() => {
    getBooks();
    getBorrowed();
  }, "");

  const getBooks = () => {
    const tempLoanedArr = [];
    const tempRequestedArr = [];
    const tempReturningArr = [];
    docRef
      .where("ownerId", "==", curUid)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          if (doc.data().checkedOut === true) {
            tempLoanedArr.push(doc.data());
          }
          if (doc.data().requestedId.length > 0) {
            tempRequestedArr.push(doc.data());
          }
          if (doc.data().transitionUser === curUid) {
            tempReturningArr.push(doc.data());
          }
        });
      })
      .then(() => {
        if (tempLoanedArr.length > 0) {
          setLoanedBooks(tempLoanedArr);
        } else {
          setLoanedBooks(null);
        }
        if (tempRequestedArr.length > 0) {
          setRequestedBooks(tempRequestedArr);
        } else {
          setRequestedBooks(null);
        }
        if (tempReturningArr.length > 0) {
          setReturningBooks(tempReturningArr);
        } else {
          setReturningBooks(null);
        }
      });
  };

  const getBorrowed = () => {
    const tempBorrowedArr = [];
    docRef
      .where("borrowerId", "==", curUser.email)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          tempBorrowedArr.push(doc.data());
        });
      })
      .then(() => {
        if (tempBorrowedArr.length > 0) {
          setBorrowedBooks(tempBorrowedArr);
        } else {
          setBorrowedBooks(null);
        }
      })
      .catch(error => {
        console.log("Error getting the documents:", error);
      });
  };

  return (
    <BooksInfoDiv id="booksinfo">
      <BookInfoDiv>
        {requestedBooks === null ? (
          <div>You have 0 books that have been requested</div>
        ) : (
          <div>
            <div>
              You have {requestedBooks.length} books that are being requested
            </div>
            <BookMap>
              {requestedBooks.map(requestedBook => (
                <div key={Math.random()}>
                  <div>{requestedBook.title}</div>
                  <div>Requested by: {requestedBook.requestedId.join(" , ")}</div>
                </div>
              ))}
            </BookMap>
          </div>
        )}
      </BookInfoDiv>
      <BookInfoDiv>
        {returningBooks === null ? (
          <div>You have 0 books being returned</div>
        ) : (
          <div>
            <div>
              You have {returningBooks.length} books that are being returned
            </div>
            <BookMap>
              {returningBooks.map(returningBook => (
                <div key={Math.random()}>
                  <div>{returningBook.title}</div>
                  <div>Returning from: {returningBook.borrowerId}</div>
                </div>
              ))}
            </BookMap>
          </div>
        )}
      </BookInfoDiv>
      <BookInfoDiv>
        You are currently loaning out
        {loanedBooks === null ? (
          <div id="countemp">0 books</div>
        ) : (
          <div id="counthold">
            <div id="count">{loanedBooks.length} books</div>
            <BookMap>
              {loanedBooks.map(loanedBook => (
                <div key={Math.random()}>
                  <div>Checked out by: {loanedBook.borrowerId}</div>
                  <div>{loanedBook.title}</div>
                  <div>Due: {loanedBook.dueDate.split("T")[0]}</div>
                </div>
              ))}
            </BookMap>
          </div>
        )}
      </BookInfoDiv>
      <BookInfoDiv>
        Currently borrowing:
        {borrowedBooks === null ? (
          <div>: 0 books</div>
        ) : (
          <div id="counthold">
            <div id="count">{borrowedBooks.length} books</div>
            <BookMap>
              {borrowedBooks.map(borrowedBook => (
                <div id="abook" key={Math.random()}>
                  <div>{borrowedBook.title}</div>
                  <div>Due:{borrowedBook.dueDate.split("T")[0]}</div>
                </div>
              ))}
            </BookMap>
          </div>
        )}
      </BookInfoDiv>
    </BooksInfoDiv>
  );
};

export default BooksInfo;
