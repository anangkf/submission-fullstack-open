import React, { useState } from 'react';
import Cookies from 'js-cookie';

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
};

const Blog = ({
  blog, loading, handleLike, handleDelete
}) => {
  const [hide, setHide] = useState(false);
  
  const usersName = Cookies.get('name');
  const toggleHeader = () => setHide(!hide);

  const deleteBlog = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      handleDelete(blog);
    }
  };

  // const titleStyle = {display: hide ? 'none' : ''};
  const detailStyle = {display: !hide ? 'none' : ''};

  return (
    <div className='blog' style={blogStyle}>
      <span>{`${blog.title} ${blog.author}`}</span>
      <button type="button" onClick={toggleHeader}>{hide ? 'hide' : 'show'}</button>
      <div data-testid="blog-details" style={detailStyle}>
        <a href={blog.url}>{blog.url}</a>
        <div className='likes'>
          <span data-cy='likes'>{`likes ${blog.likes}`}</span>
          {' '}
          <button type="button" data-cy='like-btn' disabled={loading} onClick={() => handleLike(blog)}>like</button>
        </div>
        {blog.user.name || usersName }
        <br />
        {blog.user.name === usersName && <button type="button" disabled={loading} onClick={deleteBlog}>remove</button>}
      </div>
    </div>
  );
};

export default Blog;
