import { useState } from 'react'
import './App.css'
import Currency from './components/currency'

function App() {

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyItems: 'center', alignItems: 'center' }}>
        <Currency />
      </div>



    </div>
  )
}

export default App
