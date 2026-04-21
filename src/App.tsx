import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomeScreen from './pages/HomeScreen'
import Navbar from './components/Navbar'
import LabelScreen from './pages/LabelScreen'
import PrinterScreen from './pages/PrinterScreen'
import NiceLabelScreen from './pages/NiceLabelScreen'

export default function App() {
  return (
    <div>
      <h1>Altec Tools</h1>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomeScreen />}/>
          <Route path='/labels' element={<LabelScreen />} />
          <Route path='/printers' element={<PrinterScreen />} />
          <Route path='/nicelabel' element={<NiceLabelScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
