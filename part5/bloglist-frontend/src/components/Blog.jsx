import React, { useState } from 'react';
import BlogDetails from './BlogDetails';
import Togglable from './Togglable';

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
};

const Blog = ({ blog }) => {
  const [hide, setHide] = useState(false);

  const toggleHeader = () => setHide(!hide);

  return (
    <div style={blogStyle}>
      <div>
        {!hide && `${blog.title} ${blog.author}`}
        <Togglable buttonLabel="view" toggleHeader={toggleHeader}>
          <BlogDetails blog={blog} />
        </Togglable>
      </div>
    </div>
  );
};

export default Blog;
