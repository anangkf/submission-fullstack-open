import { combineReducers } from "redux";
import notif from './notifSlice'
import blog from './blogSlice'

const rootReducer = combineReducers({
  notif,
  blog
})

export default rootReducer