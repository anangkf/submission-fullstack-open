/* eslint-disable react/button-has-type */
import React from 'react';
import Cookies from 'js-cookie';
import Blog from './Blog';
import BlogForm from './BlogForm';
import Togglable from './Togglable';

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
      <Togglable buttonLabel="new blog">
        <BlogForm blogs={blogs} setBlogs={setBlogs} Notif={Notif} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          blogs={blogs}
          setBlogs={setBlogs}
          Notif={Notif}
        />
      ))}
    </>
  );
};

export default BlogList;
