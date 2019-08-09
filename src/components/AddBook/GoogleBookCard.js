import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Button } from "reactstrap";
import styled from "styled-components";
import AddBookModal from "./AddBookModal";

const AddBookCardDiv = styled.div`
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

const GoogleBookCard = props => {
  const [bookInfoValues, setBookInfoValues] = useState({
    authors: [],
    image: "",
    title: "",
    //
    description: "",
    isbn: "",
    isbn13: "",
    language: "",
    pageCount: "",
    publishDate: "",
    publisher: ""
  });
  const [bookInfoModal, setBookInfoModal] = useState(false);

  useEffect(() => {
    setBookInfoValues({
      ...bookInfoValues,
      authors: props.book.authors,
      image: props.book.thumbnail,
      title: props.book.title
    });
  }, {});

  const toggleBookInfoModal = () => {
    if (bookInfoModal) {
      setBookInfoModal(false);
    } else {
      let isbn = [];
      let isbn13 = [];
      if (props.book.industryIdentifiers) {
        props.book.industryIdentifiers.map(i => {
          if (i.identifier.startsWith("9")) {
            isbn13.push(i.identifier);
          } else {
            isbn.push(i.identifier);
          }
        });
      }
      setBookInfoValues({
        ...bookInfoValues,
        description: props.book.description,
        isbn: isbn,
        isbn13: isbn13,
        language: props.book.language,
        pageCount: props.book.pageCount,
        publishDate: props.book.publishDate,
        publisher: props.book.publisher
      });
      setBookInfoModal(true);
    }
  };

  return (
    <AddBookCardDiv>
      <Card className="heightLimiter">
        <CardHeader tag="h4">{bookInfoValues.title}</CardHeader>
        <CardHeader tag="h6">
          {bookInfoValues.authors
            ? bookInfoValues.authors.map(author => (
                <div key={Math.random()}>{author}</div>
              ))
            : ""}
        </CardHeader>
        <div className="imghold">
          <img src={bookInfoValues.image} alt="thumbnail" />
        </div>
        <CardBody>
          <Button color="info" onClick={toggleBookInfoModal}>
            More details... / Add Book
          </Button>
        </CardBody>
      </Card>
      <AddBookModal
        bookInfoValues={bookInfoValues}
        bookInfoModal={bookInfoModal}
        toggleBookInfoModal={toggleBookInfoModal}
      />
    </AddBookCardDiv>
  );
};

export default GoogleBookCard;
