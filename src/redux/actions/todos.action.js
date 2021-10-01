import { todoConstant } from '../constants'
import axiosInstance from '../../helpers/axios'

export const getAllTodoList = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: todoConstant.GET_ALL_TODO_REQUEST })
            const res = await axiosInstance.get('/todo')
            if (res.status === 200) {
                const { response } = res.data.response
                dispatch({
                    type: todoConstant.GET_ALL_TODO_SUCCESS,
                    payload: response
                })
            }
        } catch (e) {
            dispatch({ type: todoConstant.GET_ALL_TODO_FAILURE })
        }
    }
}

export const addNewTodo = (data) => {
    return async (dispatch) => {
        try {
            const res = await axiosInstance.post('todo/create', data)
        } catch (e) { }
    }
}

export const deleteTodo = (id) => {
    return async (dispatch) => {
        try {
            const res = await axiosInstance.delete(`/todo/${id}`)
            console.log({ res })
        } catch (e) { }
    }
}

export const updateTodo = (id, data) => {
    return async (dispatch) => {
        try {
            const res = await axiosInstance.put(`/todo/${id}`, data)
            console.log({ res })
        } catch (e) { console.log({ e }) }
    }
}