import React from 'react'
import Listen from './Listen'
import Fetcher from './Fetcher'
import AxiosCancel from './AxiosCancel'
import FetchCancel from './FetchCancel'

function App() {
  const [listen, setListen] = React.useState(false)
  const [mounted, setMounted] = React.useState(true)

  React.useEffect(() => {
    // Simulate 500ms to check Fetcher effect fetch url with 2s
    setTimeout(() => {
      setMounted(false)
    }, 500)
  }, [])

  return (
    <div className='App'>
      <button onClick={() => setListen(!listen)}>
        {listen ? 'stop' : 'start'} listening
      </button>
      {listen ? <Listen /> : null}
      <hr />

      <Fetcher url='https://reqres.in/api/users/1?delay=2' />
      <hr />

      {mounted && <Fetcher url='https://reqres.in/api/users/1?delay=2' />}

      {mounted && (
        <>
          <AxiosCancel url='https://reqres.in/api/users/1?delay=2' />
          <FetchCancel url='https://reqres.in/api/users/1?delay=2' />
        </>
      )}
    </div>
  )
}

export default App
