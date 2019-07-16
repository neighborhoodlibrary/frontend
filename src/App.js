import React from "react";
import "./App.css";
import Auth from "./authentication/Auth";
import MainContainer from "./views/MainContainer";
import Landing from "./views/Landing";
import UserState from "./context/user/UserState";
import BookState from "./context/book/BookState";
import { Route, BrowserRouter as Router } from 'react-router-dom';
import MainShelf from './components/Shelf/MainShelf';
import Borrowed from './components/Shelf/Borrowed';
import Loaned from './components/Shelf/Loaned';
import Library from './components/Shelf/Library';

const AuthComponent = Auth(MainContainer)(Landing);

function App() {
  return (
    <div className="App">
      <UserState>
        <BookState>
          <Router>
              <Route exact path='/' component={Landing} />
              <Route exact path='/shelf' component={MainShelf} />
              <Route exact path='/shelf/borrowed' component={Borrowed} />
              <Route exact path='/shelf/loaned' component={Loaned} />
              <Route exact path='/shelf/library' component={Library} />
          </Router>
        </BookState>
      </UserState>
    </div>
  );
}

export default App;
