import React from 'react'
import { useParams } from 'react-router-dom'
import { LinkData } from '@ready-set-redirect/api-interfaces'

export const Link = () => {
  const [loaded, setLoaded] = React.useState<boolean>(false)
  const [linkData, setLinkData] = React.useState<LinkData>()
  const { id } = useParams()

  const countDown = React.useCallback(() => {
    if (linkData) {
      if(linkData.timer > 0) {
        setLinkData({...linkData, timer: linkData.timer - 1})
      } else {
        window.location.href = linkData.url
      }
    }
  }, [linkData, setLinkData])

  React.useEffect(() => {
    fetch(`/api/get/${id}`)
      .then<LinkData>((r) => r.json())
      .then((data) => {
        setLinkData(data)
        setLoaded(true)
      })
  }, [])

  React.useEffect(() => {
    if(loaded) {
      setTimeout(countDown, 1000)
    }
  }, [loaded, linkData])

  return (
    <div style={{ textAlign: 'center' }}>
      { loaded && linkData ?
        <>
          <h3>Redirecting to {linkData.url} in</h3>
          <h1>{linkData.timer}</h1>
        </> :
        <h3>Loading...</h3>
      }
    </div>
  )
}
