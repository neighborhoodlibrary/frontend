import React from "react";
import "./App.css";
import Landing from "./views/Landing";
import UserState from "./context/user/UserState";
import BookState from "./context/book/BookState";
import Header from "./components/Header/Header";

import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

import PrivateRoute from "./authentication/PrivateRoute";

import Borrowed from "./components/Shelf/Borrowed";
import Loaned from "./components/Shelf/Loaned";
import Library from "./components/Shelf/Library";
import MyShelf from "./views/MyShelf/MyShelf";

import styled from "styled-components";
import AddBook from "./components/AddBook/AddBook";
import Search from "./components/Search/Search";
//
import BookDetails from "./components/Shelf/BookDetails";

const LowerSection = styled.div`
  padding: 0px 20px;
`;

const alertOptions = {
  timeout: 3000,
  position: 'bottom center'
}

function App() {
  return (
    <div className="App">
      <UserState>
        <BookState>
          <AlertProvider template={AlertTemplate} {...alertOptions}>
            <Router>
              <Route path="/" component={Header} />
              <LowerSection>
                <Switch>
                  <PrivateRoute exact path="/shelf" component={MyShelf} />
                  <PrivateRoute exact path="/shelf/borrowed" component={Borrowed} />
                  <PrivateRoute exact path="/shelf/loaned" component={Loaned} />
                  <PrivateRoute exact path="/shelf/library" component={Library} />
                  <PrivateRoute exact path="/shelf/add" component={AddBook} />
                  <PrivateRoute exact path="/shelf/search" component={Search} />
                  <PrivateRoute
                    exact
                    path="/shelf/book/:id"
                    component={BookDetails}
                  />
                  <Route exact path="/" component={Landing} />
                </Switch>
              </LowerSection>
            </Router>
          </AlertProvider>
        </BookState>
      </UserState>
    </div>
  );
}

export default App;
