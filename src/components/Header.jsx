import '../styles/header-footer.css';

export default function Header({ onBackToHome, onNavigateToProducts, onNavigateToCalculator, onNavigateToTracker, onNavigateToBooking, isAuthenticated, onSignIn, onSignOut }) {
  return (
    <header className="app-header">
      <p className="brand-title" onClick={onBackToHome} style={{ cursor: 'pointer' }}>Rolsa Technology</p>
      <nav className="nav-links">
        <p onClick={onNavigateToProducts} style={{ cursor: 'pointer' }}>Products</p>
        <p onClick={onNavigateToCalculator} style={{ cursor: 'pointer' }}>Calculator</p>
        <p onClick={onNavigateToTracker} style={{ cursor: 'pointer' }}>Tracker</p>
        <p className="nav-book" onClick={onNavigateToBooking}>Book</p>
      </nav>
      <div className="sign-in-button" onClick={isAuthenticated ? onSignOut : onSignIn}>
        <p>{isAuthenticated ? 'Sign out' : 'Sign in'}</p>
      </div>
    </header>
  );
}
