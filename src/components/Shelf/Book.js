import React, { useContext, useState } from "react";
import BookContext from "../../context/book/bookContext";
// import EditBookModal from "./EditBookModal";
// import { useAlert } from "react-alert";
// import firebase from "../../firebase/firebase.utils";
// import "firebase/auth";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter
  // Button
  // Modal,
  // ModalHeader,
  // ModalBody,
  // ModalFooter,
  // UncontrolledTooltip
} from "reactstrap";

const CardDiv = styled.div`
  margin: 15px;

  a {
    text-decoration: none;
    font-family: "Merriweather Sans", sans-serif;
    color: black;
  }
`;
const CardBodyDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const BookCover = styled.img`
  max-height: 200px;
  max-width: 200px;
`;
const CardContainerDiv = styled.div`
  cursor: pointer;
`;

const LibraryBook = props => {
  // const db = firebase.firestore();
  // const auth = firebase.auth();
  // const user = auth.currentUser;
  // const alert = useAlert();
  const bookContext = useContext(BookContext);

  // const [editBookModal, setEditBookModal] = useState(false);

  const setBookFunc = () => {
    bookContext.setBook(props.book);
  };

  // const toggleEditBookModal = () => {
  //   editBookModal ? setEditBookModal(false) : setEditBookModal(true);
  // };

  return (
    <CardDiv>
      <Card>
        <NavLink to={`/shelf/book/${props.book.id}`} onClick={setBookFunc}>
          <CardHeader>
            {props.book.title}
            {/* {props.book.ownerId && !props.book.checkedOut ? (
              <div>
                <Button onClick={toggleEditBookModal} id={`${props.book.id}-e`}>
                  =
                </Button>
                <UncontrolledTooltip
                  placement="auto"
                  target={`${props.book.id}-e`}
                >
                  Edit Book
                </UncontrolledTooltip>
              </div>
            ) : (
              ""
            )} */}
          </CardHeader>
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
        </NavLink>
      </Card>
      {/* <EditBookModal
        book={props.book}
        toggleEditBookModal={toggleEditBookModal}
        editBookModal={editBookModal}
        getBooks={props.getBooks}
      /> */}
    </CardDiv>
  );
};

export default LibraryBook;
