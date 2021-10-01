import { todoConstant } from '../constants'

const initialState = {
    todoList: [],
    loading: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case todoConstant.GET_ALL_TODO_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case todoConstant.GET_ALL_TODO_SUCCESS:
            state = {
                ...state,
                loading: false,
                todoList: action.payload
            }
            break;
        case todoConstant.GET_ALL_TODO_FAILURE:
            state = {
                ...state,
                loading: false,
            }
            break;
    }
    return state;
}