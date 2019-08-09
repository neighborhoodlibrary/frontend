import React, { useContext, useState, useEffect } from "react";
import UserContext from "../../context/user/userContext";
import BookContext from "../../context/book/bookContext";

import { useAlert } from "react-alert";
//

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
  ModalFooter
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

const LibraryBook = props => {
  const db = firebase.firestore();
  const auth = firebase.auth();
  const user = auth.currentUser;
  const alert = useAlert();
  const bookContext = useContext(BookContext);
  const userContext = useContext(UserContext);
  const [userInfo, getUserInfo] = useState({});
  const [deleteBookModal, setDeleteBookModal] = useState(false);
  const [returnBookModal, setReturnBookModal] = useState(false);

  useEffect(() => {
    getUserInfo(userContext.getUser());
  }, []);

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

  const toggleReturnBookModal = () => {
    returnBookModal ? setReturnBookModal(false) : setReturnBookModal(true);
  };

  const returnBook = () => {
    const ownerId = props.book.ownerId;
    db.collection("books")
      .doc(props.book.id)
      .update({
        transitionUser: ownerId
      })
      .then(() => {
        alert.success("Book is set to return to owner");
        props.getBooks();
      });
  };

  return (
    <CardDiv>
      <Card>
        <CardHeader>
          <CardHeaderDiv>
            {props.book.ownerId !== userInfo.uid ? (
              ""
            ) : (
              <Button color="danger" onClick={toggleDeleteBookModal}>
                X
              </Button>
            )}
            {props.book.title}
          </CardHeaderDiv>
        </CardHeader>
        <NavLink to={`/shelf/book/${props.book.id}`} onClick={setBookFunc}>
          <CardBody>
            <CardBodyDiv>
              <p>by: {props.book.authors}</p>
              <img src={props.book.image} alt="book_thumb" />
            </CardBodyDiv>
          </CardBody>
        </NavLink>
        <CardFooter>
          {props.book.borrowerId === user.uid ? (
            <Button color="primary" onClick={toggleReturnBookModal}>
              Return Book
            </Button>
          ) : (
            ""
          )}
        </CardFooter>
      </Card>
      <Modal isOpen={deleteBookModal} toggle={toggleDeleteBookModal} centered>
        <ModalHeader>Delete Book</ModalHeader>
        <ModalBody>
          Are you sure you want to delete book from your library?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={deleteBook}>
            Confirm
          </Button>
          <Button onClick={toggleDeleteBookModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={returnBookModal} toggle={toggleReturnBookModal} centered>
        <ModalHeader>Return Book</ModalHeader>
        <ModalBody>
          Are you sure you want to return book back to owner?
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={returnBook}>
            Confirm
          </Button>
          <Button onClick={toggleReturnBookModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </CardDiv>
  );
};

export default LibraryBook;
