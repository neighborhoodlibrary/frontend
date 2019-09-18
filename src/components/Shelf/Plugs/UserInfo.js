import React, { useContext } from "react";
import UserContext from "../../../context/user/userContext";
import styled from "styled-components";

const UserInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgb(252,252,252);
  color: rgb(40,40,40);
  font-size: 0.9em;
  padding: 10px;
  font-family: "Merriweather";
  border-radius: 2px;
  width: 100%;
  height: 100%;
  border-right: 1px solid rgb(0,0,0,0.2);

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
