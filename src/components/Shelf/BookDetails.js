import React, { useContext, useState, useEffect } from "react";
import BookContext from "../../context/book/bookContext";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Container,
  Row,
  Col
} from "reactstrap";

const ContainerDiv = styled.div`
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

const CardHeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardInfoDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const Book = props => {
  const bookContext = useContext(BookContext);
  const [displayedBook, getDisplayedBook] = useState([]);

  useEffect(() => {
    getDisplayedBook(bookContext.getBook());
  }, []);

  const goBack = e => {
    props.history.goBack();
  };

  console.log(displayedBook)

  return (
    <ContainerDiv>
      <BookHold>
        <Card>
          <CardHeader>
            <CardHeaderDiv>
              <p>Title: {displayedBook.title}</p>
              <Button color="secondary" onClick={goBack}>
                Back
              </Button>
            </CardHeaderDiv>
          </CardHeader>
          <CardBody>
            <Container>
                <CardInfoDiv>
                <img src={displayedBook.thumbnail} alt="book_thumb" />
                  <p>
                    {!displayedBook.authors
                      ? ""
                      : displayedBook.authors.length === 1
                      ? `Author: ${displayedBook.authors[0]}`
                      : `Authors: ${displayedBook.authors.map(
                          author => author
                        )}`}
                  </p>
                  <p>Average Rating: {displayedBook.averageRating}</p>
                  <p>Description: {displayedBook.description}</p>
                  <p>Page Count: {displayedBook.pageCount}</p>
                </CardInfoDiv>
            </Container>
          </CardBody>
          <CardHeader>
            <CardHeaderDiv>
              <p>Owner of Book: {displayedBook.ownerId}</p>
              <p>
                Currently Checked out by:
                {displayedBook.checkedOut
                  ? displayedBook.borrowerId
                  : " Not Checked Out"}
              </p>
            </CardHeaderDiv>
          </CardHeader>
        </Card>
      </BookHold>
    </ContainerDiv>
  );
};

export default withRouter(Book);
