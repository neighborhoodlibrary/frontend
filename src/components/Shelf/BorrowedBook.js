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
//
import Axios from "axios";
const URL = "https://neighborhoodlibraryback.herokuapp.com/email";

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
  const [dayValue, setDayValue] = useState(null);
  //
  const auth = firebase.auth();
  const user = auth.currentUser;
  const userDocRef = db.collection("users").doc(user.uid);
  const [emailValue, setEmailValue] = useState({});
  const alert = useAlert();
  useEffect(() => {
    getDay();
  }, "");

  const getDay = () => {
    let currentDate = new Date();
    let dueDate = new Date(props.book.dueDate);
    let difference = Math.round((dueDate - currentDate) / 86400000);
    setDayValue(difference);
  };

  const toggleReturnBookModal = () => {
    if (returnBookModal) {
      setReturnBookModal(false);
      setEmailValue({});
    } else {
      setReturnBookModal(true);
      userDocRef
        .get()
        .then(doc => {
          if (doc.exists) {
            let email = doc.data().email;
            setEmailValue({
              to: props.book.ownerEmail,
              from: email,
              subject: "Book return from Neighborhood Library",
              text: `User with email: ${email} wishes to return the book: ${
                props.book.title
              }, back to you, Please email them back to setup location and time of pickup.`,
              html: `User with email: ${email} wishes to return the book: ${
                props.book.title
              }, back to you, Please email them back to setup location and time of pickup.`
            });
          } else {
            console.log("No such document!");
          }
        })
        .catch(error => {
          console.log("Error getting the document:", error);
        });
    }
  };

  const returnBook = () => {
    alert.info("Please wait, sending request via email...");
    const msg = emailValue;
    Axios.post(URL, msg).then(res => {
      const ownerId = props.book.ownerId;
      db.collection("books")
        .doc(props.book.id)
        .update({
          transitionUser: ownerId
        })
        .then(() => {
          alert.success(
            "Successfully requested book return, Book is set to return to owner"
          );
          props.getBooks();
        });
    });
  };

  return (
    <CardDiv>
      <Card>
        <CardContainerDiv onClick={toggleReturnBookModal}>
          <CardHeader>
            <CardHeaderDiv>
              <div>{props.book.title}</div>
              <div>
                {!dayValue
                  ? ""
                  : dayValue >= 0
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
