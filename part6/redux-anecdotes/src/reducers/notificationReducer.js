const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'NEW_NOTIFICATION':
      return action.data.notification
    default:
      return state
  }
}

export const setNotification = (notification, time) => {
  return async (dispatch) => {
    clearTimeout(time)
    time = setTimeout(
      () =>
        dispatch({
          type: 'NEW_NOTIFICATION',
          data: {
            notification: null,
          },
        }),
      time * 1000
    )

    dispatch({
      type: 'NEW_NOTIFICATION',
      data: {
        notification,
      },
    })
  }
}

export default notificationReducer
