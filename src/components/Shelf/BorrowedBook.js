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
const CardHeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
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
  // let dueDate = new Date(props.book.dueDate);
  // let currentDate = new Date();
  // let difference = dueDate - currentDate;
  // let dayDiff = difference / 86400000;
  // console.log(dueDate);
  // console.log(currentDate);
  // console.log(dueDate - currentDate);
  // console.log(currentDate - dueDate);
  // console.log(dayDiff);
  return (
    <CardDiv>
      <Card>
        <CardContainerDiv onClick={toggleReturnBookModal}>
          <CardHeader>
            <CardHeaderDiv>
              <div>{props.book.title}</div>
              <div>
                {props.book.dueDate
                  ? `due in: ${Math.round(
                      (new Date(props.book.dueDate) - new Date()) / 86400000
                    )} days`
                  : ""}
              </div>
            </CardHeaderDiv>
          </CardHeader>
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
          <p>
            {props.book.dueDate
              ? `Due by: ${props.book.dueDate.split("T")[0]}`
              : ""}
          </p>
          <p>Are you sure you want to return book back to owner?</p>
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
