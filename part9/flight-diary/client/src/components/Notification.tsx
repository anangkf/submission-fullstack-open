import React from 'react';

type NotificationProps = {
  type: 'info' | 'error' | 'success';
  message: string;
}

const color = {
  info: 'black',
  error: 'red',
  success: 'green'
};


const Notification: React.FC<NotificationProps> = ({ type, message }) => {
  return (
    <div style={{
      display: message ? 'block' : 'none',
      width: 'max-content',
      padding: 12,
      border: `2px solid ${color[type]}`,
      borderRadius: 6,
      color: color[type]
    }}>
      {message}
    </div>
  );
};

export default Notification;