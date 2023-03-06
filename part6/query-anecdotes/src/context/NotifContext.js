import { createContext, useReducer } from "react";
import notifReducer from "../reducers/notifReducer";

const NotifContext = createContext()

export const NotifContextProvider = ({ children }) => {
  const [notif, notifDispatcher] = useReducer(notifReducer, '')

  const pushNotif = async (payload) => {
    notifDispatcher({type: 'PUSH', payload})
    setTimeout(() => {
      notifDispatcher({type: 'REMOVE'})
    }, 5000)
  }

  return (
    <NotifContext.Provider
      value={{ notif, pushNotif }}
    >
      { children }
    </NotifContext.Provider>
  )
}

export default NotifContext