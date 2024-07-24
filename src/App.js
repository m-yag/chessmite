import Chessmite from './components/Chessmite'
import {useState} from 'react'

const App = () => {

const [reset, setReset] = useState(false)
const handleReset = () => {
  setReset(true)      // triggers reset
}

  return (
    <div>
      {/*<Chessmite />*/}
    <Chessmite persistMode={true} resetState={reset} setResetState={setReset} />
    </div>
  )
}

export default App
