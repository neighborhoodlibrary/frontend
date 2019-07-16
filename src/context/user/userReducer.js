import { ADD_USER, GET_USER } from '../types'

export default (state, action) => {
    switch(action.type) {
        case ADD_USER:
            return {
                ...state,
                user: action.payload,
                loggedIn: true
            }
        default:
            return state
    }
}