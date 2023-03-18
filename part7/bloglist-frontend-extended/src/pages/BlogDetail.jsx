import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { deleteBlog, getAllBlogs, like } from '../store/features/blogSlice'
import { setNotification } from '../store/features/notifSlice'

const INIT_BLOG = {
  id: '',
  title: '',
  url: '',
  likes: 0,
  author: '',
  user: {}
}

const BlogDetail = () => {
  const [blog, setBlog] = useState(INIT_BLOG)
  const { id } = useParams()
  const blogs = useSelector(state => state.blog)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const usersName = Cookies.get("name");
  const navigate = useNavigate()

  const handleLike = async (blog) => {
    try {
      setLoading(true);
      dispatch(like({ ...blog, likes: blog.likes + 1 }))
      setLoading(false);
      dispatch(setNotification({type: 'success', message: `You liked '${blog.title}'`}))
    } catch (error) {
      dispatch(setNotification({type: 'error', message: error.message}))
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
        setLoading(true)
        dispatch(deleteBlog(id))
        dispatch(setNotification({type: 'success', message: `${blog.title} by ${blog.author} deleted successfully!`}))
        navigate('/')
        setLoading(false);
      }
    } catch (error) {
      dispatch(setNotification({type: 'error', message: error.message}))
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(getAllBlogs())
  }, [])

  useEffect(() => {
    const currentBlog = [...blogs].find((blog) => blog.id === id)
    if(currentBlog) {
      setBlog(currentBlog)
    }
  }, [blogs])

  return (
    <div>
      <h2>{blog.title}{blog.author}</h2>
      <Link to={blog.url} >{blog.url}</Link><br />
      <div className="likes">
        <span data-cy="likes">{`likes ${blog.likes}`}</span>{" "}
        <button
          type="button"
          data-cy="like-btn"
          disabled={loading}
          onClick={() => handleLike(blog)}
        >
            like
        </button>
      </div>
      <span>added by {blog.user.name || usersName}</span>
      <br />
      {blog.user.name === usersName && (
        <button type="button" disabled={loading} onClick={() => handleDelete(blog.id)}>
            remove
        </button>
      )}
    </div>
  )
}

export default BlogDetail