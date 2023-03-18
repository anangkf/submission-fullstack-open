import React from "react";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

const App = () => {
  const token = useSelector(state => state.auth.token) || Cookies.get('token') 

  return (
    <div>
      {!token ? (
        <LoginForm />
      ) : (
        <BlogList />
      )}
    </div>
  );
};

export default App;
