import React from "react";
import "./App.css";
import Auth from "./authentication/Auth";
import MainContainer from "./views/MainContainer";
import Landing from "./views/Landing";
import UserState from './context/user/UserState'

const AuthComponent = Auth(MainContainer)(Landing);

function App() {
  return (
    <div className="App">
      <UserState>
        <AuthComponent />
      </UserState>
    </div>
  );
}

export default App;
