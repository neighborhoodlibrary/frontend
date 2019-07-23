import React, { useContext, useState, useEffect } from "react";
import UserContext from "../../context/user/userContext";
import BookContext from "../../context/book/bookContext";
import { useAlert } from 'react-alert'
//
import firebase from "../../firebase/firebase.utils";

import "firebase/auth";
import styled from "styled-components";
//
import { NavLink } from "react-router-dom";
import { Card, CardHeader, CardBody } from "reactstrap";

const CardDiv = styled.div`
  margin: 15px;

  a {
    text-decoration: none;
    font-family: "Merriweather Sans", sans-serif;
    color: black;
  }
`;

const LibraryBook = props => {
  const db = firebase.firestore();
  const bookContext = useContext(BookContext);

  const userContext = useContext(UserContext);
  const [userInfo, getUserInfo] = useState({});

  const alert = useAlert()

  useEffect(() => {
    getUserInfo(userContext.getUser());
  }, []);

  const setBookFunc = () => {
    bookContext.setBook(props.book);
  };

  const deleteBook = e => {
    e.preventDefault();
    console.log(props.book.id);
    db.collection("books")
      .doc(`${props.book.id}`)
      .delete()
      .then(() => {
        props.getBooks()
        alert.success('Book deleted!')
      })
      .catch(error => alert.error('Unable to delete book!'));
  };

  console.log(props);
  console.log(userInfo);
  return (
    <CardDiv>
      <Card>
        <CardHeader>
          {props.book.title}
          {props.book.ownerId !== userInfo.uid ? (
            ""
          ) : (
            <button onClick={deleteBook}>delete</button>
          )}
        </CardHeader>
        <NavLink to={`/shelf/book/${props.book.bookId}`} onClick={setBookFunc}>
          <CardBody>
            <p>by: {props.book.authors}</p>
            <p>avgRating: {props.book.averageRating}</p>
            <img src={props.book.googThumbnail} alt="book_thumb" />
          </CardBody>
        </NavLink>
      </Card>
    </CardDiv>
  );
};

export default LibraryBook;
