import React from "react";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

const App = () => {
  const notif = useSelector(state => state.notif)
  const token = useSelector(state => state.auth.token) || Cookies.get('token') 

  // const Notif = {
  //   info: (message) => {
  //     dispatch(setNotification({
  //       type: "",
  //       message,
  //     }))
  //   },
  //   success: (message) => {
  //     dispatch(setNotification({
  //       type: "success",
  //       message,
  //     }))
  //   },
  //   error: (message) => {
  //     dispatch(setNotification({
  //       type: "error",
  //       message,
  //     }))
  //   },
  // };

  return (
    <div>
      <Notification type={notif.type} message={notif.message} />
      {!token ? (
        <LoginForm />
      ) : (
        <BlogList />
      )}
    </div>
  );
};

export default App;
