import React from 'react'
import { useMachine } from '@xstate/react'
import { createMachine } from 'xstate'

const toggleMachine = createMachine({
  id: 'toggleMachine',
  initial: 'inactive',
  states: {
    inactive: {
      on: {
        TOGGLE: 'active',
      },
    },
    active: {
      on: {
        TOGGLE: 'inactive',
      },
    },
  },
})

function App() {
  const [current, send] = useMachine(toggleMachine)

  return (
    <div>
      <button
        onClick={() => {
          send('TOGGLE')
        }}
      >
        Toggle
      </button>

      {current.matches('active') && <span>We are active</span>}
      {current.matches('inactive') && <span>We are inactive</span>}
    </div>
  )
}

export default App
