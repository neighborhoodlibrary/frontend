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
        <CardContainerDiv onClick={toggleReceiveBookModal}>
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
      <Modal isOpen={receiveBookModal} toggle={toggleReceiveBookModal} centered>
        <ModalHeader>Confirm book is now in your possession</ModalHeader>
        <ModalBody>
          Confirm you have received book, set book in the Borrowed section?
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
