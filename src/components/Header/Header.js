import React, { useContext, useState, useEffect } from "react";
import NavMenu from "./NavMenu/NavMenu";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import SignInButton from "../SignIn/SignInButton";

import UserContext from "../../context/user/userContext";

import firebase from "../../firebase/firebase.utils";
import "firebase/auth";

const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  margin: 0px 0px 20px 0px;

  h1 {
    font-size: 3.25em;
    font-family: "Merriweather", serif;
    color: white;
  }

  a {
    text-decoration: none;
    color: black;
  }

  a:hover {
    color: black;
  }

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const SideBar = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
`;

export default function Header() {
  const userContext = useContext(UserContext);
  const auth = firebase.auth();

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (loggedIn === false) {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          var curUser = auth.currentUser;

          var loginObj = {
            user: curUser,
            loggedIn: true
          };
          userContext.setLogin(loginObj);
          loggedInToTrue();
        }
      });
    }
  });

  const loggedInToTrue = () => {
    setLoggedIn(true);
  };

  function signOut() {
    auth
      .signOut()
      .then(setLoggedIn(false))
      .catch(function(error) {});
    userContext.setLogin(false);
  }
  return (
    <HeaderDiv>
      <NavLink to="/">
        <h1>Neighborhood Library</h1>
      </NavLink>
      <SideBar>
        {loggedIn === true ? <NavMenu /> : ""}
        <SignInButton signOut={signOut} />
      </SideBar>
    </HeaderDiv>
  );
}
