import './products-styles.css';

const img5 = "https://www.figma.com/api/mcp/asset/14a69d22-6a02-4dbc-9bd2-a51c6e7538d3";
const img6 = "https://www.figma.com/api/mcp/asset/0c899f60-5a76-447c-9801-86c66cd44263";
const img11 = "https://www.figma.com/api/mcp/asset/d144076e-dc32-4bc7-985b-c4572e43b09a";
const img12 = "https://www.figma.com/api/mcp/asset/737484ad-9e5d-4ef1-8300-bbcdebe9b1a2";
const img13 = "https://www.figma.com/api/mcp/asset/2f81cf58-7b72-48ca-9d16-dec78c57b3dd";
const img14 = "https://www.figma.com/api/mcp/asset/a24b044e-f641-4aa7-aa58-2150d3ac852a";

export default function Products({ onBackToHome, onNavigateToBooking }) {
  return (
    <div className="products-page">
      <header className="products-header">
        <p className="brand" onClick={onBackToHome} style={{cursor: 'pointer'}}>Rolsa Technology</p>
        <nav className="products-nav">
          <p className="nav-item active">Products</p>
          <p className="nav-item" onClick={onNavigateToBooking}>Calculator</p>
          <p className="nav-item">Tracker</p>
          <p className="nav-item" onClick={onNavigateToBooking}>Book</p>
        </nav>
        <div className="signin">Sign in</div>
      </header>

      <main className="products-main">
        <h1 className="products-title">Green Energy Products</h1>
        <p className="products-sub">Discover our comprehensive range of sustainable energy solutions. From solar panels to smart home systems, we have everything you need to reduce your carbon footprint.</p>

        <section className="products-grid">
          <article className="product-card">
            <div className="product-media">
              <img src={img5} alt="Solar panels" />
            </div>
            <h2>Solar Panels</h2>
            <h3>Residential Solar Panel System</h3>
            <ul className="features-list">
              <li>400W per panel output</li>
              <li>25-year performance warranty</li>
              <li>Weather-resistant design</li>
              <li>Easy monitoring via mobile app</li>
            </ul>
            <div className="product-footer">
              <div className="price">From £1000</div>
              <button className="schedule-btn" onClick={onNavigateToBooking}>Schedule</button>
            </div>
          </article>

          <article className="product-card">
            <div className="product-media">
              <img src={img12} alt="EV Charger" />
            </div>
            <h2>EV Charging</h2>
            <h3>Home EV Charger - Level 2</h3>
            <ul className="features-list">
              <li>7.6 kW charging power</li>
              <li>Compatible with all EVs</li>
              <li>Wi-Fi enabled monitoring</li>
              <li>Indoor/outdoor installation</li>
            </ul>
            <div className="product-footer">
              <div className="price">From £899</div>
              <button className="schedule-btn" onClick={onNavigateToBooking}>Schedule</button>
            </div>
          </article>

          <article className="product-card">
            <div className="product-media">
              <img src={img14} alt="Smart home" />
            </div>
            <h2>Smart Home</h2>
            <h3>Smart Thermostat Pro</h3>
            <ul className="features-list">
              <li>Learning algorithms</li>
              <li>Remote temperature control</li>
              <li>Energy usage reports</li>
              <li>Voice assistant compatible</li>
            </ul>
            <div className="product-footer">
              <div className="price">From £150</div>
              <button className="schedule-btn" onClick={onNavigateToBooking}>Schedule</button>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}
