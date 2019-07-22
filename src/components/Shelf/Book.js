import React, { useContext } from "react";
import BookContext from "../../context/book/bookContext";
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
  const bookContext = useContext(BookContext);

  const setBookFunc = () => {
    bookContext.setBook(props.book);
  };
  return (
    <CardDiv>
      <Card>
        <NavLink to={`/shelf/book/${props.book.bookId}`} onClick={setBookFunc}>
          <CardHeader>{props.book.title}</CardHeader>
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
