import React from "react";
import "./App.css";
import Auth from "./authentication/Auth";
import MainContainer from "./views/MainContainer";
import Landing from "./views/Landing";
import UserState from "./context/user/UserState";
import BookState from "./context/book/BookState";
import Header from './components/Header/Header';
import MainShelf from './components/Shelf/MainShelf';

import { Route, Redirect, BrowserRouter as Router } from 'react-router-dom';

import PrivateRoute from './authentication/PrivateRoute';

import Borrowed from './components/Shelf/Borrowed';
import Loaned from './components/Shelf/Loaned';
import Library from './components/Shelf/Library';

const AuthComponent = Auth(MainContainer)(Landing);

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
              <Route exact path="/" component={Landing} />
              <PrivateRoute exact path='/shelf' component={MainShelf} />
              <PrivateRoute exact path='/shelf/borrowed' component={Borrowed} />
              <PrivateRoute exact path='/shelf/loaned' component={Loaned} />
              <PrivateRoute exact path='/shelf/library' component={Library} />
          </Router> 
        </BookState>
      </UserState>
    </div>
  );
}

export default App;
