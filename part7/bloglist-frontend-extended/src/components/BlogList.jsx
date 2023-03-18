/* eslint-disable react/button-has-type */
import React, { useEffect } from "react";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";
import { getAllBlogs } from "../store/features/blogSlice";
import { useDispatch, useSelector } from "react-redux";

const BlogList = () => {
  const blog = useSelector(state => state.blog)
  const dispatch = useDispatch()

  const blogs = [...blog].sort((a, b) => b.likes - a.likes)

  useEffect(() => {
    dispatch(getAllBlogs())
  }, []);

  return (
    <>
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
