import { useState } from 'react'
import './App.css'
import HomeScreen from './pages/HomeScreen'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div>
      <h1>Altec Application</h1>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomeScreen />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
