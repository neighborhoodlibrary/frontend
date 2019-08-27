import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../../context/user/userContext";
import firebase from "../../../firebase/firebase.utils";
import "firebase/auth";
// styling
import styled from "styled-components";

const BorrowedDiv = styled.div`
  display: flex;
`;
const LoanedDiv = styled.div`
  display: flex;
`;

const BooksInfo = () => {
  const userContext = useContext(UserContext);
  const curUser = userContext.userState.user;
  const auth = firebase.auth();
  const curUid = auth.currentUser.uid;
  const docRef = firebase.firestore().collection("books");
  const [borrowedBooks, setBorrowedBooks] = useState(null);
  const [loanedBooks, setLoanedBooks] = useState(null);

  useEffect(() => {
    getBooks();
    getBorrowed();
  }, "");

  const getBooks = () => {
    const tempLoanedArr = [];
    docRef
      .where("ownerId", "==", curUid)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          if (doc.data().checkedOut === true) {
            tempLoanedArr.push(doc.data());
          }
        });
      })
      .then(() => {
        if (tempLoanedArr.length > 0) {
          setLoanedBooks(tempLoanedArr);
        } else {
          setLoanedBooks(null);
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
  console.log(borrowedBooks);
  return (
    <div>
      <LoanedDiv>
        You are currently loaning out:{" "}
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
    </div>
  );
};

export default BooksInfo;
