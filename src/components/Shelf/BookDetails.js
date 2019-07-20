import React, { useContext, useState, useEffect } from "react";
import BookContext from "../../context/book/bookContext";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: row
    min-height: 95%
    min-width: 95%
    justify-content:center
    align-items:center
`;
const Item = styled.div`
  border: 1px solid black;
`;

const Book = () => {
  const bookContext = useContext(BookContext);
  const [displayedBook, getDisplayedBook] = useState([]);
  useEffect(() => {
    if (displayedBook.length === 0) {
      getDisplayedBook(bookContext.getBook());
    }
  });
  console.log(displayedBook);
  return (
    <Container>
      <Item>
        <img src={displayedBook.thumbnail} alt="book_thumb" />
        <p>Title:{displayedBook.title}</p>
        <p>Author: {displayedBook.authors}</p>
        <p>Average Rating: {displayedBook.averageRating}</p>
        <p>Page Count: {displayedBook.pageCount}</p>
        <p>Currently Checked out:{displayedBook.checkedOut ? "yes" : "no"}</p>
        <p>Owner of Book: {displayedBook.ownerId}</p>
        <p>Borrower of Book:{displayedBook.borrowerId}</p>
      </Item>
    </Container>
  );
};

export default Book;
