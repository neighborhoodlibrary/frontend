import React, { useContext, useState, useEffect } from "react";
import UserContext from "../../context/user/userContext";
import firebase from "../../firebase/firebase.utils";
import "firebase/auth";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: row
    min-height: 100px
    min-width: 100px
`;
const Item = styled.div`
  border: 1px solid black;
`;

const LibraryBook = props => {
  console.log(props);
  return (
    <Container>
      <Item>
        <p>title: {props.book.title}</p>
        <p>author: {props.book.authors}</p>
        <p>avgRating: {props.book.averageRating}</p>
        <img src={props.book.thumbnail} alt="book_thumb" />
      </Item>
    </Container>
  );
};

export default LibraryBook;
