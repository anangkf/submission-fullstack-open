import React from 'react';
import Cookies from 'js-cookie';

const BlogDetails = ({
  blog, toggleChildren, handleLike, loading, handleDelete,
}) => {
  const usersName = Cookies.get('name');

  const deleteBlog = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      handleDelete();
    }
  };

  return (
    <>
      <div>
        {blog.title}
        {' '}
        <button type="button" onClick={toggleChildren}>hide</button>
      </div>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {`likes ${blog.likes}`}
        {' '}
        <button type="button" disabled={loading} onClick={handleLike}>like</button>
      </div>
      {blog.author}
      <br />
      {blog.user.name === usersName && <button type="button" disabled={loading} onClick={deleteBlog}>remove</button>}
    </>
  );
};

export default BlogDetails;
