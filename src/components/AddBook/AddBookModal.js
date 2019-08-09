import React from "react";
import firebase from "../../firebase/firebase.utils";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { useAlert } from "react-alert";
const uniqueID = require("uniqid");

const AddBookModal = props => {
  const alert = useAlert();
  const db = firebase.firestore();
  const auth = firebase.auth();
  const user = auth.currentUser;

  const addBook = () => {
    const idHold = uniqueID("n1-");
    console.log(props);
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
        <Button color="success" onClick={addBook}>
          Add Book
        </Button>
        <Button color="secondary" onClick={props.toggleBookInfoModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddBookModal;
