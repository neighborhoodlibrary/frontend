import React, { useContext, useState, useEffect } from "react";
import BookContext from "../../context/book/bookContext";
import EditBookModal from "./EditBookModal";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import firebase from "../../firebase/firebase.utils";
import "firebase/auth";
import { Card, CardHeader, CardBody, CardFooter, Button } from "reactstrap";

const ContainerDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const BookHold = styled.div`
  width: 75%;
  margin: 10px
  padding: 17px;
  border-radius: 3px;
  border: 1px solid rgb(0, 0, 0, 0.2);
  -webkit-box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
`;

const CardHeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardInfoDiv = styled.div`
  #centering {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const CardFooterDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BookCover = styled.img`
  max-height: 200px;
  max-width: 200px;
`;

const Book = props => {
  const auth = firebase.auth();
  const curUser = auth.currentUser;
  const bookContext = useContext(BookContext);
  const [user, setUser] = useState("");
  const [displayedBook, getDisplayedBook] = useState([]);
  const [editBookModal, setEditBookModal] = useState(false);

  useEffect(() => {
    setUser(curUser.uid);
    getBook();
  }, []);

  const getBook = () => {
    const aBook = bookContext.getBook();
    if (aBook.title) {
      getDisplayedBook(aBook);
    } else {
      goBack();
    }
  };

  const toggleEditBookModal = () => {
    editBookModal ? setEditBookModal(false) : setEditBookModal(true);
  };

  const goBack = () => {
    props.history.goBack();
  };
  return (
    <ContainerDiv>
      <BookHold>
        <Card>
          <CardHeader>
            <CardHeaderDiv>
              <div>
                {displayedBook.ownerId === user && !displayedBook.checkedOut ? (
                  <Button onClick={toggleEditBookModal}>Edit</Button>
                ) : (
                  ""
                )}
              </div>
              <h5>{displayedBook.title}</h5>
              <Button onClick={goBack}>Back</Button>
            </CardHeaderDiv>
          </CardHeader>
          <CardBody>
            <CardInfoDiv>
              <div id="centering">
                <BookCover src={displayedBook.image} alt="book_thumb" />
              </div>
              <p>
                {!displayedBook.authors
                  ? "Author: N/A"
                  : displayedBook.authors.length === 1
                  ? `Author: ${displayedBook.authors[0]}`
                  : `Authors: ${displayedBook.authors.join(" , ")}`}
              </p>
              <p>Description: {displayedBook.description}</p>
              <p>Isbn: {displayedBook.isbn}</p>
              <p>Isbn13: {displayedBook.isbn13}</p>
              <p>Language: {displayedBook.language}</p>
              <p>Page Count: {displayedBook.pageCount}</p>
              <p>Publish Date: {displayedBook.publishDate}</p>
              <p>Publisher: {displayedBook.publisher}</p>
            </CardInfoDiv>
          </CardBody>
          <CardFooter>
            <CardFooterDiv>
              <p>Owner of Book: {displayedBook.ownerId}</p>
              <p>
                Currently Checked out by:
                {displayedBook.checkedOut
                  ? displayedBook.borrowerId
                  : " Not Checked Out"}
              </p>
            </CardFooterDiv>
          </CardFooter>
        </Card>
      </BookHold>
      {displayedBook.title ? (
        <EditBookModal
          book={displayedBook}
          toggleEditBookModal={toggleEditBookModal}
          editBookModal={editBookModal}
          goBack={goBack}
        />
      ) : (
        ""
      )}
    </ContainerDiv>
  );
};

export default withRouter(Book);
