import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import styled from "styled-components";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

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

const SearchBookCard = props => {
  const [infoModal, setInfoModal] = useState(false);
  const [requestModal, setRequestModal] = useState(false);

  const toggleInfoModal = () => {
    infoModal ? setInfoModal(false) : setInfoModal(true);
  };
  const toggleRequestModal = () => {
    requestModal ? setRequestModal(false) : setRequestModal(true);
  };

  return (
    <SearchBookCardDiv>
      <Card className="heightLimiter">
        <CardHeader tag="h4">{props.book.title}</CardHeader>
        <CardHeader tag="h6">
          {props.book.authors ? (
            props.book.authors.map(author => (
              <div key={Math.random()}>by: {author}</div>
            ))
          ) : (
            <div>by: NA</div>
          )}
        </CardHeader>
        <div className="imghold">
          <img src={props.book.googThumbnail} alt="book_thumb" />
        </div>
        <CardBody>
          <Modal isOpen={infoModal} toggle={toggleInfoModal} centered>
            <h3>
              <u>Book Information</u>
            </h3>
            <ModalHeader>Page Count: {props.book.pageCount}</ModalHeader>
            <ModalHeader>Publisher: {props.book.publisher}</ModalHeader>
            <ModalHeader>Published:{props.book.publishedDate}</ModalHeader>
            <ModalHeader>Description:{props.book.description}</ModalHeader>
            <ModalHeader>
              {!props.book.googIi
                ? ""
                : props.book.googIi.map(ident => {
                    return Object.entries(ident)
                      .reverse()
                      .map(([key, value]) => (
                        <div key={Math.random()}>
                          {key}: {value}
                        </div>
                      ));
                  })}
            </ModalHeader>
          </Modal>
          <div className="buttonz">
            <Button color="info" onClick={toggleInfoModal}>
              More Details
            </Button>
            <Button color="primary" onClick={toggleRequestModal}>
              Request Book
            </Button>
            <Modal isOpen={requestModal} toggle={toggleRequestModal} centered>
              <ModalHeader>Request Book from user</ModalHeader>
              <ModalBody>
                Are you sure you want to request book: {props.book.title} from
                user?
              </ModalBody>
              <ModalFooter>
                <Button color="success">Confirm</Button>
                <Button onClick={toggleRequestModal} color="secondary">
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        </CardBody>
      </Card>
    </SearchBookCardDiv>
  );
};

export default SearchBookCard;
