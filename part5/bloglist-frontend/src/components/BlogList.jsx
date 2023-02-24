/* eslint-disable react/button-has-type */
import React from 'react';
import Cookies from 'js-cookie';
import Blog from './Blog';
import BlogForm from './BlogForm';

const BlogList = ({
  blogs, refetchToken, setBlogs, Notif,
}) => {
  const name = Cookies.get('name');

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('name');
    refetchToken();
  };

  return (
    <>
      <h2>blogs</h2>
      <p>
        {`${name} logged in`}
        <button onClick={handleLogout}>logout</button>
      </p>
      <BlogForm blogs={blogs} setBlogs={setBlogs} Notif={Notif} />
      {blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
    </>
  );
};

export default BlogList;
