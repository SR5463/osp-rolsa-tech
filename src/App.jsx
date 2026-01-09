import { useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ConsultationBooking from './pages/ConsultationBooking'
import Products from './pages/Products'
import CalculatorPage from './pages/CalculatorPage'
import Tracker from './pages/Tracker'
import SignupPage from './pages/SignupPage'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [trackerData, setTrackerData] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsAuthenticated(true)
    }
  }, [])

  const handleNavigateToBooking = () => {
    if (!isAuthenticated) {
      setCurrentPage('signup')
      return
    }
    setCurrentPage('booking')
  }

  const handleNavigateToProducts = () => {
    setCurrentPage('products')
  }

  const handleBackToHome = () => {
    setCurrentPage('home')
  }

  const handleNavigateToCalculator = () => {
    if (!isAuthenticated) {
      setCurrentPage('signup')
      return
    }
    setCurrentPage('calculator')
  }

  const handleNavigateToTracker = () => {
    if (!isAuthenticated) {
      setCurrentPage('signup')
      return
    }
    setCurrentPage('tracker')
  }

  const handleTrackerDataUpdate = (data) => {
    setTrackerData(data)
  }

  const handleSignupSuccess = () => {
    setIsAuthenticated(true)
    setCurrentPage('home')
  }

  const handleSignIn = () => {
    setCurrentPage('signup')
  }

  const handleSignOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')
    setIsAuthenticated(false)
    setCurrentPage('home')
  }

  return (
    <>
      <Header 
        onBackToHome={handleBackToHome} 
        onNavigateToProducts={handleNavigateToProducts} 
        onNavigateToCalculator={handleNavigateToCalculator} 
        onNavigateToBooking={handleNavigateToBooking} 
        onNavigateToTracker={handleNavigateToTracker}
        isAuthenticated={isAuthenticated}
        onSignIn={handleSignIn}
        onSignOut={handleSignOut}
      />
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
      {currentPage === 'signup' && (
        <SignupPage onSignupSuccess={handleSignupSuccess} />
      )}
      <Footer />
    </>
  )
}

export default App
