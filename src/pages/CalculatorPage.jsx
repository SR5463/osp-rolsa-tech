import { useState } from 'react';
import './Calculator-styles.css';

export default function CalculatorPage({ onNavigateToBooking, onNavigateToProducts, trackerData }) {
  const [useTrackerData, setUseTrackerData] = useState(false);
  const [formData, setFormData] = useState({
    electricity: '',
    gas: '',
    water: '',
    carMiles: '',
    flightHours: ''
  });
  const [results, setResults] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateFootprint = (e) => {
    e.preventDefault();
    
    const electricityFactor = 0.385;
    const gasFactor = 2.04;
    const waterFactor = 0.35;
    const carFactor = 0.21;
    const flightFactor = 0.255;

    let electricity, gas, water;

    if (useTrackerData && trackerData && trackerData.length > 0) {
      electricity = trackerData.reduce((sum, entry) => sum + (parseFloat(entry.electricity) || 0), 0);
      gas = trackerData.reduce((sum, entry) => sum + (parseFloat(entry.gas) || 0), 0);
      water = trackerData.reduce((sum, entry) => sum + (parseFloat(entry.water) || 0), 0);
    } else {
      electricity = parseFloat(formData.electricity) || 0;
      gas = parseFloat(formData.gas) || 0;
      water = parseFloat(formData.water) || 0;
    }

    const carMiles = parseFloat(formData.carMiles) || 0;
    const flightHours = parseFloat(formData.flightHours) || 0;

    const electricityEmissions = electricity * electricityFactor;
    const gasEmissions = gas * gasFactor;
    const waterEmissions = water * waterFactor;
    const carEmissions = carMiles * carFactor;
    const flightEmissions = flightHours * 900 * flightFactor;

    const totalMonthly = electricityEmissions + gasEmissions + waterEmissions + carEmissions + flightEmissions;
    const totalAnnual = totalMonthly * 12;

    setResults({
      electricity: electricityEmissions.toFixed(2),
      gas: gasEmissions.toFixed(2),
      water: waterEmissions.toFixed(2),
      car: carEmissions.toFixed(2),
      flight: flightEmissions.toFixed(2),
      totalMonthly: totalMonthly.toFixed(2),
      totalAnnual: totalAnnual.toFixed(2),
      usedTrackerData: useTrackerData
    });
  };

  const resetForm = () => {
    setFormData({
      electricity: '',
      gas: '',
      water: '',
      carMiles: '',
      flightHours: ''
    });
    setResults(null);
  };

  const hasTrackerData = trackerData && trackerData.length > 0;

  return (
    <div className="calculator-container">
      <section className="calc-main">
        <div className="calc-content">
          <h1 className="calc-title">Calculate Your<br />Carbon Footprint</h1>
          <p className="calc-subtitle">
            Enter your monthly usage data to understand your environmental impact and get personalized recommendations.
          </p>

          {hasTrackerData && (
            <div className="data-source-toggle">
              <label className="toggle-label">
                <input
                  type="checkbox"
                  checked={useTrackerData}
                  onChange={(e) => setUseTrackerData(e.target.checked)}
                  className="toggle-input"
                />
                <span>Use data from Energy Tracker</span>
              </label>
              {useTrackerData && (
                <p className="toggle-info">Using tracked energy data for calculation</p>
              )}
            </div>
          )}

          <form onSubmit={calculateFootprint} className="calc-form">
            {!useTrackerData && (
              <>
                <div className="form-group">
                  <label htmlFor="electricity">Monthly Electricity (kWh)</label>
                  <input
                    type="number"
                    id="electricity"
                    name="electricity"
                    value={formData.electricity}
                    onChange={handleInputChange}
                    placeholder="e.g., 300"
                    step="0.1"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="gas">Monthly Gas (m³)</label>
                  <input
                    type="number"
                    id="gas"
                    name="gas"
                    value={formData.gas}
                    onChange={handleInputChange}
                    placeholder="e.g., 50"
                    step="0.1"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="water">Monthly Water (m³)</label>
                  <input
                    type="number"
                    id="water"
                    name="water"
                    value={formData.water}
                    onChange={handleInputChange}
                    placeholder="e.g., 10"
                    step="0.1"
                  />
                </div>
              </>
            )}

            <div className="form-group">
              <label htmlFor="carMiles">Monthly Car Miles</label>
              <input
                type="number"
                id="carMiles"
                name="carMiles"
                value={formData.carMiles}
                onChange={handleInputChange}
                placeholder="e.g., 500"
                step="0.1"
              />
            </div>

            <div className="form-group">
              <label htmlFor="flightHours">Monthly Flight Hours</label>
              <input
                type="number"
                id="flightHours"
                name="flightHours"
                value={formData.flightHours}
                onChange={handleInputChange}
                placeholder="e.g., 5"
                step="0.1"
              />
            </div>

            <div className="form-buttons">
              <button type="submit" className="calc-submit-btn">Calculate</button>
              <button type="button" onClick={resetForm} className="calc-reset-btn">Reset</button>
            </div>
          </form>
        </div>

        {results && (
          <div className="results-section">
            <h2 className="results-title">Your Carbon Footprint</h2>
            
            <div className="results-grid">
              <div className="result-card">
                <h3>Electricity</h3>
                <p className="result-value">{results.electricity} kg CO₂</p>
              </div>
              <div className="result-card">
                <h3>Gas</h3>
                <p className="result-value">{results.gas} kg CO₂</p>
              </div>
              <div className="result-card">
                <h3>Water</h3>
                <p className="result-value">{results.water} kg CO₂</p>
              </div>
              <div className="result-card">
                <h3>Car Travel</h3>
                <p className="result-value">{results.car} kg CO₂</p>
              </div>
              <div className="result-card">
                <h3>Flights</h3>
                <p className="result-value">{results.flight} kg CO₂</p>
              </div>
            </div>

            <div className="results-summary">
              <div className="summary-item">
                <h3>Monthly Total</h3>
                <p className="summary-value">{results.totalMonthly} kg CO₂</p>
              </div>
              <div className="summary-item">
                <h3>Annual Total</h3>
                <p className="summary-value">{results.totalAnnual} kg CO₂</p>
              </div>
            </div>

            <div className="recommendations">
              <h3>How to Reduce Your Footprint</h3>
              <ul>
                <li>Switch to renewable energy sources like solar panels</li>
                <li>Improve home insulation to reduce heating needs</li>
                <li>Use public transportation or carpool</li>
                <li>Reduce air travel when possible</li>
                <li>Install energy-efficient appliances</li>
              </ul>
              <button className="consultation-btn" onClick={onNavigateToBooking}>
                Schedule a Consultation
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
