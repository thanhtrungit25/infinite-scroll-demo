import React from 'react'

const allData = new Array(25).fill(0).map((_val, i) => i + 1)
const perPage = 10
const types = {
  start: 'START',
  loaded: 'LOADED',
}

const reducer = (state, action) => {
  switch (action.type) {
    case types.start:
      return { ...state, loading: true }
    case types.loaded:
      return {
        ...state,
        loading: false,
        data: [...state.data, ...action.newData],
        more: action.newData.length === perPage,
        after: state.after + action.newData.length,
      }

    default:
      throw new Error('Dont understand action')
  }
}

function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    loading: false,
    more: true,
    data: [],
    after: 0,
  })

  const { loading, more, data, after } = state

  return (
    <div className='App'>
      <pre>
        <code>{JSON.stringify(state, null, 2)}</code>
      </pre>
      <ul>
        {data.map((row) => (
          <li key={row} style={{ background: 'orange' }}>
            {row}
          </li>
        ))}

        {loading && <li>Loading...</li>}

        {!loading && more && (
          <li style={{ background: 'green' }}>
            <button
              onClick={() => {
                dispatch({ type: types.start })

                setTimeout(() => {
                  const newData = allData.slice(after, after + perPage)
                  dispatch({ type: types.loaded, newData })
                }, 1000)
              }}
            >
              Load More
            </button>
          </li>
        )}
      </ul>
    </div>
  )
}

export default App
