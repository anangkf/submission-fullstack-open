/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import Blog from './Blog';
import BlogForm from './BlogForm';
import Togglable from './Togglable';
import blogService from '../services/blogs'

const BlogList = ({
  blogs, refetchToken, setBlogs, Notif,
}) => {
  const [loading, setLoading] = useState(false);
  const name = Cookies.get('name');
  const token = Cookies.get('token');

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('name');
    refetchToken();
  };

  const handleLike = async (blog) => {
    try {
      setLoading(true);
      const res = await blogService.edit({ data: { ...blog, likes: blog.likes + 1 }, token });
      setLoading(false);
      // eslint-disable-next-line no-shadow
      const newBlogs = blogs.map((blog) => {
        if (blog.id === res.data.id) {
          return res.data;
        } return blog;
      });
      setBlogs(newBlogs);
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

  return (
    <>
      <h2>blogs</h2>
      <p>
        {`${name} logged in`}
        <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel="new blog">
        <BlogForm blogs={blogs} setBlogs={setBlogs} Notif={Notif} />
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
