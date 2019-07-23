import { GET_ERRORS } from "../types";

export default (state, action) => {
    switch(action.type) {
        case GET_ERRORS:
            return {
                message: action.payload.message,
                status: action.payload
            }
        default:
            return state
    }
}