import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClientProvider } from 'react-query'
import queryClient from './queries/queryClient'

import App from './App'
import { NotifContextProvider } from './context/NotifContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <NotifContextProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </NotifContextProvider>
)