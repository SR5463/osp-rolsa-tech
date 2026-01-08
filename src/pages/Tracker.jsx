import { useState } from 'react';
import './tracker-styles.css';

export default function Tracker({ onDataUpdate }) {
  const [entries, setEntries] = useState([]);
  const today = new Date().toISOString().split('T')[0];
  const [formData, setFormData] = useState({
    date: today,
    electricity: '',
    gas: '',
    water: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => (({
      ...prev,
      [name]: value
    })));
  };

  const handleAddEntry = (e) => {
    e.preventDefault();
    if (formData.date > today) {
      alert('Cannot add data for future dates');
      return;
    }
    if (formData.electricity || formData.gas || formData.water) {
      const newEntries = [
        { ...formData, id: Date.now() },
        ...entries
      ];
      setEntries(newEntries);
      if (onDataUpdate) onDataUpdate(newEntries);
      setFormData({
        date: today,
        electricity: '',
        gas: '',
        water: ''
      });
    }
  };

  const handleDeleteEntry = (id) => {
    const newEntries = entries.filter(entry => entry.id !== id);
    setEntries(newEntries);
    if (onDataUpdate) onDataUpdate(newEntries);
  };

  const calculateTotals = () => {
    return entries.reduce((acc, entry) => (({
      electricity: acc.electricity + (parseFloat(entry.electricity) || 0),
      gas: acc.gas + (parseFloat(entry.gas) || 0),
      water: acc.water + (parseFloat(entry.water) || 0)
    })), { electricity: 0, gas: 0, water: 0 });
  };

  const totals = calculateTotals();
  const carbonEmissions = (totals.electricity * 0.385 + totals.gas * 2.04 + totals.water * 0.35).toFixed(2);

  const sortedEntries = [...entries].sort((a, b) => new Date(a.date) - new Date(b.date));
  const maxValue = Math.max(...sortedEntries.map(e => parseFloat(e.electricity) || 0), 1);
  const pointSpacing = 35;
  const graphWidth = sortedEntries.length * pointSpacing + 60;

  return (
    <div className="tracker-container">
      <section className="tracker-main">
        <div className="tracker-content">
          <h1 className="tracker-title">Track Energy Usage</h1>
          <p className="tracker-subtitle">
            Log your daily energy consumption and monitor your carbon footprint in real-time.
          </p>

          <form onSubmit={handleAddEntry} className="tracker-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  max={today}
                  className="input-field"
                />
              </div>

              <div className="form-group">
                <label htmlFor="electricity">Electricity (kWh)</label>
                <input
                  type="number"
                  id="electricity"
                  name="electricity"
                  value={formData.electricity}
                  onChange={handleInputChange}
                  placeholder="0"
                  step="0.1"
                  className="input-field"
                />
              </div>

              <div className="form-group">
                <label htmlFor="gas">Gas (m³)</label>
                <input
                  type="number"
                  id="gas"
                  name="gas"
                  value={formData.gas}
                  onChange={handleInputChange}
                  placeholder="0"
                  step="0.1"
                  className="input-field"
                />
              </div>

              <div className="form-group">
                <label htmlFor="water">Water (m³)</label>
                <input
                  type="number"
                  id="water"
                  name="water"
                  value={formData.water}
                  onChange={handleInputChange}
                  placeholder="0"
                  step="0.1"
                  className="input-field"
                />
              </div>
            </div>

            <button type="submit" className="add-entry-btn">Add Entry</button>
          </form>

          {entries.length > 0 && (
            <>
              <div className="summary-cards">
                <div className="summary-card">
                  <h3>Total Electricity</h3>
                  <p className="summary-value">{totals.electricity.toFixed(2)} kWh</p>
                </div>
                <div className="summary-card">
                  <h3>Total Gas</h3>
                  <p className="summary-value">{totals.gas.toFixed(2)} m³</p>
                </div>
                <div className="summary-card">
                  <h3>Total Water</h3>
                  <p className="summary-value">{totals.water.toFixed(2)} m³</p>
                </div>
                <div className="summary-card highlight">
                  <h3>Total CO₂ Emissions</h3>
                  <p className="summary-value">{carbonEmissions} kg</p>
                </div>
              </div>

              {sortedEntries.length > 0 && (
                <div className="graph-section">
                  <h2 className="graph-title">Electricity Usage Trend</h2>
                  <div className="line-graph">
                    <svg viewBox={`0 0 ${graphWidth} 200`} className="graph-svg">
                      <defs>
                        <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#53b394" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#53b394" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      
                      {/* Grid lines */}
                      {[0, 1, 2, 3, 4].map(i => (
                        <line key={`grid-${i}`} x1="30" y1={160 - i * 32} x2={graphWidth - 10} y2={160 - i * 32} stroke="#e0e0e0" strokeWidth="1" />
                      ))}
                      
                      {/* Y-axis */}
                      <line x1="30" y1="10" x2="30" y2="165" stroke="#333" strokeWidth="2" />
                      
                      {/* X-axis */}
                      <line x1="30" y1="165" x2={graphWidth - 10} y2="165" stroke="#333" strokeWidth="2" />
                      
                      {/* Y-axis labels */}
                      {[0, 1, 2, 3, 4].map(i => (
                        <text key={`label-${i}`} x="22" y={170 - i * 32} textAnchor="end" fontSize="10" fill="#666">
                          {(i * maxValue / 4).toFixed(1)}
                        </text>
                      ))}
                      
                      {/* Data points and line */}
                      <polyline
                        points={sortedEntries.map((entry, idx) => {
                          const x = 40 + idx * pointSpacing;
                          const y = 165 - (parseFloat(entry.electricity) || 0) / maxValue * 150;
                          return `${x},${y}`;
                        }).join(' ')}
                        fill="none"
                        stroke="#53b394"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      
                      {/* Area under line */}
                      <polygon
                        points={`30,165 ${sortedEntries.map((entry, idx) => {
                          const x = 40 + idx * pointSpacing;
                          const y = 165 - (parseFloat(entry.electricity) || 0) / maxValue * 150;
                          return `${x},${y}`;
                        }).join(' ')} ${40 + (sortedEntries.length - 1) * pointSpacing},165`}
                        fill="url(#areaGradient)"
                      />
                      
                      {/* Data points */}
                      {sortedEntries.map((entry, idx) => {
                        const x = 40 + idx * pointSpacing;
                        const y = 165 - (parseFloat(entry.electricity) || 0) / maxValue * 150;
                        return (
                          <circle key={`point-${idx}`} cx={x} cy={y} r="3" fill="#53b394" stroke="white" strokeWidth="1.5" />
                        );
                      })}
                      
                      {/* X-axis labels (dates) */}
                      {sortedEntries.map((entry, idx) => (
                        <text key={`date-${idx}`} x={40 + idx * pointSpacing} y="180" textAnchor="middle" fontSize="9" fill="#666">
                          {entry.date.slice(5)}
                        </text>
                      ))}
                    </svg>
                  </div>
                </div>
              )}

              <div className="entries-section">
                <h2 className="entries-title">Energy Log</h2>
                <div className="entries-list">
                  {entries.map(entry => (
                    <div key={entry.id} className="entry-card">
                      <div className="entry-date">{entry.date}</div>
                      <div className="entry-data">
                        <div className="entry-item">
                          <span className="entry-label">Electricity:</span>
                          <span className="entry-value">{entry.electricity || '—'} kWh</span>
                        </div>
                        <div className="entry-item">
                          <span className="entry-label">Gas:</span>
                          <span className="entry-value">{entry.gas || '—'} m³</span>
                        </div>
                        <div className="entry-item">
                          <span className="entry-label">Water:</span>
                          <span className="entry-value">{entry.water || '—'} m³</span>
                        </div>
                      </div>
                      <button 
                        className="delete-btn"
                        onClick={() => handleDeleteEntry(entry.id)}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {entries.length === 0 && (
            <div className="empty-state">
              <p>No entries yet. Start tracking your energy usage by adding your first entry above.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
