import React, { useContext } from "react";
import UserContext from "../../context/user/userContext";
import firebase from "../../firebase/firebase.utils";
import styled from "styled-components";
import "firebase/auth";
import { NavLink } from "react-router-dom";
import { useAlert } from "react-alert";

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
  const alert = useAlert();
  const userContext = useContext(UserContext);

  const auth = firebase.auth();

  const db = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });

  const firstTimeLogin = () =>
    auth
      .signInWithPopup(provider)
      .then(result => {
        console.log(result.additionalUserInfo);
        if (result.additionalUserInfo.isNewUser === true) {
          const { displayName, email, photoURL, uid } = result.user;

          db.collection("users")
            .doc(uid)
            .set({
              displayName,
              email,
              photoURL,
              coordinates: null,
              books: [],
              loaned: [],
              borrowed: []
            });
        }
        userContext.addUser(result.user);
      })
      .then(() => {
        alert.success("Login successfull");
      })
      .catch(error => {
        console.log(error);
        alert.error({ error });
      });

  function display() {
    if (userContext.userState.loggedIn === true) {
      return (
        <NavLink to="/">
          <SIButton onClick={props.signOut}>Sign Out</SIButton>
        </NavLink>
      );
    } else {
      return (
        <NavLink to="/shelf">
          <SIButton onClick={firstTimeLogin}>Sign In</SIButton>
        </NavLink>
      );
    }
  }

  return <div>{display()}</div>;
}
