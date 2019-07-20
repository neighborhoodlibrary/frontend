import BookContext from "./bookContext";
import React, { useReducer } from "react";
import BookReducer from "./bookReducer";
import { GET_BOOK, SET_BOOK } from "../types";

const BookState = props => {
  const initialState = {
    book: {}
  };

  const [state, dispatch] = useReducer(BookReducer, initialState);

  const getBook = () => {
    return state.book;
  };

  const setBook = book => {
    dispatch({
      type: SET_BOOK,
      payload: book
    });
  };

  return (
    <BookContext.Provider
      value={{
        bookState: state,
        setBook,
        getBook
      }}
    >
      {props.children}
    </BookContext.Provider>
  );
};

export default BookState;
