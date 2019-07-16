import UserContext from './userContext'
import React, { useReducer } from 'react'
import UserReducer from './userReducer'
import { GET_USER } from '../types'

const UserState = props => {
    const initialState = {
        email: '',
        displayName: '',
        uid: '',
        location: '',
        books: [],
        borrowed: [],
        loaned: [],
        loggedIn: false
    }

    const [state, dispatch] = useReducer(UserReducer, initialState)

    const getUser = () => {

    }
    
    return (
        <UserContext.Provider 
        value={{
            user: state,
            getUser
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;