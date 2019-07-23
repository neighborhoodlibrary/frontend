import React, { useContext, useState, useEffect } from "react";
import UserContext from "../../context/user/userContext";
import firebase from "../../firebase/firebase.utils";
import styled from "styled-components";
import "firebase/auth";

const SIButton = styled.button`
  margin: 0px 5px;
  background-color: #f0efed;
  color: #1a1919;
  padding: 6px 11px;
  border: none;
  border-radius: 2px;
  text-decoration: none;
  font-family: 'Merriweather Sans', sans-serif;

  &:hover {
    -webkit-animation: color-change-2x 2s linear infinite alternate both;
            animation: color-change-2x 2s linear infinite alternate both;
  }

  @-webkit-keyframes color-change-2x {
    0% {
      background: #f0efed;
      color: #1a1919
    }
    100% {
      background: #1a1919;
      color: #f0efed;
    }
  }
  @keyframes color-change-2x {
      0% {
        background: #f0efed;
        color: #1a1919;
      }
      100% {
        background: #1a1919;
        color: #f0efed;
      }
  }
 
 }
 
`;

export default function SignInButton(props) {
  const userContext = useContext(UserContext);

  const auth = firebase.auth();

  const db = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });

  const firstTimeLogin = () =>
    auth.signInWithPopup(provider).then(result => {
      const { displayName, email, photoURL, uid } = result.user;

      db.collection("users")
        .doc(uid)
        .set({
          displayName,
          email,
          photoURL,
          zipcode: null,
          books: [],
          loaned: [],
          borrowed: []
        });

      userContext.addUser(result.user);

      auth
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(function() {});
    });

  function display() {
    if (userContext.userState.loggedIn === true) {
      return <SIButton onClick={props.signOut}>Sign Out</SIButton>;
    } else {
      return <SIButton onClick={firstTimeLogin}>Sign In</SIButton>;
    }
  }

  return <div>{display()}</div>;
}
