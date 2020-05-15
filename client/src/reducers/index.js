import { combineReducers } from 'redux'
import user from './UserReducer';
import chargers from './ChargesReducer'
export default combineReducers({
    user,
    chargers
})