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
import LibraryBook from "./LibraryBook";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

const Library = () => {
  const userContext = useContext(UserContext);
  const [books, setBooks] = useState([]);

  const auth = firebase.auth();
  const user = auth.currentUser;
  const docRef = firebase.firestore().collection("users");

  //
  useEffect(() => {
    console.log(books);
    console.log(user);
    docRef
      .doc(user.uid)
      .get()
      .then(doc => {
        if (doc.exists) {
          console.log("Doc data", doc.data());
          // if local state of books is empty set books to the doc data books
          if (books.length === 0) {
            let res = doc.data().books;
            setBooks(res);
          }
          //
        } else {
          console.log("No such document");
        }
      })
      .catch(error => {
        console.log("Error getting the document:", error);
      });
  });

  console.log(books);
  //
  return (
    <Container>
      {books.map(book => (
        <LibraryBook key={Math.random()} book={book} />
      ))}
    </Container>
  );
};

export default Library;
