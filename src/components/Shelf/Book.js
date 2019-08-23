import React, { useContext, useEffect, useState } from "react";
import BookContext from "../../context/book/bookContext";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Card, CardHeader, CardBody, CardFooter } from "reactstrap";

const CardDiv = styled.div`
  margin: 15px;

  a {
    text-decoration: none;
    font-family: "Merriweather Sans", sans-serif;
    color: black;
  }
`;
const CardBodyDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const BookCover = styled.img`
  max-height: 200px;
  max-width: 200px;
`;

const LibraryBook = props => {
  const bookContext = useContext(BookContext);
  const [bookStatus, setBookStatus] = useState(null);
  const setBookFunc = () => {
    bookContext.setBook(props.book);
  };
  //
  useEffect(() => {
    checkBook();
  }, "");
  const checkBook = () => {
    if (props.book.authors.length === 0) {
      setBookStatus("warning");
    }
  };
  console.log(props.book);
  return (
    <CardDiv>
      <Card body outline color={bookStatus}>
        <NavLink to={`/shelf/book/${props.book.id}`} onClick={setBookFunc}>
          <CardHeader>{props.book.title}</CardHeader>
          <CardBody>
            <CardBodyDiv>
              <BookCover src={props.book.image} alt="book_thumb" />
            </CardBodyDiv>
          </CardBody>
          <CardFooter>
            <p>
              by: {props.book.authors ? props.book.authors.join(" , ") : "N/A"}
            </p>
          </CardFooter>
        </NavLink>
      </Card>
    </CardDiv>
  );
};

export default LibraryBook;
