import { useState } from 'react'
import HomePage from './pages/HomePage'
import ConsultationBooking from './pages/ConsultationBooking'
import Products from './pages/Products'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const handleNavigateToBooking = () => {
    setCurrentPage('booking')
  }

  const handleNavigateToProducts = () => {
    setCurrentPage('products')
  }

  const handleBackToHome = () => {
    setCurrentPage('home')
  }

  return (
    <>
      {currentPage === 'home' && (
        <HomePage onNavigateToBooking={handleNavigateToBooking} onNavigateToProducts={handleNavigateToProducts} />
      )}
      {currentPage === 'products' && (
        <Products onBackToHome={handleBackToHome} onNavigateToBooking={handleNavigateToBooking} />
      )}
      {currentPage === 'booking' && (
        <ConsultationBooking onBackToHome={handleBackToHome} onNavigateToProducts={handleNavigateToProducts} />
      )}
    </>
  )
}

export default App
