import './home-styles.css';

const imgHeroImage = "https://www.figma.com/api/mcp/asset/812f429b-4f6f-4725-9bea-f1a5fd7e1e7f";
const imgExpertInstallation = "https://www.figma.com/api/mcp/asset/8a7e0a9f-2faa-41bf-bff4-a4355a644562";
const imgCustomerSupport = "https://www.figma.com/api/mcp/asset/d0d51c32-2f5c-4321-a3e2-5a5e81d4ffda";
const imgSustainableImpact = "https://www.figma.com/api/mcp/asset/bf996a05-2e23-4217-8b6b-08163ddeff26";
const imgCarbonFootprint = "https://www.figma.com/api/mcp/asset/c22125c6-1138-4a7f-846e-1aee2d2766c0";
const imgLogo = "https://www.figma.com/api/mcp/asset/527f3a6a-5dc8-4e35-baa7-4c13bea5a45b";

export default function HomePage({ onNavigateToBooking, onNavigateToProducts }) {
  return (
    <div className="home-container">
      {/* Header */}
      <header className="home-header">
        <p className="home-brand-title">Rolsa Technology</p>
        <nav className="home-nav-links">
          <p onClick={onNavigateToProducts} style={{ cursor: 'pointer' }}>Products</p>
          <p>Calculator</p>
          <p>Tracker</p>
          <p className="nav-book" onClick={onNavigateToBooking}>Book</p>
        </nav>
        <div className="home-sign-in-button">
          <p>Sign in</p>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-text">
          <h1 className="hero-main-title">Powering a<br />Renewable Future</h1>
          <p className="hero-description">
            Transform your home or business with green technology solutions. Reduce your carbon footprints while saving on energy costs.
          </p>
          <div className="hero-buttons">
            <button className="hero-button explore-btn" onClick={onNavigateToProducts}>Explore Products</button>
            <button className="hero-button schedule-btn" onClick={onNavigateToBooking}>Schedule Consultation</button>
          </div>
        </div>
        <div className="hero-image">
          <img src={imgHeroImage} alt="Solar panels landscape" />
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="why-choose-section">
        <h2 className="section-heading">Why choose Rolsa Technologies</h2>
        
        <div className="features-showcase">
          <div className="feature-item">
            <div className="feature-icon">
              <div className="icon-star"></div>
            </div>
            <h3>Expert Installation</h3>
            <p>Certified professionals with years of experience in green technology</p>
            <img src={imgExpertInstallation} alt="Expert Installation" className="feature-image" />
          </div>

          <div className="feature-item">
            <div className="feature-icon">
              <div className="icon-people"></div>
            </div>
            <h3>Customer Support</h3>
            <p>Dedicated support team available to help you every step of the way</p>
            <img src={imgCustomerSupport} alt="Customer Support" className="feature-image small" />
          </div>

          <div className="feature-item">
            <div className="feature-icon">
              <div className="icon-wrench"></div>
            </div>
            <h3>Sustainable Impact</h3>
            <p>Dedicated support team available to help you every step of the way</p>
            <img src={imgSustainableImpact} alt="Sustainable Impact" className="feature-image" />
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="calculator-section">
        <div className="calculator-image">
          <img src={imgCarbonFootprint} alt="Carbon footprint calculator" />
        </div>
        <div className="calculator-content">
          <h2 className="calculator-title">Calculate Your<br />Carbon Footprint</h2>
          <p className="calculator-description">
            Understand your environmental impact and discover personalized recommendations to reduce your carbon emissions. Take the first step towards a greener lifestyle.
          </p>
          <button className="calculator-button" onClick={onNavigateToBooking}>Calculator</button>
        </div>
      </section>

      {/* Track Energy Section */}
      <section className="track-energy-section">
        <h2 className="track-energy-title">Track Energy Usage</h2>
        <p className="track-energy-description">Reduce the amount of energy you consume daily.</p>
        <button className="track-energy-button">Track Energy Usage</button>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-left">
            <img src={imgLogo} alt="Logo" className="footer-logo" />
            <p>Rolsa Technologies. Powered by sustainable energy.</p>
          </div>
          <div className="footer-right">
            <p>FAQ</p>
            <p>Policy</p>
            <p>Legal</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
