// import React, { Component } from 'react'

// export default class Loaned extends Component {
//     render() {
//         return (
//             <div>
//                 Loaned
//             </div>
//         )
//     }
// }

import React, { useContext, useState, useEffect } from "react";
import firebase from "../../firebase/firebase.utils";
import "firebase/auth";
//
import LoanedBook from "./LoanedBook";
import styled from "styled-components";
//
const booksApi = require("google-books-search");

const Container = styled.div`
  display: flex;
`;

const Loaned = () => {
  const [booksInfo, setBooksInfo] = useState([]);
  const [gBooksInfo, setGbooksInfo] = useState([]);
  const auth = firebase.auth();
  const user = auth.currentUser;
  const docRef = firebase.firestore().collection("books");
  const booksOptions = {
    field: "isbn",
    limit: 10,
    type: "books",
    lang: "en"
  };

  useEffect(() => {
    let someArr = [];
    if (booksInfo.length === 0) {
      docRef
        .where("ownerId", "==", user.uid)
        .where("checkedOut", "==", true)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            someArr.push(doc.data());
          });
        })
        .then(() => {
          setBooksInfo(someArr);
        })
        .catch(error => {
          console.log("Error getting the docs:", error);
        });
    }
  });
  useEffect(() => {
    let anotherArr = [];
    if (booksInfo.length !== 0 && gBooksInfo.length === 0) {
      for (let i = 0; i < booksInfo.length; i++) {
        booksApi.search(`${booksInfo[i].isbn}`, booksOptions, function(
          error,
          results,
          apiResponse
        ) {
          if (!error) {
            anotherArr.push(results[0]);
            if (anotherArr.length === booksInfo.length) {
              setGbooksInfo(anotherArr);
            }
          } else {
            console.log(error);
          }
        });
      }
    }
  });

  return (
    <Container>
      {gBooksInfo.map(book => (
        <LoanedBook key={Math.random()} book={book} />
      ))}
    </Container>
  );
};

export default Loaned;
