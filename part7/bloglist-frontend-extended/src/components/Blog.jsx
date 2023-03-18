import React, { useState } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { deleteBlog, like } from "../store/features/blogSlice";
import { setNotification } from "../store/features/notifSlice";

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5,
};

const Blog = ({ blog }) => {
  const [hide, setHide] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()

  const usersName = Cookies.get("name");
  const toggleHeader = () => setHide(!hide);

  const handleLike = async (blog) => {
    try {
      setLoading(true);
      dispatch(like({ ...blog, likes: blog.likes + 1 }))
      setLoading(false);
      dispatch(setNotification({type: 'success', message: `You liked '${blog.title}'`}))
    } catch (error) {
      dispatch(setNotification({type: 'error', message: error.message}))
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
        setLoading(true)
        dispatch(deleteBlog(id))
        dispatch(setNotification({type: 'success', message: `${blog.title} by ${blog.author} deleted successfully!`}))
        setLoading(false);
      }
    } catch (error) {
      dispatch(setNotification({type: 'error', message: error.message}))
      setLoading(false);
    }
  };

  // const deleteBlog = () => {
  //   if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
  //     handleDelete(blog.id);
  //   }
  // };

  // const titleStyle = {display: hide ? 'none' : ''};
  const detailStyle = { display: !hide ? "none" : "" };

  return (
    <div className="blog" style={blogStyle}>
      <span>{`${blog.title} ${blog.author}`}</span>
      <button type="button" onClick={toggleHeader}>
        {hide ? "hide" : "show"}
      </button>
      <div data-testid="blog-details" style={detailStyle}>
        <a href={blog.url}>{blog.url}</a>
        <div className="likes">
          <span data-cy="likes">{`likes ${blog.likes}`}</span>{" "}
          <button
            type="button"
            data-cy="like-btn"
            disabled={loading}
            onClick={() => handleLike(blog)}
          >
            like
          </button>
        </div>
        {blog.user.name || usersName}
        <br />
        {blog.user.name === usersName && (
          <button type="button" disabled={loading} onClick={() => handleDelete(blog.id)}>
            remove
          </button>
        )}
      </div>
    </div>
  );
};

export default Blog;
