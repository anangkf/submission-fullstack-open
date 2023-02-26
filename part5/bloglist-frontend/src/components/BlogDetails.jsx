import React from 'react';

const BlogDetails = ({
  blog, toggleChildren, handleLike, loading,
}) => (
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
  </>
);

export default BlogDetails;
