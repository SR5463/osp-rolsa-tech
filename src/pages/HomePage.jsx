import './home-styles.css';

const imgHeroImage = "https://i0.wp.com/ent.news/2024/12/2614.jpg?fit=1200%2C9999&ssl=1";
const imgCarbonFootprint = "https://www.nord-lock.com/contentassets/d67fb34ad79840a6b940b9a6c5a028be/imagesvdj9.png";
const imgWindTurbines = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpd1IiDFGpz3Ni61lnIajP0v7BIRtaqiLU81GjHMcBzB4xxYap";

export default function HomePage({ onNavigateToBooking, onNavigateToProducts, onNavigateToCalculator }) {
  return (
    <div className="home-container">
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
          </div>

          <div className="feature-item">
            <div className="feature-icon">
              <div className="icon-people"></div>
            </div>
            <h3>Customer Support</h3>
            <p>Dedicated support team available to help you every step of the way</p>
          </div>

          <div className="feature-item">
            <div className="feature-icon">
              <div className="icon-wrench"></div>
            </div>
            <h3>Sustainable Impact</h3>
            <p>Practical solutions that reduce emissions and support community sustainability</p>
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
          <button className="calculator-button" onClick={onNavigateToCalculator}>Calculator</button>
        </div>
      </section>

      {/* Track Energy Section */}
      <section className="track-energy-section">
        <div className="track-energy-content">
          <div className="track-energy-text">
            <h2 className="track-energy-title">Track Energy Usage</h2>
            <p className="track-energy-description">Reduce the amount of energy you consume daily.</p>
            <button className="track-energy-button">Track Energy Usage</button>
          </div>
          <div className="track-energy-image">
            <img src={imgWindTurbines} alt="Wind turbines" />
          </div>
        </div>
      </section>
    </div>
  );
}
