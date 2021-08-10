import React from 'react'
import axios from 'axios'

export default function AxiosCancel({ url }) {
  const [data, setData] = React.useState(null)

  React.useEffect(() => {
    // Set up a cancellation source
    let source = axios.CancelToken.source()

    const loadData = async () => {
      try {
        console.log('url', url)
        const response = await axios.get(url, {
          // Assign the source token to this request
          cancelToken: source.token,
        })
        // Never called console.log bellow because cleanup is called
        // to cancel this axios request
        console.log('AxiosCancel: got response')
        setData(response.data)
      } catch (error) {
        // Is the error because we cancelled it ourselves?
        if (axios.isCancel(error)) {
          console.log('AxiosCancel: caught cancel')
        } else {
          throw error
        }
      }
    }

    loadData()

    return () => {
      // Let's cancel the request on effect cleanup
      console.log('AxiosCancel: unmounting')
      source.cancel()
    }
  }, [url])

  if (!data) {
    return <div>Loading data from ${url}</div>
  }

  return <div>{JSON.stringify(data)}</div>
}
