import React, { useState } from "react";
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

import firebase from "../../firebase/firebase.utils";
import { useAlert } from "react-alert";
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

const ToBeGivenBook = props => {
  const bookDocRef = firebase
    .firestore()
    .collection("books")
    .doc(props.book.id);
  const alert = useAlert();
  const [removeToGiveModal, setRemoveToGiveModal] = useState(false);

  const toggleRemoveToGiveModal = () => {
    removeToGiveModal
      ? setRemoveToGiveModal(false)
      : setRemoveToGiveModal(true);
  };

  const submitRemoveTransition = () => {
    bookDocRef
      .update({
        transitionUser: ""
      })
      .then(() => {
        alert.success("Removal from give section successful");
        props.getRequested();
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
          <Button onClick={toggleRemoveToGiveModal}>Undo</Button>
        </CardFooter>
      </Card>
      <Modal
        isOpen={removeToGiveModal}
        toggle={toggleRemoveToGiveModal}
        centered
      >
        <ModalHeader>Remove from To Give Section</ModalHeader>
        <ModalBody>
          Are you sure you want to remove user from the to loan section?
        </ModalBody>
        <ModalFooter>
          <Button onClick={submitRemoveTransition}>Confirm</Button>
          <Button onClick={toggleRemoveToGiveModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </CardDiv>
  );
};

export default ToBeGivenBook;
