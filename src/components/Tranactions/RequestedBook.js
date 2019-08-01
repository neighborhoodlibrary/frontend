import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody } from "reactstrap";
import styled from "styled-components";

const CardDiv = styled.div`
  margin: 15px;

  a {
    text-decoration: none;
    font-family: "Merriweather Sans", sans-serif;
    color: black;
  }
`;

const CardHeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardBodyDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RequestedBook = props => {
  return (
    <CardDiv>
      <Card>
        <CardHeader>
          <CardHeaderDiv>{props.book.title}</CardHeaderDiv>
        </CardHeader>
        <CardBody>
          <CardBodyDiv>
            <p>by: {props.book.authors}</p>
            <img src={props.book.googThumbnail} alt="book_thumb" />
          </CardBodyDiv>
        </CardBody>
      </Card>
    </CardDiv>
  );
};

export default RequestedBook;
