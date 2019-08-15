import React, { useState, useEffect } from "react";
import firebase from "../../firebase/firebase.utils";
import { useAlert } from "react-alert";
import styled from "styled-components";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
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

const BookCover = styled.img`
  max-height: 200px;
  max-width: 200px;
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
  const [infoModal, setInfoModal] = useState(false);
  const [requestModal, setRequestModal] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [emailValue, setEmailValue] = useState({});

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
  }, "");

  const toggleInfoModal = () => {
    infoModal ? setInfoModal(false) : setInfoModal(true);
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
    alert.info("Please wait, sending request via email...");
    bookDocRef
      .get()
      .then(doc => {
        if (doc.exists) {
          const requestedId = doc.data().requestedId;
          if (requestedId.includes(user.uid)) {
            return alert.error(
              "You have already requested this book from owner, please wait for a response back."
            );
          } else {
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
    //
  };
  return (
    <SearchBookCardDiv>
      <Card className="heightLimiter">
        <CardHeader tag="h4">{props.book.title}</CardHeader>
        <CardHeader tag="h6">
          {props.book.authors ? (
            props.book.authors.map(author => (
              <div key={Math.random()}>by: {author}</div>
            ))
          ) : (
            <div>by: NA</div>
          )}
        </CardHeader>
        <div className="imghold">
          <BookCover src={props.book.image} alt="book_thumb" />
        </div>
        <CardBody>
          <Modal isOpen={infoModal} toggle={toggleInfoModal} centered>
            <h3>
              <u>Book Information</u>
            </h3>
            <ModalHeader>Page Count: {props.book.pageCount}</ModalHeader>
            <ModalHeader>Publisher: {props.book.publisher}</ModalHeader>
            <ModalHeader>Published: {props.book.publishDate}</ModalHeader>
            <ModalHeader>Description: {props.book.description}</ModalHeader>
            <ModalHeader>ISBN13: {props.book.isbn13}</ModalHeader>
            <ModalHeader>ISBN: {props.book.isbn}</ModalHeader>
          </Modal>
          <div className="buttonz">
            <Button color="info" onClick={toggleInfoModal}>
              More Details
            </Button>
            <Button color="primary" onClick={toggleRequestModal}>
              Request Book
            </Button>
            <Modal isOpen={requestModal} toggle={toggleRequestModal} centered>
              <ModalHeader>Request Book from user</ModalHeader>
              <ModalBody>
                Are you sure you want to request book: {props.book.title} from
                user?
              </ModalBody>
              <ModalFooter>
                <Button onClick={submitRequest} color="success">
                  Confirm
                </Button>
                <Button onClick={toggleRequestModal} color="secondary">
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        </CardBody>
      </Card>
    </SearchBookCardDiv>
  );
};

export default SearchBookCard;
