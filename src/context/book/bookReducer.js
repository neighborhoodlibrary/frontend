import { GET_BOOK, SET_BOOK } from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_BOOK:
      return {
        ...state
      };
    case SET_BOOK:
      return {
        ...state,
        book: action.payload
      };
    default:
      return state;
  }
};
