import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../../context/user/userContext";
import styled from "styled-components";

const UserInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgb(252,252,252);
  padding: 10px;
  font-size: 0.9em;
  font-family: "Merriweather Sans";
  border-radius: 2px;
  width: 100%;

  div {
    padding: 7.5px 2px;
  }
`;

export default function UserInfo() {
  const userContext = useContext(UserContext);

  var curUser = userContext.userState.user;

  return (
    <UserInfoDiv>
      <div>{curUser.displayName}</div>
      <div>{curUser.email}</div>
      <div>Books in library: {curUser.personalBookCount}</div>
    </UserInfoDiv>
  );
}
