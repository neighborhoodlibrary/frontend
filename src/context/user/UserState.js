import UserContext from './userContext'
import React, { useReducer } from 'react'
import UserReducer from './userReducer'
import { GET_USER, ADD_USER } from '../types'

const UserState = props => {
    const initialState = {
        user: {},
        loggedIn: false
    }

    const [state, dispatch] = useReducer(UserReducer, initialState)

    const addUser = user => {
        dispatch({
            type: ADD_USER,
            payload: user
        })
    }
    
    return (
        <UserContext.Provider 
        value={{
            userState: state,
            addUser
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;