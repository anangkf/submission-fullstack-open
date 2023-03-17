import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  type: '',
  message: ''
}

const notifSlice = createSlice({
  name: 'notif',
  initialState,
  reducers: {
    pushNotif: (state, action) => {
      const {type, message} = action.payload
      return state = {
        type,
        message
      }
    },
    removeNotif: (state) => {
      return state = {
        type: '',
        message: ''
      }
    }
  }
})

const {pushNotif, removeNotif} = notifSlice.actions

export const setNotification = ({type, message}) => async (dispatch) => {
  dispatch(pushNotif({type, message}))
  setTimeout(() => dispatch(removeNotif()), 2500)
}

export default notifSlice.reducer