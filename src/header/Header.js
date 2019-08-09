import React, { useContext, useState, useEffect } from "react";
import NavMenu from "./NavMenu";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import SignInComponent from "./SignInComponent";
import UserContext from "../context/user/userContext";
import firebase from "../firebase/firebase.utils";
import "firebase/auth";

import neiImg from "../assets/neighborpic2.jpg";


const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 25px 17px;
  margin: 0px 0px 20px 0px;
  border-bottom: 1px solid rgb(10,10,10,.5);
  -webkit-box-shadow: 1px 1px 3px 0px rgba(30, 30, 30, 0.73);
  -moz-box-shadow:    1px 1px 3px 0px rgba(30, 30, 30, 0.73);
  box-shadow:         1px 1px 3px 0px rgba(30, 30, 30, 0.73);

  h1 {
    font-size: 3.25em;
    font-family: "Merriweather", serif;
  }

  @media (max-width: 800px) {
    flex-direction: column;
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

const LOHeadDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url(${neiImg});
  background-size: cover;
  background-position: center top;
`;

const ClarityDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 0px;
  background-color: rgb(0,0,0,0.5);
  width: 100vw;
  padding: 20px 0px;
  -webkit-box-shadow: 2px 2px 5px 0px rgba(50, 50, 50, 0.75);
  -moz-box-shadow:    2px 2px 5px 0px rgba(50, 50, 50, 0.75);
  box-shadow:         2px 2px 5px 0px rgba(50, 50, 50, 0.75);

  h1 {
    font-size: 4em;
    font-family: "Merriweather", serif;
    color: white;
  }

  h2 {
    color: white;
    font-size: 1.75em;
  }

  }
  
  @media (max-width: 800px) {
    h1 {
      font-size: 3em;
    }
  
    h2 {
      color: white;
      font-size: 1.25em;
    }
  }

  @media (max-width: 500px) {
    h1 {
      font-size: 2.5em;
    }
  
    h2 {
      color: white;
      font-size: 1em;
    }
  }
`;

const LOButtonHold = styled.div`
  padding: 40px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
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

  if(!userContext.userState.loggedIn){
    return (
      <LOHeadDiv>
        <ClarityDiv>
          <h1>Neighborhood Library</h1>
          <h2>Find local books</h2>
        </ClarityDiv>
        <LOButtonHold>
          <SignInComponent signOut={signOut} />
        </LOButtonHold>
      </LOHeadDiv>
    )
  } else {
  return (
    <HeaderDiv>
      <NavLink to="/shelf"><h1>Neighborhood Library</h1></NavLink>
      <SideBar>
        {loggedIn === true ? <NavMenu /> : ""}
        <SignInComponent signOut={signOut} />
      </SideBar>
    </HeaderDiv>
  );
  }
}
