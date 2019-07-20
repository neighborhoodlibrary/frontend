// import React, { Component } from 'react'

// export default class Library extends Component {
//     render() {
//         return (
//             <div>

//             </div>
//         )
//     }
// }

import React, { useContext, useState, useEffect } from "react";
import UserContext from "../../context/user/userContext";
import firebase from "../../firebase/firebase.utils";
import "firebase/auth";
import Book from "./Book";
import styled from "styled-components";

const booksApi = require("google-books-search");

const Container = styled.div`
  display: flex;
`;

const Library = () => {
  const userContext = useContext(UserContext);
  const [booksId, setBooksId] = useState([]);
  const [booksInfo, setBooksInfo] = useState([]);
  const [gBooksInfo, setGBooksInfo] = useState([]);
  const auth = firebase.auth();
  const user = auth.currentUser;
  //   const docRef = firebase.firestore().collection("users");
  const docRef = firebase.firestore().collection("books");
  //

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
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            let book = doc.data();
            book.bookId = doc.id;
            someArr.push(book);
          });
        })
        .then(() => {
          setBooksInfo(someArr);
        })
        .catch(error => {
          console.log("Error getting the documents:", error);
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
            results[0].borrowerId = booksInfo[i].borrowerId;
            results[0].ownerId = booksInfo[i].ownerId;
            results[0].checkedOut = booksInfo[i].checkedOut;
            results[0].bookId = booksInfo[i].bookId;
            anotherArr.push(results[0]);
            if (anotherArr.length === booksInfo.length) {
              setGBooksInfo(anotherArr);
            }
          } else {
            console.log(error);
          }
        });
      }
    }
  });
  //
  return (
    <Container>
      {gBooksInfo.map(book => (
        <Book key={Math.random()} book={book} />
      ))}
    </Container>
  );
};

export default Library;

// docRef
//   .doc(user.uid)
//   .get()
//   .then(doc => {
//     if (doc.exists) {
//       console.log("Doc data", doc.data());
//       // if local state of books is empty set books to the doc data books
//       if (booksId.length === 0) {
//         let res = doc.data().books;
//         setBooksId(res);
//       }
//       //
//     } else {
//       console.log("No such document");
//     }
//   })
//   .catch(error => {
//     console.log("Error getting the document:", error);
//   });

//   console.log(booksInfo);
//   for (let i = 0; i < booksInfo.length; i++) {
//     console.log(booksInfo[i]);
//     booksApi.search(booksInfo[i].gbId, booksOptions, function(
//       error,
//       results,
//       apiResponse
//     ) {
//       console.log(results);
//       anotherArr.push(results);
//     });
//   }
