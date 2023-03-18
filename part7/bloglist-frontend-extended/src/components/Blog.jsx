import React from "react";
import { Link } from "react-router-dom";

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5,
};

const Blog = ({ blog }) => {

  return (
    <div className="blog" style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>
        <span>{`${blog.title} ${blog.author}`}</span>
      </Link>
    </div>
  );
};

export default Blog;
