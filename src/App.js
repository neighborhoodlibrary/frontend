import React from "react";
import "./App.css";
import Auth from "./authentication/Auth";
import MainContainer from "./views/MainContainer";
import Landing from "./views/Landing";

const AuthComponent = Auth(MainContainer)(Landing);

function App() {
  return (
    <div className="App">
      <AuthComponent />
    </div>
  );
}

export default App;
