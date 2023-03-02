import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import store from './store'

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}

// rerender app when there is change in the store
renderApp()
store.subscribe(renderApp)
