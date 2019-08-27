import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../../context/user/userContext";
import firebase from "../../../firebase/firebase.utils";
import "firebase/auth";
// styling
import styled from "styled-components";

const BooksInfoDiv = styled.div`
  widith: 100%;
  display: flex;
`

const BorrowedDiv = styled.div`
  display: flex;
  margin: 1rem;
`;
const LoanedDiv = styled.div`
  display: flex;
  margin: 1rem;
`;
const RequestedDiv = styled.div`
  display: flex;
  margin: 1rem;
`;
const ReturningDiv = styled.div`
  display: flex;
  margin: 1rem;
`;

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
      <RequestedDiv>
        {requestedBooks === null ? (
          <div>You have 0 books that have been requested</div>
        ) : (
          <div>
            <div>
              You have {requestedBooks.length} books that are being requested
            </div>
            {requestedBooks.map(requestedBook => (
              <div key={Math.random()}>
                <div>Title: {requestedBook.title}</div>
                <div>Requested by: {requestedBook.requestedId.join(" , ")}</div>
              </div>
            ))}
          </div>
        )}
      </RequestedDiv>
      <ReturningDiv>
        {returningBooks === null ? (
          <div>You have 0 books being returned</div>
        ) : (
          <div>
            <div>
              You have {returningBooks.length} books that are being returned
            </div>
            {returningBooks.map(returningBook => (
              <div key={Math.random()}>
                <div>Title: {returningBook.title}</div>
                <div>Returning from: {returningBook.borrowerId}</div>
              </div>
            ))}
          </div>
        )}
      </ReturningDiv>
      <LoanedDiv>
        You are currently loaning out:
        {loanedBooks === null ? (
          <div>0 books</div>
        ) : (
          <div>
            <div>{loanedBooks.length} books</div>
            {loanedBooks.map(loanedBook => (
              <div key={Math.random()}>
                <div>Checked out by: {loanedBook.borrowerId}</div>
                <div>Title: {loanedBook.title}</div>
                <div>Due: {loanedBook.dueDate.split("T")[0]}</div>
              </div>
            ))}
          </div>
        )}
      </LoanedDiv>
      <BorrowedDiv>
        You are currently borrowing:
        {borrowedBooks === null ? (
          <div>0 books</div>
        ) : (
          <div>
            <div>{borrowedBooks.length} books</div>
            {borrowedBooks.map(borrowedBook => (
              <div key={Math.random()}>
                <div>Title: {borrowedBook.title}</div>
                <div>Due:{borrowedBook.dueDate.split("T")[0]}</div>
              </div>
            ))}
          </div>
        )}
      </BorrowedDiv>
    </BooksInfoDiv>
  );
};

export default BooksInfo;
