import React from 'react'

import WithStateMachine from './WithStateMachine'
import WithReducer from './WithReducer'

function App() {
  return (
    <div className='App'>
      <h1>Data Loading Examples</h1>

      <h2>Data Loading with Reducer</h2>
      <WithReducer />

      <h2>XState Data Loading Services</h2>
      <WithStateMachine />
    </div>
  )
}

export default App
