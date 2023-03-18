/* eslint-disable react/button-has-type */
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";
import { getAllBlogs } from "../store/features/blogSlice";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/features/authSlice";

const BlogList = () => {
  const name = useSelector(state => state.auth.name) || Cookies.get('name')
  const blog = useSelector(state => state.blog)
  const dispatch = useDispatch()

  const blogs = [...blog].sort((a, b) => b.likes - a.likes)

  const handleLogout = () => {
    dispatch(logout())
    window.location.href = '/'
  };

  useEffect(() => {
    dispatch(getAllBlogs())
  }, []);

  return (
    <>
      <h2>blogs</h2>
      <p>
        {`${name} logged in`}
        <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel="new blog">
        <BlogForm />
      </Togglable>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
        />
      ))}
    </>
  );
};

export default BlogList;
