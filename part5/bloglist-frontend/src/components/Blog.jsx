import React, { useState } from 'react';
import Cookies from 'js-cookie';
import BlogDetails from './BlogDetails';
import Togglable from './Togglable';
import blogService from '../services/blogs';

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
};

const token = Cookies.get('token');

const Blog = ({
  blog, blogs, setBlogs, Notif,
}) => {
  const [hide, setHide] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
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

  const handleDelete = async () => {
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

  const toggleHeader = () => setHide(!hide);

  return (
    <div style={blogStyle}>
      <div>
        {!hide && `${blog.title} ${blog.author}`}
        <Togglable buttonLabel="view" toggleHeader={toggleHeader}>
          <BlogDetails
            blog={blog}
            handleLike={handleLike}
            loading={loading}
            handleDelete={handleDelete}
          />
        </Togglable>
      </div>
    </div>
  );
};

export default Blog;
