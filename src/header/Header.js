import React, { useContext, useState, useEffect } from "react";
import NavMenu from "./NavMenu";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../context/user/userContext";
import firebase from "../firebase/firebase.utils";
import "firebase/auth";

const HeaderDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 17px;
  margin: 0px 0px 20px 0px;
  border-bottom: 1px solid rgb(10, 10, 10, 0.5);
  -webkit-box-shadow: 1px 1px 3px 0px rgba(30, 30, 30, 0.4);
  -moz-box-shadow: 1px 1px 3px 0px rgba(30, 30, 30, 0.4);
  box-shadow: 1px 1px 3px 0px rgba(30, 30, 30, 0.4);

  h1 {
    font-size: 3em;
    font-family: "Merriweather", serif;
    padding: 10px 5px;
    border-bottom: 2px solid #28a745;
  }

  @media (max-width: 800px) {
    h1 {
      font-size: 2.5em;
    }
  }

  @media (max-width: 500px) {
    text-align: center;
  }

  a {
    text-decoration: none;
    color: black;
  }

  a:hover {
    text-decoration: wavy;
    color: black;
  }
`;

const SideBar = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const Header = props => {
  const userContext = useContext(UserContext);
  const auth = firebase.auth();
  const db = firebase.firestore();
  const [loggedIn, setLoggedIn] = useState(false);
  //
  useEffect(() => {
    if (loggedIn === false) {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          const userDB = db.collection("users").doc(`${auth.currentUser.uid}`);
          userDB
            .get()
            .then(function(user) {
              userContext.addUser(user.data());
            })
            .catch(function(error) {
              console.log(error);
            });
          loggedInToTrue();
        } else {
          props.history.push("/landing");
        }
      });
    }
  }, {});
  const loggedInToTrue = () => {
    setLoggedIn(true);
  };
  //
  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        setLoggedIn(false);
        userContext.setLogin(false);
      })
      .catch(function(error) {});
  };
  return (
    <div>
      {loggedIn ? (
        <HeaderDiv>
          <h1>
            <NavLink to="/shelf">Neighborhood Library</NavLink>
          </h1>
          <SideBar>
            <NavMenu signOut={signOut} />
          </SideBar>
        </HeaderDiv>
      ) : (
        ""
      )}
    </div>
  );
};

export default Header;
