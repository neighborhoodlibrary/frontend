import { ADD_USER, GET_USER, SET_LOGIN } from "../types";

export default (state, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        user: action.payload,
        loggedIn: true
      };

    case SET_LOGIN:
      return {
        ...state,
        loggedIn: action.payload
      };
    default:
      return state;
  }
};
