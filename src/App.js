// app=> header (render navmenu only if loggedIn)()=> if(loggedIn)=> shelf
// else (!loggedIn)=> landing(signInComponent)
import React from "react";
import Header from "./header/Header";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import PrivateRoute from "./authentication/PrivateRoute";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
// global state components
import UserState from "./context/user/UserState";
import BookState from "./context/book/BookState";
// when user is not logged in...
import Landing from "./landing/Landing";
// shelf components
// import MyShelf from "./views/MyShelf/MyShelf";
import MainShelf from "./components/Shelf/MainShelf";
import Library from "./components/Shelf/Library";
import Loaned from "./components/Shelf/Loaned";
import Borrowed from "./components/Shelf/Borrowed";
import BookDetails from "./components/Shelf/BookDetails";
// search components
// add a book to personal library
import AddBook from "./components/AddBook/AddBook";
// look to borrow a book from another personal library
import Search from "./components/Search/Search";
// transactional components
import Requested from "./components/Tranactions/Requested";
import Receiving from "./components/Tranactions/Receiving";
// setting components
import MapComponent from "./components/Map/MapComponent";
import Profile from "./components/Profile/Profile";
// styling components
import styled from "styled-components";

const LoggedInDiv = styled.div`
  margin: auto;
  width: 86%;

  @medix (max-width: 800px) {
    width: 100%;
  }
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
              <Route path="/" component={Header} />
              <Route exact path="/landing" component={Landing} />
              <LoggedInDiv>
                <Switch>
                  {/* shelf components */}
                  <PrivateRoute exact path="/" component={MainShelf} />
                  <PrivateRoute
                    exact
                    path="/shelf/library"
                    component={Library}
                  />
                  <PrivateRoute exact path="/shelf/loaned" component={Loaned} />
                  <PrivateRoute
                    exact
                    path="/shelf/borrowed"
                    component={Borrowed}
                  />
                  <PrivateRoute
                    exact
                    path="/shelf/book/:id"
                    component={BookDetails}
                  />
                  {/* Lookup components */}
                  <PrivateRoute exact path="/shelf/add" component={AddBook} />
                  <PrivateRoute exact path="/shelf/search" component={Search} />
                  {/* transactional components */}
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
                  {/* settings components */}
                  <PrivateRoute
                    exact
                    path="/shelf/map"
                    component={MapComponent}
                  />
                  <PrivateRoute
                    exact
                    path="/shelf/profile"
                    component={Profile}
                  />
                </Switch>
              </LoggedInDiv>
            </Router>
          </AlertProvider>
        </BookState>
      </UserState>
    </div>
  );
}

export default App;
