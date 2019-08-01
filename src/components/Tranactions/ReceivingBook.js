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
  const [receiveBookModal, setReceiveBookModal] = useState(false);

  const toggleReceiveBookModal = () => {
    receiveBookModal ? setReceiveBookModal(false) : setReceiveBookModal(true);
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
          Confirm you have recieved book, set book in the loaned section?
        </ModalBody>
        <ModalFooter>
          <Button>Confirm</Button>
          <Button onClick={toggleReceiveBookModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </CardDiv>
  );
};

export default ReceivingBook;
