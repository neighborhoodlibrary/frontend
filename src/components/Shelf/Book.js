import React, { useContext, useState, useEffect } from "react";
import UserContext from "../../context/user/userContext";
import BookContext from "../../context/book/bookContext";

import { useAlert } from "react-alert";
//

import firebase from "../../firebase/firebase.utils";
import "firebase/auth";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Card, CardHeader, CardBody, Button } from "reactstrap";

const CardDiv = styled.div`
  margin: 15px;

  a {
    text-decoration: none;
    font-family: "Merriweather Sans", sans-serif;
    color: black;
  }
`;

const CardHeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardBodyDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LibraryBook = props => {
  console.log(props);
  const db = firebase.firestore();

  const bookContext = useContext(BookContext);

  const userContext = useContext(UserContext);

  const [userInfo, getUserInfo] = useState({});

  const alert = useAlert();

  useEffect(() => {
    getUserInfo(userContext.getUser());
  }, []);

  const setBookFunc = () => {
    bookContext.setBook(props.book);
  };

  const deleteBook = e => {
    e.preventDefault();
    db.collection("books")
      .doc(`${props.book.id}`)
      .delete()
      .then(() => {
        props.getBooks();
        alert.success("Book deleted!");
      })
      .catch(error => alert.error("Unable to delete book!"));
  };

  return (
    <CardDiv>
      <Card>
        <CardHeader>
          <CardHeaderDiv>
            {props.book.title}
            {props.book.ownerId !== userInfo.uid ? (
              ""
            ) : (
              <Button color="danger" onClick={deleteBook}>
                Delete Book
              </Button>
            )}
          </CardHeaderDiv>
        </CardHeader>
        <NavLink to={`/shelf/book/${props.book.id}`} onClick={setBookFunc}>
          <CardBody>
            <CardBodyDiv>
              <p>by: {props.book.authors}</p>
              <img src={props.book.googThumbnail} alt="book_thumb" />
              <p>avgRating: {props.book.averageRating}</p>
            </CardBodyDiv>
          </CardBody>
        </NavLink>
      </Card>
    </CardDiv>
  );
};

export default LibraryBook;
