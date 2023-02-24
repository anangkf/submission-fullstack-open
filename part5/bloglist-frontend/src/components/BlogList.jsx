/* eslint-disable react/button-has-type */
import React from 'react';
import Cookies from 'js-cookie';
import Blog from './Blog';

const BlogList = ({ blogs, refetchToken }) => {
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
      {blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
    </>
  );
};

export default BlogList;
