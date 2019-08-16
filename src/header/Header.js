import React, { useContext, useState, useEffect } from "react";
import NavMenu from "./NavMenu";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../context/user/userContext";
import firebase from "../firebase/firebase.utils";
import "firebase/auth";
import tmplo from "./tmplo.png";

const HeaderDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 17px;
  margin: 0px 0px 20px 0px;
  -webkit-box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.75);
  box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.75);

  h1 {
    font-size: 1.5em;
    font-family: "Merriweather", serif;
    border-bottom: 2px solid #28a745;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  img {
    height: 75px;
    margin: 10px;
  }

  a {
    font-family: 'Merriweather Sans';
    text-decoration: none;
    color: black;
  }

  a:hover {
    text-decoration: wavy;
    color: black;
  }

  @media (max-width: 800px) {
    text-align: center;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1 {
      width: 100%;
    }
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
            <img src={tmplo} />
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
