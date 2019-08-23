import React, { useState, useEffect } from "react";
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

const ReturnBook = props => {
  const bookDocRef = firebase
    .firestore()
    .collection("books")
    .doc(props.book.id);
  const alert = useAlert();
  const [removeReturnModal, setRemoveReturnModal] = useState(false);
  const [dayValue, setDayValue] = useState(null);

  useEffect(() => {
    getDay();
  }, []);

  const getDay = () => {
    let currentDate = new Date();
    let dueDate = new Date(props.book.dueDate);
    let difference = Math.round((dueDate - currentDate) / 86400000);
    setDayValue(difference);
  };

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
        <CardContainerDiv onClick={toggleRemoveReturnModal}>
          <CardHeader>
            <CardHeaderDiv>
              <div>{props.book.title}</div>
              <div>
                {dayValue >= 0
                  ? `due in: ${dayValue} days`
                  : `overdue by: ${Math.abs(dayValue)} days`}
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
      <Modal
        isOpen={removeReturnModal}
        toggle={toggleRemoveReturnModal}
        centered
      >
        <ModalHeader>Remove from the return section</ModalHeader>
        <ModalBody>
          <p>
            {props.book.dueDate
              ? `Due by: ${props.book.dueDate.split("T")[0]}`
              : ""}
          </p>
          <p>
            Are you sure you want to remove the book from the return section?
          </p>
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
