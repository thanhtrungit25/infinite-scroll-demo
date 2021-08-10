import React, { useEffect } from 'react'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import torchDark from './torch-dark.svg'
import torchLight from './torch-light.svg'

const useLocalState = (key, defaultValue) => {
  const [value, setValue] = React.useState(() => {
    const storeValue = localStorage.getItem(key)
    return storeValue === null ? defaultValue : JSON.parse(storeValue)
  })

  useEffect(() => {
    const listener = (e) => {
      if (e.storageArea === localStorage && e.key === key) {
        console.log('listener', e)
        setValue(JSON.parse(e.newValue))
      }
    }

    window.addEventListener('storage', listener)

    return () => {
      window.removeEventListener('storage', listener)
    }
  }, [key])

  // High order function, setItem to local storage before return new state
  const setValueInLocalStorage = (newValue) => {
    setValue((currentValue) => {
      const result =
        typeof newValue === 'function' ? newValue(currentValue) : newValue
      // Set new state to local storage
      localStorage.setItem(key, JSON.stringify(result))
      return result
    })
  }

  return [value, setValueInLocalStorage]
}

function App() {
  const [username, setUsername] = useLocalState('username', '')
  const [theme, setTheme] = useLocalState('theme', 'light')

  return (
    <HelmetProvider>
      <Helmet>
        <body data-theme={theme} />
      </Helmet>

      <button
        className='toggle-theme'
        onClick={() =>
          setTheme((curr) => (curr === 'light' ? 'dark' : 'light'))
        }
      >
        <img
          src={theme === 'light' ? torchDark : torchLight}
          alt='toggle theme'
        />
      </button>
      <h1>{theme}</h1>
      <input value={username} onChange={(e) => setUsername(e.target.value)} />
    </HelmetProvider>
  )
}

export default App
