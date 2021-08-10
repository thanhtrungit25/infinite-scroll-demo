import React from 'react'

export default function Listen() {
  React.useEffect(() => {
    const listener = () => {
      console.log('i have been resized')
    }
    window.addEventListener('resize', listener)

    return () => {
      console.log('clean resize listener')
      window.removeEventListener('resize', listener)
    }
  }, [])

  return <div>resize me</div>
}
