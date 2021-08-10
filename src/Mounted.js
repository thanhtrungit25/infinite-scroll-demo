import React from 'react'

export default function Mounted() {
  React.useEffect(() => {
    console.log('mounted')
  }, [])

  return <div>This component has been mounted.</div>
}
