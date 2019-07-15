import BookContext from "./bookContext";
import React, { useReducer } from "react";
import BookReducer from "./bookReducer";
import { GET_BOOKS } from "../types";

const BookState = props => {
  const initialState = {
    books: []
  };

  const [state, dispatch] = useReducer(BookReducer, initialState);

  const getBooks = () => {};

  return (
    <BookContext.Provider
      value={{
        books: state,
        getBooks
      }}
    >
      {props.children}
    </BookContext.Provider>
  );
};

export default BookState;
