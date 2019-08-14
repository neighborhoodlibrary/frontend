import React, { useState, useEffect } from "react";
import firebase from "../../firebase/firebase.utils";
import "firebase/auth";
import { useAlert } from "react-alert";
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
import styled from "styled-components";

const EditBookForm = styled.div`
  margin: 20px;
  justify-content: center;
  align-items: center;
  padding: 10px 5px 15px 20px;

  authors {
    padding: 5px;
  }
`;

const EditBookModal = props => {
  const alert = useAlert();
  const db = firebase.firestore();
  const storage = firebase.storage();
  const auth = firebase.auth();
  const curUser = auth.currentUser;

  const [bookValues, setBookValues] = useState({
    authorsInput: "",
    titleInput: "",
    imageInput: null,
    descriptionInput: "",
    isbnInput: "",
    isbn13Input: "",
    languageInput: "",
    pageCountInput: "",
    publishDateInput: "",
    publisherInput: ""
  });

  useEffect(() => {
    const authInput = props.book.authors.join(",");
    setBookValues({
      authorsInput: authInput,
      titleInput: props.book.title,
      descriptionInput: props.book.description,
      isbnInput: props.book.isbn,
      isbn13Input: props.book.isbn13,
      languageInput: props.book.language,
      pageCountInput: props.book.pageCount,
      publishDateInput: props.book.publishDate,
      publisherInput: props.book.publisher
    });
  }, {});

  const handleImage = e => {
    let imageFile = e.target.files[0];
    if (imageFile.type.mathc(/image.*/)) {
      setBookValues({ ...bookValues, imageInput: imageFile });
    } else {
      props.toggleEditBookModal();
      alert.error("Cant upload anything other than an image");
    }
  };
  const handleChanges = e => {
    const { name, value } = e.target;
    setBookValues({ ...bookValues, [name]: value });
  };
  const submitEditBook = () => {
    console.log("editbook!");
  };

  return (
    <Modal isOpen={props.editBookModal} toggle={props.toggleEditBookModal}>
      <ModalHeader>Edit Book</ModalHeader>
      <ModalBody>
        <EditBookForm>
          <Form>
            <div className="authors">
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
            </div>
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
              <Label for="isbnI">Other Isbn</Label>
              <Input
                type="text"
                name="isbnInput"
                id="isbnI"
                placeholder="Isbn other than isbn13"
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
              <Label for="imageI">Edit Book Cover</Label>
              <Input
                type="file"
                name="imageInput"
                id="imageI"
                onChange={handleImage}
              />
              <FormText color="muted">
                Please place book cover image file here
              </FormText>
            </FormGroup>
          </Form>
        </EditBookForm>
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={submitEditBook}>
          Edit Book
        </Button>
        <Button color="secondary" onClick={props.toggleEditBookModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditBookModal;
