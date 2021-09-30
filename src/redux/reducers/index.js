import { combineReducers } from 'redux'
import userReducer from './user.reducer'

const rootReducer = combineReducers({
    userDetails: userReducer,
})

export default rootReducer