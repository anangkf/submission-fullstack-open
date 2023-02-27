import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import BlogList from './components/BlogList';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';

const INIT_NOTIF = {
  type: '',
  message: '',
};

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [token, setToken] = useState(Cookies.get('token'));
  const [notif, setNotif] = useState(INIT_NOTIF);

  const Notif = {
    info: (message) => {
      setNotif({
        type: '',
        message,
      });
      setTimeout(() => setNotif(INIT_NOTIF), 2500);
    },
    success: (message) => {
      setNotif({
        type: 'success',
        message,
      });
      setTimeout(() => setNotif(INIT_NOTIF), 2500);
    },
    error: (message) => {
      setNotif({
        type: 'error',
        message,
      });
      setTimeout(() => setNotif(INIT_NOTIF), 2500);
    },
  };

  const refetchToken = () => {
    setToken(Cookies.get('token'));
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
      {!token
        ? <LoginForm refetchToken={refetchToken} Notif={Notif} />
        : (
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
