import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Button } from "reactstrap";
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
      image: props.book.image_url,
      title: props.book.title
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
          description: res.data.description,
          isbn: res.data.isbn,
          isbn13: res.data.isbn13,
          language: res.data.language_code,
          pageCount: res.data.num_pages,
          publishDate: publicationDate,
          publisher: res.data.publisher
        });
        setBookInfoModal(true);
      });
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

export default GoodreadsBookCard;
