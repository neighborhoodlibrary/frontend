import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import styled from "styled-components";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Collapse,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import { NavLink } from "react-router-dom";

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

  .descHold {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-top: 1px solid rgb(240, 240, 240);
    border-bottom: 1px solid rgb(240, 240, 240);
    background-color: rgb(245, 245, 245);
    padding: 10px;
  }

  .buttonz {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 10px;
  }

  h6 {
    display: flex;
  }
`;

const SearchBookCard = props => {
  const [collapse, setCollapse] = useState(false);
  const [modal, setModal] = useState(false);

  const toggleCollapse = () => {
    collapse ? setCollapse(false) : setCollapse(true);
  };
  const toggleModal = () => {
    modal ? setModal(false) : setModal(true);
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
          <Collapse isOpen={collapse}>
            <CardHeader>Page Count: {props.book.pageCount}</CardHeader>
            <CardHeader>Publisher: {props.book.publisher}</CardHeader>
            <CardHeader>Published:{props.book.publishedDate}</CardHeader>
            <CardHeader>Description:{props.book.description}</CardHeader>
            <CardHeader>
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
            </CardHeader>
          </Collapse>
          <div className="buttonz">
            <Button
              color="info"
              onClick={toggleCollapse}
              style={{ marginBottom: "1rem" }}
            >
              More Details
            </Button>
            <Button color="success" onClick={toggleModal}>
              Request Book
            </Button>
            <Modal isOpen={modal} toggle={toggleModal}>
              <ModalHeader toggle={toggleModal}>
                Request Book from user
              </ModalHeader>
              <ModalBody>
                Are you sure you want to request book: {props.book.title} from
                user?
              </ModalBody>
              <ModalFooter>
                <Button>Confirm</Button>
                <Button>Cancel</Button>
              </ModalFooter>
            </Modal>
          </div>
        </CardBody>
      </Card>
    </SearchBookCardDiv>
  );
};

export default SearchBookCard;
