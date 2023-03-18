import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Comments from '../components/Comments'
import { deleteBlog, getAllBlogs, like } from '../store/features/blogSlice'
import { setNotification } from '../store/features/notifSlice'

const INIT_BLOG = {
  id: '',
  title: '',
  url: '',
  likes: 0,
  author: '',
  user: {},
  comments: []
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
      <div className='my-2 border-2 border-gray-300 rounded-sm p-2'>
        <h2 className='text-xl font-bold'>{blog.title}{blog.author}</h2>
        <Link className="text-sky-800 hover:underline" to={blog.url} >{blog.url}</Link><br />
        <div className="likes">
          <span data-cy="likes">{`likes ${blog.likes}`}</span>{" "}
          <button
            className="bg-blue-400 hover:bg-blue-500 px-2 rounded-sm my-2"
            type="button"
            data-cy="like-btn"
            disabled={loading}
            onClick={() => handleLike(blog)}
          >
            like
          </button>
        </div>
        <span>added by <span className='font-semibold'>{blog.user.name || usersName}</span></span>
        <br />
        {blog.user.name === usersName && (
          <button className='bg-red-danger hover:bg-red-danger-darken px-2 rounded-sm my-2' type="button" disabled={loading} onClick={() => handleDelete(blog.id)}>
            remove
          </button>
        )}
      </div>
      <Comments blog={blog} />
    </div>
  )
}

export default BlogDetail