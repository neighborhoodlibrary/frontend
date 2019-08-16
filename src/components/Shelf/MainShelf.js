import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../context/user/userContext";
import { Jumbotron } from "reactstrap";
import styled from 'styled-components';

const IntroNew = styled.div`
  height: 250px;
  width: 100%;
  border-radius: 2px;
  background-color: rgba(0,0,0,.08);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    font-size: 1.3em;
    font-family: 'Merriweather Sans';
  }

  h3 {
    font-size: 0.8em;
    font-color: rgba(0,0,0,.9);
  }

  @media(max-width: 600px) {

  }
`

export default function MainShelf() {
  const userContext = useContext(UserContext);
  const [user, setUser] = useState({});

  const getUser = () => {
    setUser(userContext.getUser());
  };
  useEffect(() => {
    getUser();
  }, {});

  return (
    <div>
      <IntroNew>
        <h2>
          Hello {user.displayName}! Welcome to your shelf.
        </h2>
        <h3>Use the tabs above to navigate</h3>
      </IntroNew>
    </div>
  );
}
