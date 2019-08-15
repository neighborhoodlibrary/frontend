import React, { useContext } from "react";
import { Route } from "react-router-dom";
import UserContext from "../context/user/userContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const userContext = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={props => {
        if (userContext.userState.loggedIn) {
          return <Component {...props} />;
        }
      }}
    />
  );
};

export default PrivateRoute;
