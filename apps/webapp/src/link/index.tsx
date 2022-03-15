import { Message } from '@ready-set-redirect/api-interfaces';
import React from 'react'
import { useParams } from 'react-router-dom';

export const Link = () => {
  const [loaded, setLoaded] = React.useState<boolean>(false)
  const [url, setUrl] = React.useState<string>('')
  const [timer, setTimer] = React.useState<number>()

  const { id } = useParams();

  const countDown = React.useCallback(() => {
    if(timer && timer > 0) {
      setTimer(timer - 1)
    } else {
      window.location.href = url
    }
  }, [timer, setTimer, url])

  React.useEffect(() => {
    fetch(`/api/get/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setUrl(data.url)
        setTimer(data.timer)
        setLoaded(true)
      });
  }, []);

  React.useEffect(() => {
    if (loaded) {
      setTimeout(countDown, 1000)
    }
  }, [loaded, timer]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Link for { id }</h1>
      <h3>{ timer }</h3>
    </div>
  )
}
