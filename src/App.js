import React from "react";
import "./App.css";
import Landing from "./views/Landing";
import UserState from "./context/user/UserState";
import BookState from "./context/book/BookState";
import Header from "./components/Header/Header";

import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import PrivateRoute from "./authentication/PrivateRoute";

import Borrowed from "./components/Shelf/Borrowed";
import Loaned from "./components/Shelf/Loaned";
import Library from "./components/Shelf/Library";
import MyShelf from "./views/MyShelf/MyShelf";

import styled from "styled-components";
import AddBook from "./components/AddBook/AddBook";
import MapComponent from "./components/Map/MapComponent";
import Search from "./components/Search/Search";
//
import BookDetails from "./components/Shelf/BookDetails";
//
import Email from "./components/Email/Email";
import Requested from "./components/Tranactions/Requested";
import Receiving from "./components/Tranactions/Receiving";
import neighborImg from "./assets/neighborpic2.jpg";

const LandingImg = styled.div`
    background: url(${neighborImg});
    background: -moz-linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 59%, rgba(0, 0, 0, 0.65) 100%), url(${neighborImg}) no-repeat;
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, rgba(0, 0, 0, 0)), color-stop(59%, rgba(0, 0, 0, 0)), color-stop(100%, rgba(0, 0, 0, 0.65))), url(${neighborImg}) no-repeat;
    background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 59%, rgba(0, 0, 0, 0.65) 100%), url(${neighborImg}) no-repeat;
    background: -o-linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 59%, rgba(0, 0, 0, 0.65) 100%), url(${neighborImg}) no-repeat;
    background: -ms-linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 59%, rgba(0, 0, 0, 0.65) 100%), url(${neighborImg}) no-repeat;
    background: linear-gradient(to top,  rgba(0, 0, 0, 0) 52%, rgba(0, 0, 0, 0) 48%, rgba(0, 0, 0, 0.65) 85%), url(${neighborImg}) no-repeat;
    background-size: cover;
    background-position: bottom;
    height: 100VH;
`

const LowerSection = styled.div`
  padding: 0px 20px;
`;

const alertOptions = {
  timeout: 3000,
  position: "bottom center"
};

function App() {
  return (
    <div className="App">
      <UserState>
        <BookState>
          <AlertProvider template={AlertTemplate} {...alertOptions}>
            <Router>
              <LandingImg>
              <Route path="/" component={Header} />
              <LowerSection>
                <Switch>
                  <PrivateRoute exact path="/shelf" component={MyShelf} />
                  <PrivateRoute
                    exact
                    path="/shelf/borrowed"
                    component={Borrowed}
                  />
                  <PrivateRoute exact path="/shelf/loaned" component={Loaned} />
                  <PrivateRoute
                    exact
                    path="/shelf/library"
                    component={Library}
                  />
                  <PrivateRoute exact path="/shelf/add" component={AddBook} />
                  <PrivateRoute
                    exact
                    path="/shelf/map"
                    component={MapComponent}
                  />
                  <PrivateRoute exact path="/shelf/search" component={Search} />
                  <PrivateRoute
                    exact
                    path="/shelf/book/:id"
                    component={BookDetails}
                  />
                  <PrivateRoute
                    exact
                    path="/shelf/requested"
                    component={Requested}
                  />
                  <PrivateRoute
                    exact
                    path="/shelf/receiving"
                    component={Receiving}
                  />
                  <PrivateRoute exact path="/shelf/email" component={Email} />
                  <Route exact path="/" component={Landing} />
                </Switch>
              </LowerSection>
              </LandingImg>
            </Router>
          </AlertProvider>
        </BookState>
      </UserState>
    </div>
  );
}

export default App;
