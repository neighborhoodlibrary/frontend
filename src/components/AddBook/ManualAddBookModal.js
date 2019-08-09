import React, { useState } from "react";
import firebase from "../../firebase/firebase.utils";
import "firebase/auth";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { useAlert } from "react-alert";
const uniqueID = require("uniqid");

const ManualAddBookModal = props => {
  const manualAddBook = () => {
    console.log("fired");
  };
  return (
    <Modal
      isOpen={props.manualAddModal}
      toggle={props.toggleManualAddModal}
      centered
    >
      <ModalHeader>Add Book Manually</ModalHeader>
      <ModalBody>info</ModalBody>
      <ModalFooter>
        <Button color="success" onClick={manualAddBook}>
          Add Book
        </Button>
        <Button color="secondary" onClick={props.toggleManualAddModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ManualAddBookModal;
