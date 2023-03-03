import { combineReducers } from 'redux'
import anecdotes from './anecdoteReducer'
import filter from './filterReducer'

const rootReducer = combineReducers({
  anecdotes,
  filter,
})

export default rootReducer
