import React, { useState } from "react";
import firebase from "../../firebase/firebase.utils";
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

const BorrowedBook = props => {
  const db = firebase.firestore();
  const [returnBookModal, setReturnBookModal] = useState(false);
  const alert = useAlert();

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
        <CardContainerDiv onClick={toggleReturnBookModal}>
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
      <Modal isOpen={returnBookModal} toggle={toggleReturnBookModal} centered>
        <ModalHeader>Return Book</ModalHeader>
        <ModalBody>
          Are you sure you want to return book back to owner?
        </ModalBody>
        <ModalFooter>
          <Button onClick={returnBook}>Confirm</Button>
          <Button onClick={toggleReturnBookModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </CardDiv>
  );
};

export default BorrowedBook;
