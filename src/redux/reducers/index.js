import { combineReducers } from 'redux'
import userReducer from './user.reducer'
import todosReducer from './todos.reducer'

const rootReducer = combineReducers({
    userDetails: userReducer,
    todoDetails: todosReducer,
})

export default rootReducer