import React, { useContext, useState, useEffect } from "react";
import NavMenu from "./NavMenu";
import styled from "styled-components";
import SignInComponent from "./SignInComponent";
import UserContext from "../context/user/userContext";
import firebase from "../firebase/firebase.utils";
import "firebase/auth";

const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  margin: 0px 0px 20px 0px;


  @media (max-width: 800px) {
    flex-direction: column;
  }

  @media (max-width: 500px) {
    text-align: center;
  }
`;

const AppName = styled.div`
  h1 {
    font-size: 3.25em;
    font-family: "Merriweather", serif;
    color: white;
  }
`;

const SideBar = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  @media (max-width: 500px) {
    margin: auto;
  }
  
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
      <AppName>
        <h1>Neighborhood Library</h1>
      </AppName>
      <SideBar>
        {loggedIn === true ? <NavMenu /> : ""}
        <SignInComponent signOut={signOut} />
      </SideBar>
    </HeaderDiv>
  );
}
