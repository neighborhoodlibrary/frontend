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

const ReturnBook = props => {
  const bookDocRef = firebase
    .firestore()
    .collection("books")
    .doc(props.book.id);
  const alert = useAlert();
  const [removeReturnModal, setRemoveReturnModal] = useState(false);

  const toggleRemoveReturnModal = () => {
    removeReturnModal
      ? setRemoveReturnModal(false)
      : setRemoveReturnModal(true);
  };

  const submitRemoveTransition = () => {
    bookDocRef
      .update({
        transitionUser: ""
      })
      .then(() => {
        alert.success("Removal from the return section successful");
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
          <Button onClick={toggleRemoveReturnModal}>Remove from return</Button>
        </CardFooter>
      </Card>
      <Modal
        isOpen={removeReturnModal}
        toggle={toggleRemoveReturnModal}
        centered
      >
        <ModalHeader>Remove from the return section</ModalHeader>
        <ModalBody>
          Are you sure you want to remove the book from the return section?
        </ModalBody>
        <ModalFooter>
          <Button onClick={submitRemoveTransition}>Confirm</Button>
          <Button onClick={toggleRemoveReturnModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </CardDiv>
  );
};

export default ReturnBook;
