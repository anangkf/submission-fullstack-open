import React from 'react'

const ErrorHandler = ({ service }) => {
  return (
    <p>{service} service not available due to problems in server</p>
  )
}

export default ErrorHandler