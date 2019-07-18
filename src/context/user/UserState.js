import UserContext from "./userContext";
import React, { useReducer } from "react";
import UserReducer from "./userReducer";
import { GET_USER, ADD_USER, SET_LOGIN } from "../types";

const UserState = props => {
  const initialState = {
    user: {},
    loggedIn: false
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  const addUser = user => {
    dispatch({
      type: ADD_USER,
      payload: user
    });
  };

  const setLogin = login => {
    dispatch({
      type: SET_LOGIN,
      payload: login
    });
  };

  return (
    <UserContext.Provider
      value={{
        userState: state,
        addUser,
        setLogin
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
