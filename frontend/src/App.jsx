import { useEffect } from 'react'
import Routes from './Routes/Routes'
import { checkTokenTime } from './helpers'

function App() {

  useEffect(() => {
    checkTokenTime()
  })

  return <Routes />

}

export default App
