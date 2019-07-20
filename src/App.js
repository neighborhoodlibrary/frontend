import React from "react";
import "./App.css";
import Landing from "./views/Landing";
import UserState from "./context/user/UserState";
import BookState from "./context/book/BookState";
import Header from "./components/Header/Header";

import { Route, BrowserRouter as Router } from "react-router-dom";

import PrivateRoute from "./authentication/PrivateRoute";

import Borrowed from "./components/Shelf/Borrowed";
import Loaned from "./components/Shelf/Loaned";
import Library from "./components/Shelf/Library";
import MyShelf from "./views/MyShelf/MyShelf";

import styled from "styled-components";
import AddBook from "./components/AddBook/AddBook";
//
import BookDetails from "./components/Shelf/BookDetails";

const LowerSection = styled.div`
  padding: 0px 10px;
`;

function App() {
  return (
    <div className="App">
      <UserState>
        <BookState>
          <Router>
            <Route path="/" component={Header} />
            <LowerSection>
              <Route exact path="/" component={Landing} />
              <PrivateRoute exact path="/shelf" component={MyShelf} />
              <PrivateRoute exact path="/shelf/borrowed" component={Borrowed} />
              <PrivateRoute exact path="/shelf/loaned" component={Loaned} />
              <PrivateRoute exact path="/shelf/library" component={Library} />
              <PrivateRoute exact path="/shelf/add" component={AddBook} />
              <PrivateRoute
                exact
                path="/shelf/book/:id"
                component={BookDetails}
              />
            </LowerSection>
          </Router>
        </BookState>
      </UserState>
    </div>
  );
}

export default App;
