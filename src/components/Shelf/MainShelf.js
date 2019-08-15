import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../context/user/userContext";
import { Jumbotron } from "reactstrap";

export default function MainShelf() {
  const userContext = useContext(UserContext);
  const [user, setUser] = useState({});

  const getUser = () => {
    setUser(userContext.getUser());
  };
  useEffect(() => {
    getUser();
  }, {});

  return (
    <div>
      <Jumbotron>
        <h1 className="display-3">Hello, {user.displayName}!</h1>
        <p className="lead">Welcome to your personal shelf</p>
        <hr className="my-2" />
        <p>
          Thanks for visiting. Use the upper navigation to add books to your
          library to share, or lookup local neighbors to borrow books from!{" "}
        </p>
      </Jumbotron>
    </div>
  );
}
