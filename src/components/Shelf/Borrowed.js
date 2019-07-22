// import React, { Component } from 'react'

// export default class Borrowed extends Component {
//     render() {
//         return (
//             <div>
//                 Borrowed
//             </div>
//         )
//     }
// }

import React, { useState, useEffect } from "react";
import firebase from "../../firebase/firebase.utils";
import "firebase/auth";
//
import Book from "./Book";
import styled from "styled-components";
//
// const booksApi = require("google-books-search");

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

const Borrowed = () => {
  const [booksInfo, setBooksInfo] = useState([]);
  // const [gBooksInfo, setGbooksInfo] = useState([]);
  const auth = firebase.auth();
  const user = auth.currentUser;
  const docRef = firebase.firestore().collection("books");
  // const booksOptions = {
  //   field: "isbn",
  //   limit: 10,
  //   type: "books",
  //   lang: "en"
  // };

  useEffect(() => {
    let tempBooksArr = [];
    docRef
      .where("borrowerId", "==", user.uid)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let book = doc.data();
          // book.bookId = doc.id;
          tempBooksArr.push(book);
        });
      })
      .then(() => {
        setBooksInfo(tempBooksArr);
      })
      .catch(error => {
        console.log("Error gettting the docs:", error);
      });
  }, []);

  // useEffect(() => {
  //   let anotherArr = [];
  //   if (booksInfo.length !== 0 && gBooksInfo.length === 0) {
  //     for (let i = 0; i < booksInfo.length; i++) {
  //       booksApi.search(`${booksInfo[i].isbn}`, booksOptions, function(
  //         error,
  //         results,
  //         apiResponse
  //       ) {
  //         if (!error) {
  //           results[0].borrowerId = booksInfo[i].borrowerId;
  //           results[0].ownerId = booksInfo[i].ownerId;
  //           results[0].checkedOut = booksInfo[i].checkedOut;
  //           results[0].bookId = booksInfo[i].bookId;
  //           anotherArr.push(results[0]);
  //           if (anotherArr.length === booksInfo.length) {
  //             setGbooksInfo(anotherArr);
  //           }
  //         } else {
  //           console.log(error);
  //         }
  //       });
  //     }
  //   }
  // });

  return (
    <Container>
      {booksInfo.map(book => (
        <Book key={Math.random()} book={book} />
      ))}
    </Container>
  );
};

export default Borrowed;
