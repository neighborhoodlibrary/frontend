import React from "react";
import AddBookCard from "./AddBookCard";
import styled from "styled-components";

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
  return (
    <BookMapDiv>
      {props.bookResults.map(book => (
        <AddBookCard book={book} key={Date.now() + Math.random()} />
      ))}
    </BookMapDiv>
  );
}
