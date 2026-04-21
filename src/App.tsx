import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomeScreen from './pages/HomeScreen'
import Navbar from './components/Navbar'
import TsplScreen from './pages/TsplScreen'
import PrinterScreen from './pages/PrinterScreen'
import NiceLabelScreen from './pages/NiceLabelScreen'

export default function App() {
  return (
      <BrowserRouter>
          <div className="min-h-screen bg-altec-white">
              <header className="bg-altec-gray px-8 py-4 shadow-md flex items-center justify-between">
                  <h1 className="text-black text-4xl font-bold tracking-wide">
                      Altec tools
                  </h1>
                  <Navbar />
                  <img src="/src/assets/logo.png" alt="logo" className="h-15 w-auto"/>
              </header>
              <main>
                  <Routes>
                      <Route path="/" element={<HomeScreen />}/>
                      <Route path='/tspl' element={<TsplScreen />} />
                      <Route path='/printers' element={<PrinterScreen />} />
                      <Route path='/nicelabel' element={<NiceLabelScreen />} />
                  </Routes>
              </main>
            </div>
      </BrowserRouter>
  )
}
