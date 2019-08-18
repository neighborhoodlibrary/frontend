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
const CardBodyDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const BookCover = styled.img`
  max-height: 200px;
  max-width: 200px;
`;
const CardContainerDiv = styled.div`
  cursor: pointer;
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
        <CardContainerDiv onClick={toggleRecoverBookModal}>
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
        </CardContainerDiv>
      </Card>
      <Modal isOpen={recoverBookModal} toggle={toggleRecoverBookModal} centered>
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
