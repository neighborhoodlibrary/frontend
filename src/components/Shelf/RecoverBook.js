import React, { useState } from "react";
import firebase from "../../firebase/firebase.utils";
import "firebase/auth";
import { useAlert } from "react-alert";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import styled from "styled-components";

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

const RecoverBook = props => {
  const bookDocRef = firebase
    .firestore()
    .collection("books")
    .doc(props.book.id);
  const alert = useAlert();
  const [recoverBookModal, setRecoverBookModal] = useState(false);
  const toggleRecoverBookModal = () => {
    recoverBookModal ? setRecoverBookModal(false) : setRecoverBookModal(true);
  };

  const confirmRecoverBookFunc = () => {
    bookDocRef
      .update({
        borrowerId: "",
        checkedOut: false,
        transitionUser: ""
      })
      .then(() => {
        alert.success("Confirmed, book received, back in your library");
        props.getBooks();
      });
  };

  return (
    <CardDiv>
      <Card>
        <CardHeader>
          <CardHeaderDiv>{props.book.title}</CardHeaderDiv>
        </CardHeader>
        <CardBody>
          <CardBodyDiv>
            <p>by: {props.book.authors}</p>
            <BookCover src={props.book.image} alt="book_thumb" />
          </CardBodyDiv>
        </CardBody>
        <CardFooter>
          <Button onClick={toggleRecoverBookModal}>
            Confirm check-in of book
          </Button>
        </CardFooter>
      </Card>
      <Modal isOpen={recoverBookModal} toggle={toggleRecoverBookModal}>
        <ModalHeader>Confirm book is now in your possession</ModalHeader>
        <ModalBody>
          Confirm you have received book, and set it back to your Library?
        </ModalBody>
        <ModalFooter>
          <Button onClick={confirmRecoverBookFunc}>Confirm</Button>
          <Button onClick={toggleRecoverBookModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </CardDiv>
  );
};

export default RecoverBook;
