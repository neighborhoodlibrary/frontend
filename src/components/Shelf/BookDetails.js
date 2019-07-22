import React, { useContext, useState, useEffect } from "react";
import BookContext from "../../context/book/bookContext";
import styled from "styled-components";
import { Button } from "reactstrap";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const BookHold = styled.div`
  width: 75%;
  padding: 17px;
  border-radius: 3px;
  border: 1px solid rgb(0, 0, 0, 0.2);
  -webkit-box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.75);
`;

const Book = () => {
  const bookContext = useContext(BookContext);
  const [displayedBook, getDisplayedBook] = useState([]);

  useEffect(() => {
    if (displayedBook.length === 0) {
      getDisplayedBook(bookContext.getBook());
    }
  }, []);

  return (
    <Container>
      <BookHold>
        <img src={displayedBook.googThumbnail} alt="book_thumb" />
        <p>Title: {displayedBook.title}</p>
        <p>Author: {displayedBook.authors}</p>
        <p>Average Rating: {displayedBook.averageRating}</p>
        <p>Page Count: {displayedBook.pageCount}</p>
        <p>Currently Checked out:{displayedBook.checkedOut ? "yes" : "no"}</p>
        <p>Owner of Book: {displayedBook.ownerId}</p>
        <p>Borrower of Book:{displayedBook.borrowerId}</p>
      </BookHold>
    </Container>
  );
};

export default Book;
