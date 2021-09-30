import { userConstant } from '../constants'

const initialState = {
    token: null,
    user: {},
    authenticate: false,
    authenticating: false,
}

export default (state=initialState, action) => {
    switch(action.type){
        case userConstant.LOGIN_REQUEST:
            state = {
                ...state,
                authenticating: true
            }
            break;
        case userConstant.LOGIN_SUCCESS:
            state = {
                ...state,
                authenticating: false,
                authenticate: true,
                token: action.payload.token,
                user: action.payload.user
            }
            break;
        case userConstant.LOGIN_FAILURE:
            state = {
                ...state,
                authenticating: false
            }
            break;
    }
    return state;
}