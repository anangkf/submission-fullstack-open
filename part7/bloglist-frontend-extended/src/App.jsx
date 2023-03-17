import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import BlogList from "./components/BlogList";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "./store/features/notifSlice";

const INIT_NOTIF = {
  type: "",
  message: "",
};

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [token, setToken] = useState(Cookies.get("token"));
  const notif = useSelector(state => state.notif)
  const dispatch = useDispatch()

  const Notif = {
    info: (message) => {
      dispatch(setNotification({
        type: "",
        message,
      }))
    },
    success: (message) => {
      dispatch(setNotification({
        type: "success",
        message,
      }))
    },
    error: (message) => {
      dispatch(setNotification({
        type: "error",
        message,
      }))
    },
  };

  const refetchToken = () => {
    setToken(Cookies.get("token"));
  };

  const blogList = blogs.sort((a, b) => b.likes - a.likes);

  useEffect(() => {
    blogService.getAll().then((data) => {
      setBlogs(data.results);
    });
  }, []);

  return (
    <div>
      <Notification type={notif.type} message={notif.message} />
      {!token ? (
        <LoginForm refetchToken={refetchToken} Notif={Notif} />
      ) : (
        <BlogList
          blogs={blogList}
          refetchToken={refetchToken}
          setBlogs={setBlogs}
          Notif={Notif}
        />
      )}
    </div>
  );
};

export default App;
