import React, { useContext } from "react";
import UserContext from "../../context/user/userContext";
import { Jumbotron } from 'reactstrap';

export default function MainShelf() {
  const userContext = useContext(UserContext);

  console.log(userContext.userState.user)

  return (
    <div>
      <Jumbotron>
        <h1 className="display-3">Hello, {userContext.userState.user.displayName}!</h1>
        <p className="lead">Welcome to your personal shelf</p>
        <hr className="my-2" />
        <p>More to come...</p>
      </Jumbotron>
    </div>
  )
}

