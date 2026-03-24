import { useState } from 'react'
import './App.css'
import HomeScreen from './pages/HomeScreen'
import Navbar from './components/navbar/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LabelScreen from './pages/labels/LabelScreen'
import PrinterScreen from './pages/printer/PrinterScreen'

function App() {
  return (
    <div>
      <h1>Altec Application</h1>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomeScreen />}/>
          <Route path='/labels' element={<LabelScreen />} />
          <Route path='/printers' element={<PrinterScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
