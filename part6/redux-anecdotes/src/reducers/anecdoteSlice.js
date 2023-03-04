/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import anecdoteServices from '../services/anecdote.service'

export const initializeAnecdotes = createAsyncThunk('fetch/anecdotes', async () => {
  try {
    const res = await anecdoteServices.getAll()
    return res.data
  } catch (error) {
    throw new Error(error.message)
  }
})

export const addAnecdote = createAsyncThunk('create/anecdote', async (payload) => {
  try {
    const res = await anecdoteServices.create(payload)
    return res.data
  } catch (error) {
    throw new Error(error.message)
  }
})

export const upvote = createAsyncThunk('vote/anecdote', async (anecdote) => {
  try {
    const res = await anecdoteServices.vote(anecdote)
    return res.data
  } catch (error) {
    throw new Error(error.message)
  }
})

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  extraReducers(builder) {
    builder
      .addCase(initializeAnecdotes.fulfilled, (state, action) => state = action.payload)
      .addCase(addAnecdote.fulfilled, (state, action) => { state.push(action.payload) })
      .addCase(upvote.fulfilled, (state, action) => {
        const { payload: edited } = action
        return state.map((anecdote) => {
          if (anecdote.id === edited.id) {
            return edited
          } return anecdote
        })
      })
  },
})

export default anecdoteSlice.reducer
