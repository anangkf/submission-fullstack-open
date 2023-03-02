import React from 'react'
import store from './store'

const App = () => {
  const { good, ok, bad } = store.getState()
  return (
    <>
      <button onClick={() => store.dispatch({ type: 'GOOD' })}>good</button>
      <button onClick={() => store.dispatch({ type: 'OK' })}>ok</button>
      <button onClick={() => store.dispatch({ type: 'BAD' })}>bad</button>
      <button onClick={() => store.dispatch({ type: 'ZERO' })}>reset stats</button>

      <div>
        <span>good {good}</span><br />
        <span>ok {ok}</span><br />
        <span>bad {bad}</span><br />
      </div>
    </>
  )
}

export default App
