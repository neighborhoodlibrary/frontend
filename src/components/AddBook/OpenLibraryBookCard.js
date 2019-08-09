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

const OpenLibraryBookCard = props => {
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
    let image = [];
    if (props.book.cover_i) {
      image.push(
        `http://covers.openlibrary.org/b/id/${props.book.cover_i}-M.jpg`
      );
    } else if (props.book.isbn) {
      image.push(
        `http://covers.openlibrary.org/b/isbn/${props.book.isbn[0]}-M.jpg`
      );
    } else if (props.book.id_goodreads) {
      image.push(
        `http://covers.openlibrary.org/b/goodreads/${
          props.book.id_goodreads[0]
        }-M.jpg`
      );
    } else if (props.book.id_librarything) {
      image.push(
        `http://covers.openlibrary.org/b/librarything/${
          props.book.id_librarything[0]
        }-M.jpg`
      );
    } else if (props.book.id_oclc) {
      image.push(
        `http://covers.openlibrary.org/b/oclc/${props.book.id_oclc[0]}-M.jpg`
      );
    }
    setBookInfoValues({
      ...bookInfoValues,
      authors: props.book.author_name,
      image: image,
      title: props.book.title
    });
  }, {});
  const toggleBookInfoModal = () => {
    if (bookInfoModal) {
      setBookInfoModal(false);
    } else {
      let isbn = [];
      let isbn13 = [];
      if (props.book.isbn) {
        props.book.isbn.forEach(i => {
          if (i.startsWith("9")) {
            isbn13.push(i);
          } else {
            isbn.push(i);
          }
        });
      }
      setBookInfoValues({
        ...bookInfoValues,
        // no description value
        isbn: isbn,
        isbn13: isbn13,
        language: props.book.language,
        // no page count
        publishDate: props.book.publish_date,
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

export default OpenLibraryBookCard;
