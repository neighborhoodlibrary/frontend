import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "reactstrap";
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
const CardBodyDiv = styled.div`
display: flex;
flex-direction: column
align-items: center
`;
const BookCover = styled.img`
  max-height: 200px;
  max-width: 200px;
`;
const CardContainerDiv = styled.div`
  cursor: pointer;
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
      authors: props.book.authors ? props.book.authors : [],
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
        pageCount: props.book.pageCount ? props.book.pageCount.toString() : "",
        publishDate: props.book.publishedDate,
        publisher: props.book.publisher
      });
      setBookInfoModal(true);
    }
  };

  return (
    <AddBookCardDiv>
      <Card>
        <CardContainerDiv onClick={toggleBookInfoModal}>
          <CardHeader style={{ height: 50 }}>
            {bookInfoValues.title.length > 37
              ? `${bookInfoValues.title.substring(0, 37)}...`
              : bookInfoValues.title}
          </CardHeader>
          <CardBody
            style={{
              height: 240,
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <CardBodyDiv>
              <BookCover src={bookInfoValues.image} alt="thumbnail" />
            </CardBodyDiv>
          </CardBody>
          <CardFooter style={{ height: 50 }}>
            <p>
              by:{" "}
              {!bookInfoValues.authors
                ? "N/A"
                : bookInfoValues.authors.join(" , ").length > 35
                ? `${bookInfoValues.authors.join(" , ").substring(0, 35)}...`
                : bookInfoValues.authors.join(" , ")}
            </p>
          </CardFooter>
        </CardContainerDiv>
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
