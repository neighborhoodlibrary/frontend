import React, { useContext, useState } from "react";
import BookContext from "../../context/book/bookContext";
import EditBookModal from "./EditBookModal";
import { useAlert } from "react-alert";
import firebase from "../../firebase/firebase.utils";
import "firebase/auth";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  CardFooter,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  UncontrolledTooltip
} from "reactstrap";

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
  font-weight: bold;
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
  const db = firebase.firestore();
  const auth = firebase.auth();
  const user = auth.currentUser;
  const alert = useAlert();
  const bookContext = useContext(BookContext);
  const [deleteBookModal, setDeleteBookModal] = useState(false);
  const [returnBookModal, setReturnBookModal] = useState(false);
  const [editBookModal, setEditBookModal] = useState(false);

  const setBookFunc = () => {
    bookContext.setBook(props.book);
  };

  const toggleDeleteBookModal = () => {
    deleteBookModal ? setDeleteBookModal(false) : setDeleteBookModal(true);
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

  const toggleEditBookModal = () => {
    editBookModal ? setEditBookModal(false) : setEditBookModal(true);
  };

  return (
    <CardDiv>
      <Card>
        <CardHeader>
          <CardHeaderDiv>
            {props.book.ownerId !== props.userUid ? (
              ""
            ) : (
              <div>
                <Button
                  onClick={toggleDeleteBookModal}
                  id={`${props.book.id}-d`}
                >
                  X
                </Button>
                <UncontrolledTooltip
                  placement="auto"
                  target={`${props.book.id}-d`}
                >
                  Delete Book
                </UncontrolledTooltip>
              </div>
            )}
            {props.book.title}
            {props.book.ownerId && !props.book.checkedOut ? (
              <div>
                <Button onClick={toggleEditBookModal} id={`${props.book.id}-e`}>
                  =
                </Button>
                <UncontrolledTooltip
                  placement="auto"
                  target={`${props.book.id}-e`}
                >
                  Edit Book
                </UncontrolledTooltip>
              </div>
            ) : (
              ""
            )}
          </CardHeaderDiv>
        </CardHeader>
        <NavLink to={`/shelf/book/${props.book.id}`} onClick={setBookFunc}>
          <CardBody>
            <CardBodyDiv>
              <p>by: {props.book.authors}</p>
              <BookCover src={props.book.image} alt="book_thumb" />
            </CardBodyDiv>
          </CardBody>
        </NavLink>
        <CardFooter />
      </Card>
      <Modal isOpen={deleteBookModal} toggle={toggleDeleteBookModal} centered>
        <ModalHeader>Delete Book</ModalHeader>
        <ModalBody>
          Are you sure you want to delete book from your library?
        </ModalBody>
        <ModalFooter>
          <Button onClick={deleteBook}>Confirm</Button>
          <Button onClick={toggleDeleteBookModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
      <EditBookModal
        book={props.book}
        toggleEditBookModal={toggleEditBookModal}
        editBookModal={editBookModal}
        getBooks={props.getBooks}
      />
    </CardDiv>
  );
};

export default LibraryBook;
