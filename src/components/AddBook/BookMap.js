import React from "react";
import AddBookCard from "./AddBookCard";
import styled from "styled-components";
import GoogleBookCard from "./GoogleBookCard";

const BookMapDiv = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (max-width: 870px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 550px) {
    grid-template-columns: 1fr;
  }

  .noresults {
    display: flex;
    justify-content: center;
    padding: 20px;
  }
`;

export default function BookMap(props) {
  console.log(props);
  return (
    <BookMapDiv>
      {props.bookResults && props.passApiVal === "google"
        ? props.bookResults.map(book => (
            <GoogleBookCard book={book} key={Math.random()} />
          ))
        : ""}
      {/* {props.bookResults.map(book => (
        <AddBookCard book={book} key={Math.random()} />
      ))} */}
    </BookMapDiv>
  );
}
