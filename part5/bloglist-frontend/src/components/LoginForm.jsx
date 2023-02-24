import Cookies from 'js-cookie';
import React, { useState } from 'react';
import authService from '../services/auth.service';

const INITIAL_USER_DATA = {
  username: '',
  password: '',
};

const LoginForm = ({ refetchToken, Notif }) => {
  const [userData, setUserData] = useState(INITIAL_USER_DATA);
  const { username, password } = userData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authData = await authService.login(userData);
      Cookies.set('token', authData.token);
      Cookies.set('name', authData.name);
      refetchToken();
      setUserData(INITIAL_USER_DATA);
    } catch (error) {
      Notif.error('wrong username or password');
    }
  };

  return (
    <>
      <h2>log in to application</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          username
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={handleChange}
          />
        </label>
        <br />
        <label htmlFor="password">
          password
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">login</button>
      </form>
    </>
  );
};

export default LoginForm;
