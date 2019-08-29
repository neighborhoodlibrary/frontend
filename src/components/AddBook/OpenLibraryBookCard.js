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
      authors: props.book.author_name ? props.book.author_name : [],
      image: image ? image[0] : "",
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
        isbn: isbn.length > 0 ? isbn.slice(0, 1) : [],
        isbn13: isbn13.length > 0 ? isbn13.slice(0, 1) : [],
        language: props.book.language ? props.book.language[0] : "",
        // no page count
        publishDate: props.book.publish_date ? props.book.publish_date[0] : "",
        publisher: props.book.publisher ? props.book.publisher[0] : ""
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

export default OpenLibraryBookCard;
