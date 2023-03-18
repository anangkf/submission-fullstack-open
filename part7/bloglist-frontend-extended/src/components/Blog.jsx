import React from "react";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {

  return (
    <div className="blog border border-gray-900 flex items-center px-2 py-2 my-2 hover:translate-x-1.5 transition-all duration-300 ease-out">
      <Link className="hover:text-sky-800 hover:underline" to={`/blogs/${blog.id}`}>
        <span>{`${blog.title} ${blog.author}`}</span>
      </Link>
    </div>
  );
};

export default Blog;
