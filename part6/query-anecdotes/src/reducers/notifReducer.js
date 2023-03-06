const notifReducer = (state, action) => {
  switch(action.type) {
    case 'PUSH':
      return action.payload
    case 'REMOVE':
      return state = ''
    default:
      return state
  }
}

export default notifReducer