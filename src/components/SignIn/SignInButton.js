import React, { useContext, useState, useEffect } from "react";
import UserContext from "../../context/user/userContext";
import firebase from "../../firebase/firebase.utils";
import "firebase/auth";

import { Redirect } from "react-router-dom";

export default function SignInButton() {
  const userContext = useContext(UserContext);

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    console.log(loggedIn);
    console.log(userContext.userState.user.email);
    if (loggedIn == false) {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          userContext.setLogin(true);
          loggedInToTrue();
        }
      });
    }
  });

  const loggedInToTrue = () => {
    setLoggedIn(true);
  };

  const auth = firebase.auth();

  var curUser = auth.currentUser;

  const db = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });

  const firstTimeLogin = () =>
    auth.signInWithPopup(provider).then(result => {
      console.log(result.user);
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
      return <button onClick={signOut}>Sign Out</button>;
    } else {
      return <button onClick={firstTimeLogin}>Sign In</button>;
    }
  }

  return <div>{display()}</div>;
}
