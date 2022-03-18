import React from 'react'

export const Home = () => {
  const urlInput = React.useRef<HTMLInputElement>(null)
  const timerInput = React.useRef<HTMLInputElement>(null)
  const [redirectUrl, setRedirectUrl] = React.useState<string>()

  const createLink = React.useCallback((event) => {
    event.preventDefault()
    if(urlInput.current && timerInput.current) {
      fetch('/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          url: `http://${urlInput.current.value}`,
          timer: timerInput.current.value
        })
      })
      .then<string>((r) => r.json())
      .then(setRedirectUrl)
    }
  }, [urlInput, timerInput, setRedirectUrl])

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Home</h1>
      <form onSubmit={createLink}>
        <label>
          URL: http://
          <input type="text" ref={urlInput} defaultValue=""/>
        </label>
        <label>
          Timer:
          <input type="number" ref={timerInput} defaultValue={5}/>
        </label>
        <input type="submit" value="Submit" />
      </form>

      { redirectUrl &&
        <p>Redirect Page URL is: <a href={`http://${window.location.host}/link/${redirectUrl}`}>{`http://${window.location.host}/link/${redirectUrl}`}</a></p>
      }

    </div>
  )
}
