import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ConsultationBooking from './pages/ConsultationBooking'
import Products from './pages/Products'
import CalculatorPage from './pages/CalculatorPage'
import Tracker from './pages/Tracker'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [trackerData, setTrackerData] = useState([])

  const handleNavigateToBooking = () => {
    setCurrentPage('booking')
  }

  const handleNavigateToProducts = () => {
    setCurrentPage('products')
  }

  const handleBackToHome = () => {
    setCurrentPage('home')
  }

  const handleNavigateToCalculator = () => {
    setCurrentPage('calculator')
  }

  const handleNavigateToTracker = () => {
    setCurrentPage('tracker')
  }

  const handleTrackerDataUpdate = (data) => {
    setTrackerData(data)
  }

  return (
    <>
      <Header onBackToHome={handleBackToHome} onNavigateToProducts={handleNavigateToProducts} onNavigateToCalculator={handleNavigateToCalculator} onNavigateToBooking={handleNavigateToBooking} onNavigateToTracker={handleNavigateToTracker} />
      {currentPage === 'home' && (
        <HomePage onNavigateToBooking={handleNavigateToBooking} onNavigateToProducts={handleNavigateToProducts} onNavigateToCalculator={handleNavigateToCalculator} />
      )}
      {currentPage === 'products' && (
        <Products onNavigateToBooking={handleNavigateToBooking} />
      )}
      {currentPage === 'booking' && (
        <ConsultationBooking onNavigateToProducts={handleNavigateToProducts} />
      )}
      {currentPage === 'calculator' && (
        <CalculatorPage onNavigateToBooking={handleNavigateToBooking} onNavigateToProducts={handleNavigateToProducts} trackerData={trackerData} />
      )}
      {currentPage === 'tracker' && (
        <Tracker onDataUpdate={handleTrackerDataUpdate} />
      )}
      <Footer />
    </>
  )
}

export default App
