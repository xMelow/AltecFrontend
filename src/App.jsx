import { useState } from 'react'
import './App.css'
import HomeScreen from './pages/HomeScreen'
import Navbar from './components/Navbar'

function App() {
  return (
    <div>
      <h1>Altec Application</h1>
      <Navbar />
      <HomeScreen />
    </div>
  )
}

export default App
