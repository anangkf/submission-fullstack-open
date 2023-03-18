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
    <div className="flex flex-col items-center justify-center h-[90vh] gap-2">
      <h2 className="text-xl font-bold">log in to application</h2>
      <form className="flex flex-col w-max" onSubmit={handleSubmit}>
        <label htmlFor="username">
          username
        </label>
        <input
          className="border-2 border-gray-700 rounded-md px-1"
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={handleChange}
        />
        <label htmlFor="password">
          password
        </label>
        <input
          className="border-2 border-gray-700 rounded-md px-1"
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handleChange}
        />
        <button className="bg-blue-400 hover:bg-blue-500 px-2 rounded-sm my-2" id="login-btn" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
