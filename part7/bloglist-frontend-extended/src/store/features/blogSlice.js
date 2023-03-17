import blogService from '../../services/blogs'
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import Cookies from 'js-cookie'

const initialState = []

export const getAllBlogs = createAsyncThunk('fetch/blogs', async () => {
  try {
    const res = await blogService.getAll()
    return res.results
  } catch (error) {
    throw new Error(error.response.data.error)
  }
})

export const createBlog = createAsyncThunk('create/blog', async (data) => {
  try {
    const res = await blogService.create({data, token: Cookies.get('token')})
    return res

  } catch (error) {
    throw new Error(error.response.data.error)
  }
})

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  extraReducers(builder) {
    builder.addCase(getAllBlogs.fulfilled, (state, action) => state = action.payload)
    builder.addCase(createBlog.fulfilled, (state, action) => {
      state.push(action.payload)
    })
  } 
})

export default blogSlice.reducer