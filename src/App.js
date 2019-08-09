// app=> header(navMenu/signInComponent) && landing && privateRoute if(loggedIn)=> shelf
import React from "react";
import Header from "./header/Header";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import PrivateRoute from "./authentication/PrivateRoute";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
// gloabal state components
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
// background image
import neighborImg from "./assets/neighborpic2.jpg";

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
              <Route path="/" component={Header} />
              <LowerSection>
                <Switch>
                  {/* shelf components */}
                  <PrivateRoute exact path="/shelf" component={MainShelf} />
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
                  {/* Lookup componets */}
                  <PrivateRoute exact path="/shelf/add" component={AddBook} />
                  <PrivateRoute exact path="/shelf/search" component={Search} />
                  {/* transcational compoents */}
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
                  {/* Landing or user not logged in */}
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
