import React, { useContext } from "react";
import UserContext from "../context/user/userContext";
import firebase from "../firebase/firebase.utils";
import { Button } from "reactstrap";
import "firebase/auth";
import { useAlert } from "react-alert";

export default function SignInComponent(props) {
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
        const { displayName, email, photoURL, uid } = result.user;
        const docRef = db.collection("users").doc(uid);
        docRef.get().then(doc => {
          if (doc.exists) {
            userContext.addUser(result.user);
            props.routerProps.history.push("/shelf");
          } else {
            docRef.set({
              displayName,
              email,
              photoURL,
              books: [],
              loaned: [],
              borrowed: []
            });
            userContext.addUser(result.user);
            props.routerProps.history.push("/shelf");
          }
        });
      })
      .then(() => {
        alert.success("Login successfull");
      })
      .catch(error => {
        console.log(error);
        alert.error({ error });
      });

  return (
    <div>
      {!userContext.userState.loggedIn ? (
        <Button color="primary" onClick={firstTimeLogin}>
          Sign In with Google
        </Button>
      ) : (
        ""
      )}
    </div>
  );
}