import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomeScreen from './pages/HomeScreen'
import Navbar from './components/Navbar'
import LabelScreen from './pages/LabelScreen'
import PrinterScreen from './pages/PrinterScreen'
import NiceLabelScreen from './pages/NiceLabelScreen'

export default function App() {
  return (
      <BrowserRouter>
          <div className="min-h-screen bg-altec-white">
              <header className="bg-altec-gray px-8 py-4 shadow-md flex items-center justify-between">
                  <div>
                      <h1 className="text-black text-4xl font-bold tracking-wide">
                          Altec tools
                      </h1>
                  </div>
                  <Navbar />
                  <img src="/src/assets/logo.png" alt="logo" className="h-15 w-auto"/>
              </header>
              <main>
                  <Routes>
                      <Route path="/" element={<HomeScreen />}/>
                      <Route path='/labels' element={<LabelScreen />} />
                      <Route path='/printers' element={<PrinterScreen />} />
                      <Route path='/nicelabel' element={<NiceLabelScreen />} />
                  </Routes>
              </main>
            </div>
      </BrowserRouter>
  )
}
