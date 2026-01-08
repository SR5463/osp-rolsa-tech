import './products-styles.css';

const img5 = "https://dailynewshungary.b-cdn.net/wp-content/uploads/2024/04/solar-panel.jpg";
const img12 = "https://nexblue.com/cdn/shop/files/Frame_197045_1.jpg?v=1706847562&width=1296";
const img14 = "https://miro.medium.com/v2/resize:fit:828/format:webp/1*SPjK4Lp94t68FNeTH3MNPQ.png";

export default function Products({ onNavigateToBooking }) {
  return (
    <div className="products-page">
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
