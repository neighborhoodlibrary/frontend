import React, { useContext, useState, useEffect } from "react";
import UserContext from "../../context/user/userContext";
import firebase from "../../firebase/firebase.utils";
import styled from 'styled-components';
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

export default function SignInButton() {
  const userContext = useContext(UserContext);

  const auth = firebase.auth();

  const db = firebase.firestore();

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (loggedIn === false) {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          var curUser = auth.currentUser;

          var varUser = {
            displayName: "Holder"
          };

          // db.collection("users")
          //   .doc(curUser.uid)
          //   .get()
          //   .then(ss =>{
          //     varUser = ss.data();
          //     console.log(varUser)
          //   })
          //   .catch(error => {
          //     console.log(error)
          //   })

          //   console.log(varUser)
          

          var loginObj = {
            user: curUser,
            loggedIn: true
          }
          userContext.setLogin(loginObj);
          loggedInToTrue();
        }
      });
    }
  });

  const loggedInToTrue = () => {
    setLoggedIn(true);
  };

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

  function signOut() {
    auth
      .signOut()
      .then(function() {})
      .catch(function(error) {});
    userContext.setLogin(false);
  }

  function display() {
    if (userContext.userState.loggedIn === true) {
      return <SIButton onClick={signOut}>Sign Out</SIButton>;
    } else {
      return <SIButton onClick={firstTimeLogin}>Sign In</SIButton>;
    }
  }

  return <div>{display()}</div>;
}
