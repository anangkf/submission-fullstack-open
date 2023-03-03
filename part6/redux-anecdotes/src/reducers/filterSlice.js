/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-return-assign */
import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filterChange: (state, action) => state = action.payload.toLowerCase(),
  },
})

export const { filterChange } = filterSlice.actions

export default filterSlice.reducer
