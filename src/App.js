import React from 'react'

import WithContext from './WithContext'
import WithReducer from './WithReducer'
import WithStateMachine from './WithStateMachine'

function App() {
  return (
    <div className='App'>
      <h1>Data Loading Examples</h1>

      <h2>Data Loading with Context</h2>
      <WithContext />

      <h2>Data Loading with Reducer</h2>
      <WithReducer />

      <h2>XState Data Loading Services</h2>
      <WithStateMachine />
    </div>
  )
}

export default App
