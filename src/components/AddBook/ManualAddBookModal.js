import React, { useState } from "react";
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
import styled from "styled-components";

const ManualAddBookForm = styled.div`
  margin: 20px;
`;

const uniqueID = require("uniqid");

const ManualAddBookModal = props => {
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

  const handleImage = e => {
    let imageFile = e.target.files[0];
    if (imageFile.type.match(/image.*/)) {
      setBookValues({ ...bookValues, imageInput: imageFile });
    } else {
      props.toggleManualAddModal();
      alert.error("Cant upload anything other than an image");
    }
  };

  const handleChanges = e => {
    const { name, value } = e.target;
    setBookValues({ ...bookValues, [name]: value });
  };

  const manualAddBook = () => {
    const idHold = uniqueID("n1-");
    if (bookValues.imageInput) {
      storage
        .ref(`images/${bookValues.imageInput.name}`)
        .put(bookValues.imageInput)
        .then(() => {
          storage
            .ref(`images/${bookValues.imageInput.name}`)
            .getDownloadURL()
            .then(url => {
              db.collection("users")
                .doc(curUser.uid)
                .get()
                .then(doc => {
                  if (doc.exists) {
                    const userEmail = doc.data().email;
                    const idHold = uniqueID("n1-");
                    const bookObj = { ...bookValues };
                    const authArr = bookObj.authorsInput
                      ? bookObj.authorsInput.split(",")
                      : [];
                    db.collection("books")
                      .doc(idHold)
                      .set({
                        // book info
                        id: idHold,
                        authors: authArr,
                        title: bookObj.titleInput,
                        image: url,
                        description: bookObj.descriptionInput,
                        isbn: bookObj.isbnInput,
                        isbn13: bookObj.isbn13Input,
                        language: bookObj.languageInput,
                        pageCount: bookObj.pageCountInput,
                        publishDate: bookObj.publishDateInput,
                        publisher: bookObj.publisherInput,
                        dueDate: "",
                        // user info
                        ownerId: curUser.uid,
                        ownerEmail: userEmail,
                        requestedId: [],
                        transitionUser: "",
                        checkedOut: false,
                        borrowerId: ""
                      })
                      .then(() => {
                        //personal count
                        db.collection("users")
                          .doc(curUser.uid)
                          .update({
                            personalBookCount: firebase.firestore.FieldValue.increment(
                              1
                            )
                          });
                        // count ref
                        db.collection("count")
                          .doc("counter")
                          .update({
                            bookCount: firebase.firestore.FieldValue.increment(
                              1
                            )
                          });
                        props.toggleManualAddModal();
                        alert.success("Success!");
                      });
                  } else {
                    console.log("No such document!");
                  }
                })
                .catch(error => {
                  console.log("Error getting document:", error);
                });
            });
        });
    } else {
      db.collection("users")
        .doc(curUser.uid)
        .get()
        .then(doc => {
          if (doc.exists) {
            const userEmail = doc.data().email;
            const bookObj = { ...bookValues };
            const authArr = bookObj.authorsInput
              ? bookObj.authorsInput.split(",")
              : [];
            db.collection("books")
              .doc(idHold)
              .set({
                // book info
                id: idHold,
                authors: authArr,
                title: bookObj.titleInput,
                image: null,
                description: bookObj.descriptionInput,
                isbn: bookObj.isbnInput,
                isbn13: bookObj.isbn13Input,
                language: bookObj.languageInput,
                pageCount: bookObj.pageCountInput,
                publishDate: bookObj.publishDateInput,
                publisher: bookObj.publisherInput,
                dueDate: "",
                // user info
                ownerId: curUser.uid,
                ownerEmail: userEmail,
                requestedId: [],
                transitionUser: "",
                checkedOut: false,
                borrowerId: ""
              })
              .then(() => {
                //personal count
                db.collection("users")
                  .doc(curUser.uid)
                  .update({
                    personalBookCount: firebase.firestore.FieldValue.increment(
                      1
                    )
                  });
                // count ref
                db.collection("count")
                  .doc("counter")
                  .update({
                    bookCount: firebase.firestore.FieldValue.increment(1)
                  });
                props.toggleManualAddModal();
                alert.success("Success!");
              });
          } else {
            console.log("No such document!");
          }
        })
        .catch(error => {
          console.log("Error getting document:", error);
        });
    }
  };

  return (
    <Modal isOpen={props.manualAddModal} toggle={props.toggleManualAddModal}>
      <ModalHeader>Add Book Manually</ModalHeader>
      <ModalBody>
        <ManualAddBookForm>
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
              <Label for="imageI">Book Cover</Label>
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
        </ManualAddBookForm>
      </ModalBody>
      <ModalFooter>
        <Button onClick={manualAddBook}>Add Book</Button>
        <Button onClick={props.toggleManualAddModal}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

export default ManualAddBookModal;
