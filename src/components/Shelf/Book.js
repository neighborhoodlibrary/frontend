import React, { useContext } from "react";
// import UserContext from "../../context/user/userContext";
import BookContext from "../../context/book/bookContext";
// import firebase from "../../firebase/firebase.utils";
import "firebase/auth";
import styled from "styled-components";
//
import { NavLink } from "react-router-dom";
// import userContext from "../../context/user/userContext";

const Container = styled.div`
    display: flex;
    flex-direction: row
    min-height: 100px
    min-width: 100px
`;
const Item = styled.div`
  border: 1px solid black;
`;

const LibraryBook = props => {
  const bookContext = useContext(BookContext);

  const setBookFunc = () => {
    bookContext.setBook(props.book);
  };
  return (
    <Container>
      <NavLink to={`/shelf/book/${props.book.bookId}`} onClick={setBookFunc}>
        <Item>
          <p>title: {props.book.title}</p>
          <p>author: {props.book.authors}</p>
          <p>avgRating: {props.book.averageRating}</p>
          <img src={props.book.thumbnail} alt="book_thumb" />
        </Item>
      </NavLink>
    </Container>
  );
};

export default LibraryBook;
