import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import TourPage from './pages/tour/TourPage'
import './App.css'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Home />} />
        <Route path="/tour/:id" element={<TourPage />} />
      </Routes>
    </div>
  )
}

export default App
