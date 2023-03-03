/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  visibility: false,
  message: '',
}

const notifSlice = createSlice({
  name: 'notif',
  initialState,
  reducers: {
    pushNotif: (state, action) => state = {
      visibility: true,
      message: action.payload,
    },
    removeNotif: (state) => state = {
      visibility: false,
      message: '',
    },
  },
})

export const { pushNotif, removeNotif } = notifSlice.actions

export default notifSlice.reducer
