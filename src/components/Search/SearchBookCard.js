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
      <Card>
        <CardContainerDiv onClick={toggleRequestModal}>
          <CardHeader>{props.book.title}</CardHeader>
          <CardBody>
            <CardBodyDiv>
              <BookCover src={props.book.image} alt="book_thumb" />
            </CardBodyDiv>
          </CardBody>
          <CardFooter>
            <p>by: {props.book.authors.join(" , ")}</p>
          </CardFooter>
        </CardContainerDiv>
      </Card>
      <Modal isOpen={requestModal} toggle={toggleRequestModal} centered>
        <ModalHeader>Book Info:</ModalHeader>
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
