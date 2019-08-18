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
`;

const ModalHeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 465px;
`;

const EditBookModal = props => {
  console.log(props.book);
  const alert = useAlert();
  const db = firebase.firestore();
  const storage = firebase.storage();
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
  const [deleteBookModal, setDeleteBookModal] = useState(false);

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
    if (imageFile.type.match(/image.*/)) {
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
    if (bookValues.imageInput) {
      storage
        .ref(`images/${bookValues.imageInput.name}`)
        .put(bookValues.imageInput)
        .then(() => {
          storage
            .ref(`images/${bookValues.imageInput.name}`)
            .getDownloadURL()
            .then(url => {
              const bookId = props.book.id;
              const bookObj = { ...bookValues };
              const authArr = bookObj.authorsInput.split(",");
              db.collection("books")
                .doc(bookId)
                .update({
                  authors: authArr,
                  title: bookObj.titleInput,
                  image: url,
                  description: bookObj.descriptionInput,
                  isbn: bookObj.isbnInput,
                  isbn13: bookObj.isbn13Input,
                  language: bookObj.languageInput,
                  pageCount: bookObj.pageCountInput,
                  publishDate: bookObj.publishDateInput,
                  publisher: bookObj.publisherInput
                })
                .then(() => {
                  props.toggleEditBookModal();
                  alert.success("Successfully edited book!");
                  props.getBook();
                });
            });
        });
    } else {
      const bookId = props.book.id;
      const bookObj = { ...bookValues };
      const authArr = bookObj.authorsInput.split(",");
      db.collection("books")
        .doc(bookId)
        .update({
          authors: authArr,
          title: bookObj.titleInput,
          description: bookObj.descriptionInput,
          isbn: bookObj.isbnInput,
          isbn13: bookObj.isbn13Input,
          language: bookObj.languageInput,
          pageCount: bookObj.pageCountInput,
          publishDate: bookObj.publishDateInput,
          publisher: bookObj.publisherInput
        })
        .then(() => {
          props.toggleEditBookModal();
          alert.success("Successfully edited book!");
          props.getBook();
        });
    }
  };

  // delete book
  const toggleDeleteBookModal = () => {
    deleteBookModal ? setDeleteBookModal(false) : setDeleteBookModal(true);
  };
  const deleteBook = e => {
    e.preventDefault();
    db.collection("books")
      .doc(`${props.book.id}`)
      .delete()
      .then(() => {
        props.getBook();
        alert.success("Book deleted!");
      })
      .catch(error => alert.error("Unable to delete book!"));
  };

  return (
    <div>
      <Modal isOpen={props.editBookModal} toggle={props.toggleEditBookModal}>
        <ModalHeader>
          <ModalHeaderDiv>
            <div>Edit Book</div>
            <Button onClick={toggleDeleteBookModal}>Delete</Button>
          </ModalHeaderDiv>
        </ModalHeader>
        <ModalBody>
          <EditBookForm>
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
          <Button onClick={submitEditBook}>Edit Book</Button>
          <Button onClick={props.toggleEditBookModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={deleteBookModal} toggle={toggleDeleteBookModal} centered>
        <ModalHeader>Delete Book</ModalHeader>
        <ModalBody>
          Are you sure you want to delete book from your library?
        </ModalBody>
        <ModalFooter>
          <Button onClick={deleteBook}>Confirm</Button>
          <Button onClick={toggleDeleteBookModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default EditBookModal;
