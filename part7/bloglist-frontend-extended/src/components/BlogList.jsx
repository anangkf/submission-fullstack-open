/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";
import blogService from "../services/blogs";
import { getAllBlogs } from "../store/features/blogSlice";
import { useDispatch, useSelector } from "react-redux";

const BlogList = ({ refetchToken, setBlogs, Notif }) => {
  const [loading, setLoading] = useState(false);
  const name = Cookies.get("name");
  const token = Cookies.get("token");
  const blog = useSelector(state => state.blog)
  const dispatch = useDispatch()

  const blogs = [...blog].sort((a, b) => b.likes - a.likes)

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("name");
    refetchToken();
  };

  const handleLike = async (blog) => {
    try {
      setLoading(true);
      const res = await blogService.edit({
        data: { ...blog, likes: blog.likes + 1 },
        token,
      });
      setLoading(false);
      // eslint-disable-next-line no-shadow
      const newBlogs = blogs.map((blog) => {
        if (blog.id === res.data.id) {
          const data = res.data;
          return { ...blog, ...data };
        }
        return blog;
      });
      setBlogs(newBlogs);
      Notif.success(`You voted '${blog.title}'`)
    } catch (error) {
      Notif.error(error.message);
      setLoading(false);
    }
  };

  const handleDelete = async (blog) => {
    setLoading(true);
    try {
      const res = await blogService.remove({ id: blog.id, token });
      const remainingBlogs = blogs.filter((item) => item.id !== res.data.id);
      setBlogs(remainingBlogs);
      Notif.success(`${blog.title} by ${blog.author} deleted successfully!`);
      setLoading(false);
    } catch (error) {
      Notif.error(error.message);
      setLoading(false);
    }
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
          loading={loading}
          handleLike={handleLike}
          handleDelete={handleDelete}
        />
      ))}
    </>
  );
};

export default BlogList;
