import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../store/features/blogSlice";

const INITIAL_BLOG_DATA = {
  title: "",
  author: "",
  url: "",
};

const BlogForm = ({ toggleChildren }) => {
  const [blogData, setBlogData] = useState(INITIAL_BLOG_DATA);
  const { title, author, url } = blogData;
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData({
      ...blogData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createBlog(blogData));
    setBlogData(INITIAL_BLOG_DATA);
    toggleChildren();
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: "12px" }}>
        <label htmlFor="title">
          title
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={handleChange}
          />
        </label>
        <br />
        <label htmlFor="author">
          author
          <input
            type="text"
            name="author"
            id="author"
            value={author}
            onChange={handleChange}
          />
        </label>
        <br />
        <label htmlFor="url">
          url
          <input
            type="text"
            name="url"
            id="url"
            value={url}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">create</button>
        <button type="button" onClick={toggleChildren}>
          cancel
        </button>
      </form>
    </>
  );
};

export default BlogForm;
