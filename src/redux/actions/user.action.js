import axiosInstance from '../../helpers/axios'
import { resetConstant, userConstant } from '../constants'

export const signup = (user) => {
    return async (dispatch) => {
        try {
            dispatch({ type: userConstant.SIGNUP_REQUEST })
            const res = await axiosInstance.post('/signup', user)
            if (res.status == 200) {
                dispatch({ type: userConstant.SIGNUP_SUCCESS })
            }
        } catch (e) {
            dispatch({ type: userConstant.SIGNUP_FAILURE })
        }
    }
}

export const signin = (user) => {
    return async (dispatch) => {
        try {
            dispatch({ type: userConstant.LOGIN_REQUEST })
            const res = await axiosInstance.post('/login', user)
            if (res.status == 200) {
                const { token, userDetails } = res.data.response
                console.log(res.data.response)
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(userDetails))
                dispatch({
                    type: userConstant.LOGIN_SUCCESS,
                    payload: { token, user: userDetails }
                })
            }
        } catch (e) {
            if (e.response) {
                const { error } = e.response.data
                dispatch({
                    type: userConstant.LOGIN_FAILURE,
                    payload: { message: error.message }
                })
            }
        }
    }
}

export const signout = () => {
    return (dispatch) => {
        localStorage.clear()
        dispatch({ type: userConstant.LOGOUT_SUCCESS })
    }
}

export const isUserLoggedIn = () => {
    return (dispatch) => {
        const token = localStorage.getItem('token')
        if (token) {
            const user = JSON.parse(localStorage.getItem('user'))
            dispatch({
                type: userConstant.LOGIN_SUCCESS,
                payload: { token, user }
            })
        }
    }
}

export const resetUser = () => {
    return (dispatch) => {
        dispatch({ type: resetConstant.RESET_USER })
    }
}