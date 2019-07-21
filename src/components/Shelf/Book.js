import React, { useContext } from "react";
import BookContext from "../../context/book/bookContext";
// import firebase from "../../firebase/firebase.utils";
import "firebase/auth";
import styled from "styled-components";
//
import { NavLink } from "react-router-dom";
import { Card } from 'reactstrap';

const LibraryBook = props => {
  const bookContext = useContext(BookContext);

  const setBookFunc = () => {
    bookContext.setBook(props.book);
  };
  return (
    <div>
      <Card>
        <NavLink to={`/shelf/book/${props.book.bookId}`} onClick={setBookFunc}>
            <p>title: {props.book.title}</p>
            <p>author: {props.book.authors}</p>
            <p>avgRating: {props.book.averageRating}</p>
            <img src={props.book.thumbnail} alt="book_thumb" />
        </NavLink>
      </Card>
    </div>
  );
};

export default LibraryBook;
