import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavMenuDiv = styled.div`
  display: flex
  flex-direction: column
  justify-content: center;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  font-size: 0.95em;

  a:active, a:focus {
    outline: 0;
    border: none;
    -moz-outline-style: none;
  }
  
  button:active, button:focus {
    outline: 0;
    border: none;
    -moz-outline-style: none;
  }

  @media(max-width: 800px) {
    display: block;
    padding: 3px;
    width: 100vw;
    justify-content: center;
    align-items: center;
  }
`;

const NavTabs = styled.div`
  font-family: "Merriweather Sans", sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
`;

const TabTop = styled.div`
  padding: 5px 10px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;

  #topTabS {
    font-weight: bold;
    border-bottom: 3px solid rgb(127, 173, 80);
    color: black;
  }

  button {
    font-size: 1em;
    padding: 1px 2px;
    border: none;
    background-color: transparent;
    margin: 0px 7px;

    &:hover {
      -webkit-animation: slide-bck-center 0.45s
        cubic-bezier(0.47, 0, 0.745, 0.715) both;
      animation: slide-bck-center 0.45s cubic-bezier(0.47, 0, 0.745, 0.715) both;
    }
  }

  /* ----------------------------------------------
  * Generated by Animista on 2019-8-17 0:6:16
  * w: http://animista.net, t: @cssanimista
  * ---------------------------------------------- */

  /**
  * ----------------------------------------
  * animation slide-bck-center
  * ----------------------------------------
  */
  @-webkit-keyframes slide-bck-center {
    0% {
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
    }
    100% {
      -webkit-transform: translateZ(-400px);
      transform: translateZ(-400px);
    }
  }
  @keyframes slide-bck-center {
    0% {
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
    }
    100% {
      -webkit-transform: translateZ(-400px);
      transform: translateZ(-400px);
    }
  }
`;

const TabBottom = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 0.91em;
  box-sizing: border-box;

  a {
    padding: 3px 6px;
    border: none;
    border-radius: 3px;
    margin: 0px 1px;

    &:hover {
    }
  }

  button {
    padding: 3px 6px;
    border: none;
    border-radius: 3px;
    margin: 0px 1px;
  }

  @media(max-width: 800px){
    justify-content: flex-start
  }
`;

const NavMenu = props => {
  const [topTab, setTopTab] = useState({
    currentTab: "shelf"
  });

  function switchTab(tabString) {
    setTopTab({
      currentTab: tabString
    });
  }

  if (topTab.currentTab === "shelf") {
    return (
      <NavMenuDiv>
        <NavTabs>
          <TabTop>
            <button id="topTabS" onClick={() => switchTab("shelf")}>
              Shelf
            </button>
            <button id="topTab" onClick={() => switchTab("lookup")}>
              Lookup
            </button>
            <button id="topTab" onClick={() => switchTab("transactions")}>
              Transactions
            </button>
            <button id="topTab" onClick={() => switchTab("settings")}>
              Settings
            </button>
          </TabTop>
          <TabBottom>
            <NavLink to="/">Main</NavLink>
            <NavLink to="/shelf/library">Library</NavLink>
            <NavLink to="/shelf/loaned">Loaned</NavLink>
            <NavLink to="/shelf/borrowed">Borrowed</NavLink>
          </TabBottom>
        </NavTabs>
      </NavMenuDiv>
    );
  } else if (topTab.currentTab === "lookup") {
    return (
      <NavMenuDiv>
        <NavTabs>
          <TabTop>
            <button id="topTab" onClick={() => switchTab("shelf")}>
              Shelf
            </button>
            <button id="topTabS" onClick={() => switchTab("lookup")}>
              Lookup
            </button>
            <button id="topTab" onClick={() => switchTab("transactions")}>
              Transactions
            </button>
            <button id="topTab" onClick={() => switchTab("settings")}>
              Settings
            </button>
          </TabTop>
          <TabBottom>
            <NavLink to="/lookup/add">Add</NavLink>
            <NavLink to="/lookup/search">Search</NavLink>
          </TabBottom>
        </NavTabs>
      </NavMenuDiv>
    );
  } else if (topTab.currentTab === "transactions") {
    return (
      <NavMenuDiv>
        <NavTabs>
          <TabTop>
            <button id="topTab" onClick={() => switchTab("shelf")}>
              Shelf
            </button>
            <button id="topTab" onClick={() => switchTab("lookup")}>
              Lookup
            </button>
            <button id="topTabS" onClick={() => switchTab("transactions")}>
              Transactions
            </button>
            <button id="topTab" onClick={() => switchTab("settings")}>
              Settings
            </button>
          </TabTop>
          <TabBottom>
            <NavLink to="/transactions/requested">Requested</NavLink>
            <NavLink to="/transactions/receiving">Receiving</NavLink>
          </TabBottom>
        </NavTabs>
      </NavMenuDiv>
    );
  } else {
    return (
      <NavMenuDiv>
        <NavTabs>
          <TabTop>
            <button id="topTab" onClick={() => switchTab("shelf")}>
              Shelf
            </button>
            <button id="topTab" onClick={() => switchTab("lookup")}>
              Lookup
            </button>
            <button id="topTab" onClick={() => switchTab("transactions")}>
              Transactions
            </button>
            <button id="topTabS" onClick={() => switchTab("settings")}>
              Settings
            </button>
          </TabTop>
          <TabBottom>
            <NavLink to="/settings/profile">Profile</NavLink>
            <NavLink to="/settings/map">Map</NavLink>
            <button onClick={props.signOut}>Sign Out</button>
          </TabBottom>
        </NavTabs>
      </NavMenuDiv>
    );
  }
};

export default NavMenu;
