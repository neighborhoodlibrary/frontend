import React, { useState, useEffect } from "react";
import firebase from "../../firebase/firebase.utils";
import { useAlert } from "react-alert";
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
  ModalFooter,
  UncontrolledTooltip
} from "reactstrap";
//
import Axios from "axios";
const URL = "https://neighborhoodlibraryback.herokuapp.com/email";

const SearchBookCardDiv = styled.div`
  margin: 15px;
  font-family: "Merriweather Sans";

  .imghold {
    display: grid;
    justify-content: center;
    align-items: center;
    width: 100%;

    img {
      max-width: 200px;
      padding: 5px;
      border-radius: 1px;
    }
  }

  .buttonz {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 10px;
  }
`;
const CardBodyDiv = styled.div`
display: flex;
flex-direction: column
align-items: center
`;
const BookCover = styled.img`
  max-height: 200px;
  max-width: 200px;
`;
const CardContainerDiv = styled.div`
  cursor: pointer;
`;
const ModalHeaderDiv = styled.div`
  disply: flex;
`;

const SearchBookCard = props => {
  const auth = firebase.auth();
  const user = auth.currentUser;
  const userDocRef = firebase
    .firestore()
    .collection("users")
    .doc(user.uid);
  const bookDocRef = firebase
    .firestore()
    .collection("books")
    .doc(props.book.id);
  const alert = useAlert();
  const [requestModal, setRequestModal] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [emailValue, setEmailValue] = useState({});
  const [bookStatus, setBookStatus] = useState(null);

  useEffect(() => {
    userDocRef
      .get()
      .then(doc => {
        if (doc.exists) {
          let email = doc.data().email;
          setUserEmail(email);
        } else {
          console.log("No such document!");
        }
      })
      .catch(error => {
        console.log("Error getting the document:", error);
      });
    checkBook();
  }, "");

  const checkBook = () => {
    if (props.book.checkedOut === true) {
      setBookStatus("warning");
    } else {
      setBookStatus(null);
    }
  };

  const toggleRequestModal = () => {
    if (requestModal) {
      setRequestModal(false);
      setEmailValue({});
    } else {
      setRequestModal(true);
      setEmailValue({
        to: props.book.ownerEmail,
        from: userEmail,
        subject: "Requested Book from Neighborhood Library",
        text: `User with email: ${userEmail}, has requested to borrow one of your books: ${
          props.book.title
        }, Please email them back to setup location and time of pickup.`,
        html: `User with email: ${userEmail}, has requested to borrow one of your books: ${
          props.book.title
        }, Please email them back to setup location and time of pickup.`
      });
    }
  };

  const submitRequest = () => {
    bookDocRef
      .get()
      .then(doc => {
        if (doc.exists) {
          const requestedId = doc.data().requestedId;
          if (requestedId.includes(user.uid)) {
            return alert.error(
              "You have already requested this book from owner, please wait for a response back."
            );
          }
          if (props.book.borrowerId === user.uid) {
            return alert.error("You are currently borrowing this book.");
          } else {
            alert.info("Please wait, sending request via email...");
            const msg = emailValue;
            Axios.post(URL, msg).then(res => {
              bookDocRef.update({
                requestedId: firebase.firestore.FieldValue.arrayUnion(user.uid)
              });
              alert.success("Successfully requested book from owner.");
            });
          }
        } else {
          console.log("No such document!");
        }
      })
      .catch(error => {
        console.log("Error getting document:", error);
      });
  };
  console.log(props);
  return (
    <SearchBookCardDiv>
      <Card body outline color={bookStatus} id={props.book.id}>
        <CardContainerDiv onClick={toggleRequestModal}>
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
      {bookStatus !== null ? (
        <UncontrolledTooltip placement="auto" target={props.book.id}>
          Book is currently checked out, dute date:{" "}
          {props.book.dueDate.split("T")[0]}
        </UncontrolledTooltip>
      ) : (
        ""
      )}
      <Modal isOpen={requestModal} toggle={toggleRequestModal} centered>
        <ModalHeader>
          <ModalHeaderDiv>
            <div>Book Info:</div>
            <div>
              {props.book.checkedOut === true
                ? `Book currently checked-out, due: ${
                    props.book.dueDate.split("T")[0]
                  }`
                : ""}
            </div>
          </ModalHeaderDiv>
        </ModalHeader>
        <ModalBody>
          description: {props.book.description}
          <br />
          isbn: {props.book.isbn}
          <br />
          isbn13: {props.book.isbn13}
          <br />
          language: {props.book.language}
          <br />
          page-count: {props.book.pageCount}
          <br />
          publish-date: {props.book.publishDate}
          <br />
          publisher: {props.book.publisher}
        </ModalBody>
        <ModalFooter>
          <Button onClick={submitRequest}>Request Book</Button>
          <Button onClick={toggleRequestModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </SearchBookCardDiv>
  );
};

export default SearchBookCard;
