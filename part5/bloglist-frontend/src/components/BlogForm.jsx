import Cookies from 'js-cookie';
import React, { useState } from 'react';
import blogService from '../services/blogs';

const INITIAL_BLOG_DATA = {
  title: '',
  author: '',
  url: '',
};

const BlogForm = ({ blogs, setBlogs, Notif }) => {
  const [blogData, setBlogData] = useState(INITIAL_BLOG_DATA);
  const [token, setToken] = useState(Cookies.get('token'));
  const { title, author, url } = blogData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData({
      ...blogData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await blogService.create({ data: blogData, token });
      setBlogs([...blogs, res]);
      Notif.success(`a new blog ${title} by ${author} added`);
      setBlogData(INITIAL_BLOG_DATA);
    } catch (error) {
      Notif.error(error.message);
    }
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '12px' }}>
        <label htmlFor="title">
          title
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={handleChange}
          />
        </label>
        <br />
        <label htmlFor="author">
          author
          <input
            type="text"
            name="author"
            id="author"
            value={author}
            onChange={handleChange}
          />
        </label>
        <br />
        <label htmlFor="url">
          url
          <input
            type="text"
            name="url"
            id="url"
            value={url}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default BlogForm;
