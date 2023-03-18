import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import Cookies from "js-cookie"
import authService from '../../services/auth.service'

const initialState = {
  token: '',
  name: '',
}

export const login = createAsyncThunk('auth/login', async (data) => {
  try {
    const res = await authService.login(data)
    return res
  } catch (error) {
    throw new Error(error)
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state, action) => {
        const { token, name } = action.payload
        Cookies.set("token", token);
        Cookies.set("name", name);
        return state = { token, name }
      })
  },
  reducers: {
    logout: (state) => {
      Cookies.remove("token");
      Cookies.remove("name");
      state = {token: '', name: ''}
    }
  }
})

export const { logout } = authSlice.actions

export default authSlice.reducer