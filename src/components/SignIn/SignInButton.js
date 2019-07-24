import React, { useContext } from "react";
import UserContext from "../../context/user/userContext";
import firebase from "../../firebase/firebase.utils";
import { Button } from 'reactstrap';
import "firebase/auth";
import { NavLink } from "react-router-dom";

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
      return (
        <NavLink to="/">
          <Button onClick={props.signOut}>Sign Out</Button>
        </NavLink>
      );
    } else {
      return (
        <NavLink to="/shelf">
          <Button onClick={firstTimeLogin}>Sign In</Button>
        </NavLink>
      );
    }
  }

  return <div>{display()}</div>;
}
