import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "reactstrap";
import styled from "styled-components";
import AddBookModal from "./AddBookModal";
import Axios from "axios";
const URL = "https://neighborhoodlibraryback.herokuapp.com";

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

const GoodreadsBookCard = props => {
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
      authors: props.book.author[0].name,
      image: props.book.image_url ? props.book.image_url[0] : "",
      title: props.book.title ? props.book.title[0] : ""
    });
  }, {});

  const toggleBookInfoModal = () => {
    if (bookInfoModal) {
      setBookInfoModal(false);
    } else {
      let bId = { bookId: props.book.id[0]._ };
      Axios.post(`${URL}/grdetails`, bId).then(res => {
        let publicationDate = `${res.data.publication_year}/${
          res.data.publication_month
        }/${res.data.publication_day}`;
        setBookInfoValues({
          ...bookInfoValues,
          description: res.data.description ? res.data.description[0] : "",
          isbn: res.data.isbn,
          isbn13: res.data.isbn13,
          language: res.data.language_code ? res.data.language_code[0] : "",
          pageCount: res.data.num_pages ? res.data.num_pages[0] : "",
          publishDate: publicationDate,
          publisher: res.data.publisher ? res.data.publisher[0] : ""
        });
        setBookInfoModal(true);
      });
    }
  };

  return (
    <AddBookCardDiv>
      <Card>
        <CardContainerDiv onClick={toggleBookInfoModal}>
          <CardHeader>{bookInfoValues.title}</CardHeader>
          <CardBody>
            <CardBodyDiv>
              <BookCover src={bookInfoValues.image} alt="thumbnail" />
            </CardBodyDiv>
          </CardBody>
          <CardFooter>
            <p>
              by:{" "}
              {bookInfoValues.authors
                ? bookInfoValues.authors.join(" , ")
                : "N/A"}
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

export default GoodreadsBookCard;
