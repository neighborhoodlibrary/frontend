import React, { useState } from "react";
import { useAlert } from "react-alert";
import firebase from "../../firebase/firebase.utils";
import "firebase/auth";
import styled from "styled-components";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
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
`;
const CardBodyDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ReceivingBook = props => {
  const bookDocRef = firebase
    .firestore()
    .collection("books")
    .doc(props.book.id);
  const alert = useAlert();
  const [receiveBookModal, setReceiveBookModal] = useState(false);

  const toggleReceiveBookModal = () => {
    receiveBookModal ? setReceiveBookModal(false) : setReceiveBookModal(true);
  };

  const confirmLoanBookFunc = () => {
    const currentTransitionUser = props.book.transitionUser;
    bookDocRef
      .update({
        borrowerId: currentTransitionUser,
        transitionUser: firebase.firestore.FieldValue.delete(),
        requestedId: firebase.firestore.FieldValue.arrayRemove(
          currentTransitionUser
        )
      })
      .then(() => {
        alert.success("Confirmed, book received, Now in you Borrowed section");
        props.getReceiving();
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
            <img src={props.book.googThumbnail} alt="book_thumb" />
          </CardBodyDiv>
          <Button onClick={toggleReceiveBookModal}>
            Confirm recieved Book
          </Button>
        </CardBody>
      </Card>
      <Modal isOpen={receiveBookModal} toggle={toggleReceiveBookModal}>
        <ModalHeader>Confirm book is now in your possession</ModalHeader>
        <ModalBody>
          Confirm you have recieved book, set book in the Borrowed section?
        </ModalBody>
        <ModalFooter>
          <Button onClick={confirmLoanBookFunc}>Confirm</Button>
          <Button onClick={toggleReceiveBookModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </CardDiv>
  );
};

export default ReceivingBook;