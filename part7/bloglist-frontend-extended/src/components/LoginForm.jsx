import Cookies from "js-cookie";
import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { login } from "../store/features/authSlice";
import { setNotification } from '../store/features/notifSlice'

const INITIAL_USER_DATA = {
  username: "",
  password: "",
};

const LoginForm = () => {
  const [userData, setUserData] = useState(INITIAL_USER_DATA);
  const { username, password } = userData;
  const {name, token} = useSelector(state => state.auth)
  const dispatch = useDispatch()

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
      // const authData = await authService.login(userData);
      dispatch(login(userData))
      Cookies.set("token", token);
      Cookies.set("name", name);
      setUserData(INITIAL_USER_DATA);
    } catch (error) {
      dispatch(setNotification({type: 'error', message: "wrong username or password"}))
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
        <button id="login-btn" type="submit">
          login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
