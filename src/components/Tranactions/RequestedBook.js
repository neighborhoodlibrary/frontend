import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import firebase from "../../firebase/firebase.utils";
import { useAlert } from "react-alert";
import styled from "styled-components";

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
const ModalHeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 465px;
`;

const RequestedBook = props => {
  const bookDocRef = firebase
    .firestore()
    .collection("books")
    .doc(props.book.id);
  const alert = useAlert();
  const [removeRequestModal, setRemoveRequestModal] = useState(false);
  const [removeButtonDropdown, setRemoveButtonDropdown] = useState(false);
  const [userOption, setUserOption] = useState("");
  const [loanBookModal, setLoanBookModal] = useState(false);
  const [loanButtonDropdown, setLoanButtonDropdown] = useState(false);

  const toggleRemoveRequestModal = () => {
    if (removeRequestModal) {
      setRemoveRequestModal(false);
    } else {
      setRemoveRequestModal(true);
      setUserOption("");
    }
  };

  const toggleRemoveButtonDropdown = () => {
    removeButtonDropdown
      ? setRemoveButtonDropdown(false)
      : setRemoveButtonDropdown(true);
  };

  const submitRemove = uOption => {
    if (uOption) {
      bookDocRef
        .update({
          requestedId: firebase.firestore.FieldValue.arrayRemove(uOption)
        })
        .then(() => {
          alert.success("Removal successful");
          props.getRequested();
        });
    } else {
      bookDocRef
        .get()
        .then(doc => {
          if (doc.exists) {
            const requestedId = doc.data().requestedId;
            requestedId.forEach(rId => {
              bookDocRef.update({
                requestedId: firebase.firestore.FieldValue.arrayRemove(rId)
              });
            });
          }
        })
        .then(() => {
          alert.success("Removal successful, all users removed");
          props.getRequested();
        });
    }
  };

  const userOptionFunc = uOption => {
    setUserOption(uOption);
  };

  const toggleLoanBookModal = () => {
    if (loanBookModal) {
      setLoanBookModal(false);
    } else {
      setLoanBookModal(true);
      setUserOption("");
    }
  };

  const toggleLoanButtonDropdown = () => {
    loanButtonDropdown
      ? setLoanButtonDropdown(false)
      : setLoanButtonDropdown(true);
  };

  const submitLoan = uOption => {
    if (props.book.borrowerId) {
      return alert.error(
        "Book is already checked out, can not loan it out currently"
      );
    }

    if (!uOption) {
      alert.error("Must choose user to loan book to");
    } else {
      bookDocRef
        .update({
          transitionUser: uOption
        })
        .then(() => {
          console.log("Document successfully updated");
          alert.success("Book sent to given section");
          props.getRequested();
        })
        .catch(error => {
          console.error("Error updating document", error);
        });
    }
  };

  return (
    <CardDiv>
      <Card>
        <CardContainerDiv onClick={toggleLoanBookModal}>
          <CardHeader>{props.book.title}</CardHeader>
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
        </CardContainerDiv>
      </Card>
      <Modal isOpen={loanBookModal} toggle={toggleLoanBookModal} centered>
        <ModalHeader>
          <ModalHeaderDiv>
            <div>Set Loan Book</div>
            <Button onClick={toggleRemoveRequestModal}>Remove</Button>
          </ModalHeaderDiv>
        </ModalHeader>
        <ModalBody>
          Please choose who to loan Book to:
          <ButtonDropdown
            isOpen={loanButtonDropdown}
            toggle={toggleLoanButtonDropdown}
          >
            <DropdownToggle caret>Choose user to loan book</DropdownToggle>
            <DropdownMenu>
              {props.book.requestedId.map(rId => (
                <DropdownItem
                  key={Math.random()}
                  onClick={() => userOptionFunc(rId)}
                >
                  {rId}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </ButtonDropdown>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => {
              submitLoan(userOption);
            }}
          >
            {userOption
              ? `Confirm Loan to: ${userOption}`
              : "Choose user to loan first"}
          </Button>
          <Button onClick={toggleLoanBookModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
      <Modal
        isOpen={removeRequestModal}
        toggle={toggleRemoveRequestModal}
        centered
      >
        <ModalHeader>Remove requested</ModalHeader>
        <ModalBody>
          Are you sure you want to remove requested users?
          <ButtonDropdown
            isOpen={removeButtonDropdown}
            toggle={toggleRemoveButtonDropdown}
          >
            <DropdownToggle caret>Choose user to remove</DropdownToggle>
            <DropdownMenu>
              {props.book.requestedId.map(rId => (
                <DropdownItem
                  key={Math.random()}
                  onClick={() => userOptionFunc(rId)}
                >
                  {rId}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </ButtonDropdown>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => {
              submitRemove(userOption);
            }}
          >
            {userOption ? `Confirm Remove ${userOption}` : "Remove all"}
          </Button>
          <Button onClick={toggleRemoveRequestModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </CardDiv>
  );
};

export default RequestedBook;
