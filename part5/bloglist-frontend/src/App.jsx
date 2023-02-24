import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import BlogList from './components/BlogList';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [token, setToken] = useState(Cookies.get('token'));

  const refetchToken = () => {
    setToken(Cookies.get('token'));
  };

  useEffect(() => {
    blogService.getAll().then((data) => {
      setBlogs(data.results);
    });
  }, []);

  return (
    <div>
      {!token
        ? <LoginForm refetchToken={refetchToken} />
        : <BlogList blogs={blogs} refetchToken={refetchToken} />}
    </div>
  );
};

export default App;
