import { useState } from 'react'
import './App.css'
import UserManager from "./components/userManager.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <UserManager />
      </div>
    </>
  )
}

export default App
