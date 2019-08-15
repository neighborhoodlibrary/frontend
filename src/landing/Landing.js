import React from "react";
import SignInComponent from "./SignInComponent";
import styled from "styled-components";
import neiImg from "../assets/neighborpic2.jpg";

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
    color: rgba(250,250,250,.95);
  }

  h2 {
    color: rgba(250,250,250,.9);
    font-family: "Merriweather", serif;
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

const Landing = props => {
  return (
    <LOHeadDiv>
      <ClarityDiv>
        <h1>Neighborhood Library</h1>
        <h2>Read great books in your area</h2>
      </ClarityDiv>
      <LOButtonHold>
        <SignInComponent routerProps={props} />
      </LOButtonHold>
    </LOHeadDiv>
  );
};

export default Landing;
