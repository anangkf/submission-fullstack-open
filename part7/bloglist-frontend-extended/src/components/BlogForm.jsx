import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../store/features/blogSlice";
import { setNotification } from "../store/features/notifSlice";

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
    dispatch(createBlog(blogData))
      .then(() => dispatch(setNotification({type: 'success', message: `addedd ${blogData.title} by ${blogData.author}!`})));
    setBlogData(INITIAL_BLOG_DATA);
    toggleChildren();
  };

  return (
    <>
      <h2 className="text-xl font-bold">create new</h2>
      <form className="flex flex-col items-start mt-px w-max" onSubmit={handleSubmit} style={{ marginBottom: "12px" }}>
        <label htmlFor="title">
          title
        </label>
        <input
          className="border-2 border-gray-700 rounded-md px-1"
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={handleChange}
        />
        <label htmlFor="author">
          author
        </label>
        <input
          className="border-2 border-gray-700 rounded-md px-1"
          type="text"
          name="author"
          id="author"
          value={author}
          onChange={handleChange}
        />
        <label htmlFor="url">
          url
        </label>
        <input
          className="border-2 border-gray-700 rounded-md px-1"
          type="text"
          name="url"
          id="url"
          value={url}
          onChange={handleChange}
        />
        <div className="flex gap-2 justify-end px-2 w-full" >
          <button className="bg-blue-400 hover:bg-blue-500 px-2 rounded-sm my-2" type="submit">create</button>
          <button className="bg-red-danger hover:bg-red-danger-darken px-2 rounded-sm my-2" type="button" onClick={toggleChildren}>
          cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default BlogForm;
