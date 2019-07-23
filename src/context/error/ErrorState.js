import ErrorContext from './errorContext'
import React, { useReducer } from "react";
import ErrorReducer from './errorReducer'
import { GET_ERRORS } from '../types'

const ErrorState = props => {
    const initialState = {
        message: null,
        status: null
    }

    const [state, dispatch] = useReducer(ErrorReducer, initialState);

    return (
        <ErrorContext.Provider
          value={{
            errorState: state
          }}
        >
          {props.children}
        </ErrorContext.Provider>
      );
};
export default ErrorState;