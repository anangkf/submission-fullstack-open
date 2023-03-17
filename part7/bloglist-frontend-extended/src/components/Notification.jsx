import React from 'react';
import '../styles/index.css';

const Notification = ({ type, message }) => {
  if (!message) {
    return null;
  }
  return (
    <div className={`notification ${type}`}>{message}</div>
  );
};

export default Notification;
