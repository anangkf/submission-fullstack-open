import { combineReducers } from "redux";
import notif from './notifSlice'
import blog from './blogSlice'
import auth from './authSlice'

const rootReducer = combineReducers({
  notif,
  blog,
  auth
})

export default rootReducer