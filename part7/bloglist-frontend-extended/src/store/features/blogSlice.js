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

export const like = createAsyncThunk('like/blog', async (data) => {
  try {
    const res = await blogService.edit({data, token: Cookies.get('token')})
    return res.data
  } catch (error) {
    throw new Error(error)
  }
})

export const deleteBlog = createAsyncThunk('delete/blog', async (id) => {
  try {
    const res = await blogService.remove({id, token: Cookies.get('token')})
    return res.data
  } catch (error) {
    throw new Error(error)
  }
})

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getAllBlogs.fulfilled, (state, action) => state = action.payload)
      .addCase(createBlog.fulfilled, (state, action) => {
        state.push(action.payload)
      })
      .addCase(like.fulfilled, (state, action) => {
        const {payload} = action
        return state.map((blog) => {
          if(blog.id === payload.id) return payload
          return blog
        })
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        const {payload} = action
        return state.filter((blog) => blog.id !== payload.id)
      })
  } 
})

export default blogSlice.reducer