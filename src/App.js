import React from 'react'

const MyContext = React.createContext()

// Solution 2, decouple Provider from App component
const MyProvider = ({ children }) => {
  const [theme, setTheme] = React.useState('light')
  const nextTheme = theme === 'light' ? 'dark' : 'light'
  const value = {
    theme,
    nextTheme,
    toggleTheme: () => {
      setTheme(nextTheme)
    },
  }

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>
}

function App() {
  return (
    <MyProvider>
      <DirectChild />
    </MyProvider>
  )
}

const DirectChild = () => {
  console.log('DirectChild')
  return (
    <nav>
      <DeeperChild />
    </nav>
  )
}

// const DirectChild = React.memo(() => {
//   console.log('DirectChild')
//   return (
//     <nav>
//       <DeeperChild />
//     </nav>
//   )
// })

const DeeperChild = () => {
  console.log('DeeperChild')
  const { nextTheme, toggleTheme } = React.useContext(MyContext)
  return (
    <p>
      <button onClick={toggleTheme}>{nextTheme}</button>
    </p>
  )
}

export default App
