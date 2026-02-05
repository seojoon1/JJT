import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <button onClick={()=> setCount(count + 1)} className="text-4xl text-red-500 hover:text-green-700 ">count is {count}</button>
    </div>
  )
}

export default App
