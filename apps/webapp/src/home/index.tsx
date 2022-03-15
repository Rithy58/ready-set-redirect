import { LinkData } from '@ready-set-redirect/api-interfaces';
import React from 'react'

export const Home = () => {
  const [m, setMessage] = React.useState<string>('')
  const [t, setTimer] = React.useState<number>(5)
  const [link, setLink] = React.useState<string>()

  const createLink = React.useCallback((event) => {
    event.preventDefault();
    fetch('/api/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: `http://${m}`,
        timer: t
      })
    })
    .then((r) => r.json())
    .then(setLink)
  }, [m, t])

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Home</h1>
      <form onSubmit={createLink}>
        <label>
          URL: http://
          <input type="text" value={m} onChange={(event) => setMessage(event.target.value)} />
        </label>
        <label>
          Timer:
          <input type="number" value={t} onChange={(event) => setTimer(+event.target.value)} />
        </label>
        <input type="submit" value="Submit" />
      </form>


      { link &&
      <p>Url is: <a href={`http://${window.location.host}/link/${link}`}>{`http://${window.location.host}/link/${link}`}</a></p>
      }

    </div>
  )
}
