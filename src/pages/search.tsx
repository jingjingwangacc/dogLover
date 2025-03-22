import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import '../App.css'

function Search() {
  const [count, setCount] = useState(0)
  fetch('https://frontend-take-home-service.fetch.com/dogs/breeds', {
    method: 'GET',
    // headers: {
    //   'Content-type': 'application/json',
    //   'Access-Control-Allow-Origin': "*"
    // },
    credentials: 'include',
  }).then(data => {
    console.log('data recieved from local auth: ', data)
    
  })
    .catch(err => console.log('error:', err))

  return (
    <>

      <div>

        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )

}

export default Search