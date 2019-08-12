import React, { useState } from "react";
import { useAlert } from "react-alert";
import firebase from "../../firebase/firebase.utils";
import "firebase/auth";
import styled from "styled-components";
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
        checkedOut: true,
        transitionUser: "",
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
            <BookCover src={props.book.image} alt="book_thumb" />
          </CardBodyDiv>
        </CardBody>
        <CardFooter>
          <Button color="primary" onClick={toggleReceiveBookModal}>
            Confirm recieved Book
          </Button>
        </CardFooter>
      </Card>
      <Modal isOpen={receiveBookModal} toggle={toggleReceiveBookModal}>
        <ModalHeader>Confirm book is now in your possession</ModalHeader>
        <ModalBody>
          Confirm you have received book, set book in the Borrowed section?
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={confirmLoanBookFunc}>
            Confirm
          </Button>
          <Button onClick={toggleReceiveBookModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </CardDiv>
  );
};

export default ReceivingBook;
