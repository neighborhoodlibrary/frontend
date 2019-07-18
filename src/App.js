import React from "react";
import "./App.css";
import Landing from "./views/Landing";
import UserState from "./context/user/UserState";
import BookState from "./context/book/BookState";
import Header from './components/Header/Header';

import { Route, BrowserRouter as Router } from 'react-router-dom';

import PrivateRoute from './authentication/PrivateRoute';

import Borrowed from './components/Shelf/Borrowed';
import Loaned from './components/Shelf/Loaned';
import Library from './components/Shelf/Library';
import MyShelf from "./views/MyShelf/MyShelf";

import styled from 'styled-components';

const LowerSection = styled.div`
  padding: 0px 10px;
`;

function App() {

  const userKey = Object.keys(window.localStorage)
  .filter(it => it.startsWith('firebase:authUser'))[0];

  console.log(userKey)

  return (
    <div className="App">
      <UserState>
        <BookState>
          <Router>
              <Route path="/" component={Header} />
              <LowerSection>
                <Route exact path="/" component={Landing} />
                <PrivateRoute exact path='/shelf' component={MyShelf} />
                <PrivateRoute exact path='/shelf/borrowed' component={Borrowed} />
                <PrivateRoute exact path='/shelf/loaned' component={Loaned} />
                <PrivateRoute exact path='/shelf/library' component={Library} />
              </LowerSection>
          </Router> 
        </BookState>
      </UserState>
    </div>
  );
}

export default App;
