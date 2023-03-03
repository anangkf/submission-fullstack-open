/* eslint-disable import/no-extraneous-dependencies */
import { combineReducers } from '@reduxjs/toolkit'
import anecdotes from './anecdoteSlice'
import filter from './filterSlice'

const rootReducer = combineReducers({
  anecdotes,
  filter,
})

export default rootReducer
