import React from 'react';

const BlogDetails = ({ blog, toggleChildren }) => {
  const handleLike = () => {};

  return (
    <>
      <div>
        {blog.title}
        {' '}
        <button type="button" onClick={toggleChildren}>hide</button>
      </div>
      {blog.url}
      <div>
        {`likes ${blog.likes}`}
        {' '}
        <button type="button" onClick={handleLike}>like</button>
      </div>
      {blog.author}
    </>
  );
};

export default BlogDetails;
