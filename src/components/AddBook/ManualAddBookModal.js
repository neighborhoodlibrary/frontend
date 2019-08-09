import React, { useState, useEffect } from "react";
import firebase from "../../firebase/firebase.utils";
import "firebase/auth";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Button
} from "reactstrap";
import { useAlert } from "react-alert";
const uniqueID = require("uniqid");

const ManualAddBookModal = props => {
  const [bookValues, setBookValues] = useState({
    authorsInput: "",
    titleInput: "",
    imageInput: "",
    descriptionInput: "",
    isbnInput: "",
    isbn13Input: "",
    languageInput: "",
    pageCountInput: "",
    publishDateInput: "",
    publisherInput: ""
  });

  const handleChanges = e => {
    const { name, value } = e.target;
    setBookValues({ ...bookValues, [name]: value });
  };

  const manualAddBook = () => {
    console.log(bookValues);
  };
  return (
    <Modal
      isOpen={props.manualAddModal}
      toggle={props.toggleManualAddModal}
      centered
    >
      <ModalHeader>Add Book Manually</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup row>
            <Label for="authorI">Authors</Label>
            <Input
              type="text"
              name="authorsInput"
              id="authorI"
              placeholder="Separate authors with comma"
              onChange={handleChanges}
              value={bookValues.authorsInput}
              required
            />
          </FormGroup>
          <FormGroup row>
            <Label for="titleI">Title</Label>
            <Input
              type="text"
              name="titleInput"
              id="titleI"
              placeholder="Title of Book"
              onChange={handleChanges}
              value={bookValues.titleInput}
              required
            />
          </FormGroup>
          <FormGroup row>
            <Label for="descriptionI">Description</Label>
            <Input
              type="textarea"
              name="descriptionInput"
              id="descriptionI"
              placeholder="Book summary, or description"
              onChange={handleChanges}
              value={bookValues.descriptionInput}
            />
          </FormGroup>
          <FormGroup row>
            <Label for="isbn13I">Isbn13</Label>
            <Input
              type="text"
              name="isbn13Input"
              id="isbn13I"
              placeholder="International Standard Book Number, 13"
              onChange={handleChanges}
              value={bookValues.isbn13Input}
            />
          </FormGroup>
          <FormGroup row>
            <Label for="isbnI">Other isbn</Label>
            <Input
              type="text"
              name="isbnInput"
              id="isbnI"
              placeholder="Isbns other than isbn13, separate with comma"
              onChange={handleChanges}
              value={bookValues.isbnInput}
            />
          </FormGroup>
          <FormGroup row>
            <Label for="languageI">Language</Label>
            <Input
              type="text"
              name="languageInput"
              id="languageI"
              placeholder="Language of book"
              onChange={handleChanges}
              value={bookValues.languageInput}
            />
          </FormGroup>
          <FormGroup row>
            <Label for="pageCountI">Page Count</Label>
            <Input
              type="text"
              name="pageCountInput"
              id="pageCountI"
              placeholder="Total pages in book"
              onChange={handleChanges}
              value={bookValues.pageCountInput}
            />
          </FormGroup>
          <FormGroup row>
            <Label for="publishDateI">Published Date</Label>
            <Input
              type="text"
              name="publishDateInput"
              id="publishDateI"
              placeholder="Date the book was published"
              onChange={handleChanges}
              value={bookValues.publishDateInput}
            />
          </FormGroup>
          <FormGroup row>
            <Label for="publisherI">Publisher</Label>
            <Input
              type="text"
              name="publisherInput"
              id="publisherI"
              placeholder="Publishing company"
              onChange={handleChanges}
              value={bookValues.publisherInput}
            />
          </FormGroup>
          <FormGroup row>
            <Label for="imageI">Book Cover</Label>
            <Input
              type="file"
              name="imageInput"
              id="imageI"
              onChange={handleChanges}
              value={bookValues.imageInput}
            />
            <FormText color="muted">
              Please place book cover image file here
            </FormText>
          </FormGroup>
        </Form>
      </ModalBody>
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
