import { resetConstant, userConstant } from '../constants'

const initialState = {
    message: '',
    token: null,
    user: {},
    authenticate: false,
    authenticating: false,
}

export default (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case userConstant.LOGIN_REQUEST:
            state = {
                ...state,
                message: '',
                authenticating: true,
            }
            break;
        case userConstant.LOGIN_SUCCESS:
            state = {
                ...state,
                message: '',
                authenticating: false,
                authenticate: true,
                token: action.payload.token,
                user: action.payload.user,
            }
            break;
        case userConstant.LOGIN_FAILURE:
            state = {
                ...state,
                authenticating: false,
                message: action.payload.message,
            }
            break;
        case userConstant.SIGNUP_REQUEST:
            state = {
                ...state,
                message: ''
            }
            break;
        case userConstant.SIGNUP_SUCCESS:
            state = {
                ...state,
                message: 'Signup successfull go to login page'
            }
            break;
        case userConstant.SIGNUP_FAILURE:
            state = {
                ...state,
                message: 'Something went wrong, try again later'
            }
            break;
        case userConstant.LOGOUT_SUCCESS:
            state = { ...initialState }
            break;
        case resetConstant.RESET_USER:
            state = { ...initialState }
            break;
    }
    return state;
}