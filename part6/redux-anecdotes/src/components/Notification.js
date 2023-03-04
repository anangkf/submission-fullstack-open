import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const { visibility, message } = useSelector((state) => state.notif)

  const style = {
    border: 'solid',
    display: visibility ? '' : 'none',
    padding: 10,
    borderWidth: 1,
  }
  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification
