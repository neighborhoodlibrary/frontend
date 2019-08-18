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

const LoanedBook = props => {
  const db = firebase.firestore();
  const [loanedBookModal, setLoanedBookModal] = useState(false);
  const alert = useAlert();

  const toggleLoanedBookModal = () => {
    loanedBookModal ? setLoanedBookModal(false) : setLoanedBookModal(true);
  };

  return (
    <CardDiv>
      <Card>
        <CardContainerDiv onClick={toggleLoanedBookModal}>
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
      <Modal isOpen={loanedBookModal} toggle={toggleLoanedBookModal} centered>
        <ModalHeader>Loaned Book</ModalHeader>
        <ModalBody>You have lent out this book</ModalBody>
        <ModalFooter>
          <Button onClick={toggleLoanedBookModal}>Confirm</Button>
          <Button onClick={toggleLoanedBookModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </CardDiv>
  );
};

export default LoanedBook;
