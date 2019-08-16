import React from "react";
import firebase from "../../firebase/firebase.utils";
import "firebase/auth";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { useAlert } from "react-alert";
const uniqueID = require("uniqid");

const AddBookModal = props => {
  const alert = useAlert();
  const db = firebase.firestore();
  const auth = firebase.auth();
  const curUser = auth.currentUser;

  const addBook = () => {
    const idHold = uniqueID("n1-");
    const bookObj = props.bookInfoValues;
    db.collection("users")
      .doc(curUser.uid)
      .get()
      .then(doc => {
        if (doc.exists) {
          const userEmail = doc.data().email;
          db.collection("books")
            .doc(idHold)
            .set({
              // book info
              id: idHold,
              authors: bookObj.authors,
              title: bookObj.title,
              image: bookObj.image,
              description: bookObj.description,
              isbn: bookObj.isbn,
              isbn13: bookObj.isbn13,
              language: bookObj.language,
              pageCount: bookObj.pageCount,
              publishDate: bookObj.publishDate,
              publisher: bookObj.publisher,
              // user info
              ownerId: curUser.uid,
              ownerEmail: userEmail,
              requestedId: [],
              transitionUser: "",
              checkedOut: false,
              borrowerId: ""
            });
          alert.success("Success!");
        } else {
          console.log("No such document!");
        }
      })
      .catch(error => {
        console.log("Error getting document:", error);
      });
  };
  return (
    <Modal
      isOpen={props.bookInfoModal}
      toggle={props.toggleBookInfoModal}
      centered
    >
      <ModalHeader>Book Info: </ModalHeader>
      <ModalBody>
        description: {props.bookInfoValues.description}
        <br />
        isbn: {props.bookInfoValues.isbn}
        <br />
        isbn13: {props.bookInfoValues.isbn13}
        <br />
        language: {props.bookInfoValues.language}
        <br />
        page-count: {props.bookInfoValues.pageCount}
        <br />
        publish-date: {props.bookInfoValues.publishDate}
        <br />
        publisher: {props.bookInfoValues.publisher}
      </ModalBody>
      <ModalFooter>
        <Button onClick={addBook}>Add Book</Button>
        <Button onClick={props.toggleBookInfoModal}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddBookModal;
