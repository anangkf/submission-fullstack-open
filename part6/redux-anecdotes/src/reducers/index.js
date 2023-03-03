/* eslint-disable import/no-extraneous-dependencies */
import { combineReducers } from '@reduxjs/toolkit'
import anecdotes from './anecdoteSlice'
import filter from './filterSlice'
import notif from './notifSlice'

const rootReducer = combineReducers({
  anecdotes,
  filter,
  notif,
})

export default rootReducer
