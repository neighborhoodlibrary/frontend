import React, { useContext, useEffect, useState } from "react";
import BookContext from "../../context/book/bookContext";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  UncontrolledTooltip
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

const LibraryBook = props => {
  const bookContext = useContext(BookContext);
  const [bookStatus, setBookStatus] = useState(null);
  const [importantMissing, setImportantMissing] = useState(null);
  const [fieldMissing, setFieldMissing] = useState(null);
  const setBookFunc = () => {
    bookContext.setBook(props.book);
  };
  //
  useEffect(() => {
    checkBook();
    updateMissing();
  }, "");
  const checkBook = () => {
    if (
      props.book.authors.length === 0 ||
      props.book.authors[0] === "" ||
      !props.book.title ||
      !props.book.image
    ) {
      setBookStatus("danger");
    } else if (
      (props.book.isbn.length === 0 && props.book.isbn13.length === 0) ||
      (props.book.isbn[0] === "" && props.book.isbn13[0] === "") ||
      !props.book.description ||
      !props.book.language
    ) {
      setBookStatus("warning");
    }
  };
  const updateMissing = () => {
    const tempImportant = [];
    const tempField = [];
    if (props.book.authors.length === 0 || props.book.authors[0] === "") {
      tempImportant.push("authors");
    }
    if (!props.book.title) {
      tempImportant.push("title");
    }
    if (!props.book.image) {
      tempImportant.push("image");
    }
    if (
      (props.book.isbn.length === 0 && props.book.isbn13.length === 0) ||
      props.book.isbn[0] === "" ||
      props.book.isbn13[0] === ""
    ) {
      tempField.push("isbn");
    }
    if (!props.book.description) {
      tempField.push("description");
    }
    if (!props.book.language) {
      tempField.push("language");
    }
    if (tempImportant.length === 0) {
      setImportantMissing(null);
    } else {
      setImportantMissing(tempImportant);
    }
    if (tempField.length === 0) {
      setFieldMissing(null);
    } else {
      setFieldMissing(tempField);
    }
  };

  return (
    <CardDiv>
      <Card body outline color={bookStatus} id={props.book.id}>
        <NavLink to={`/shelf/book/${props.book.id}`} onClick={setBookFunc}>
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
        </NavLink>
      </Card>
      {importantMissing !== null && fieldMissing !== null ? (
        <UncontrolledTooltip placement="auto" target={props.book.id}>
          You are missing important fields: {importantMissing.join(" , ")}
          <br />
          you are also missing: {fieldMissing.join(" , ")}
        </UncontrolledTooltip>
      ) : importantMissing !== null ? (
        <UncontrolledTooltip placement="auto" target={props.book.id}>
          You are missing important fields: {importantMissing.join(" , ")}
        </UncontrolledTooltip>
      ) : fieldMissing !== null ? (
        <UncontrolledTooltip placement="auto" target={props.book.id}>
          you are missing some fields: {fieldMissing.join(" , ")}
        </UncontrolledTooltip>
      ) : (
        ""
      )}
    </CardDiv>
  );
};

export default LibraryBook;
