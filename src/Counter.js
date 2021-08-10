import React from 'react'

export default function Counter() {
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    console.log(`The count is ${count}`)
  })

  return (
    <div>
      <p>Count is {count}</p>
      <button onClick={() => setCount(count + 1)}>increase</button>
    </div>
  )
}
