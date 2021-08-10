import React from 'react'
import axios from 'axios'

export default function Fetcher({ url }) {
  const [data, setData] = React.useState(null)

  React.useEffect(() => {
    // Start it off by assuming the component is still mounted
    let mounted = true

    const loadData = async () => {
      // Pause here after 2s then run if check guard
      // Because when change mounted to 'false'
      // So when not run to error
      const response = await axios.get(url)

      // We havee a reponse, but let's first check if component is sill mounted?
      if (mounted) {
        setData(response.data)
      }
    }

    loadData()

    return () => {
      // When cleanup is called, toggle the mounted varialbe to cancel setData
      console.log('Clean up -> because unmounted trigger')
      mounted = false
    }
  }, [url])

  if (!data) {
    return <div>Loading data from ${url}</div>
  }

  return <div>{JSON.stringify(data)}</div>
}
