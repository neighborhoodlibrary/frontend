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

const LoanedBook = props => {
  // const db = firebase.firestore();
  const [loanedBookModal, setLoanedBookModal] = useState(false);
  const [dayValue, setDayValue] = useState(null);
  // const [bookStatus, setBookStatus] = useState(null);

  useEffect(() => {
    getDay();
    // checkBook();
  }, []);

  const getDay = () => {
    let currentDate = new Date();
    let dueDate = new Date(props.book.dueDate);
    let difference = Math.round((dueDate - currentDate) / 86400000);
    setDayValue(difference);
  };

  // const checkBook = () => {
  //   if (dayValue <= 5 && dayValue >= 0) {
  //     return setBookStatus("warning");
  //   }
  //   if (dayValue < 0) {
  //     return setBookStatus("danger");
  //   } else {
  //     return setBookStatus(null);
  //   }
  // };

  const toggleLoanedBookModal = () => {
    loanedBookModal ? setLoanedBookModal(false) : setLoanedBookModal(true);
  };

  return (
    <CardDiv>
      <Card
        body
        outline
        color={dayValue < 0 ? "danger" : dayValue < 5 ? "warning" : null}
      >
        <CardContainerDiv onClick={toggleLoanedBookModal}>
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
      <Modal isOpen={loanedBookModal} toggle={toggleLoanedBookModal} centered>
        <ModalHeader>Loaned Book</ModalHeader>
        <ModalBody>
          <p>You have lent out this book</p>
          <p>
            {props.book.dueDate
              ? `Due by: ${props.book.dueDate.split("T")[0]}`
              : ""}
          </p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={toggleLoanedBookModal}>Confirm</Button>
          <Button onClick={toggleLoanedBookModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </CardDiv>
  );
};

export default LoanedBook;
