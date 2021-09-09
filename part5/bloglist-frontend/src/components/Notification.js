import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div id="notification" className="error">
      {message}
    </div>
  )
}

export { Notification }
