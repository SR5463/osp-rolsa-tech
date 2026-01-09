import { useState, useEffect } from 'react';
import './styles.css';

export default function ConsultationBooking() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    service_type: '',
    date: '',
    time: '',
    address: '',
    notes: ''
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      fetchUserData(token);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/user', {
        method: 'GET',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const data = await response.json();
        setFormData(prev => ({
          ...prev,
          full_name: data.full_name || '',
          email: data.email || ''
        }));
      }
    } catch (err) {
      console.error('Error fetching user data:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceSelect = (service) => {
    setFormData(prev => ({
      ...prev,
      service_type: service
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!isAuthenticated) {
      setError('Please sign in to book a consultation');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/consultations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to schedule consultation');
        return;
      }

      setSuccess(true);
      setFormData({
        full_name: formData.full_name,
        email: formData.email,
        phone: '',
        service_type: '',
        date: '',
        time: '',
        address: '',
        notes: ''
      });
    } catch (err) {
      setError('Connection error. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="consultation-container">
      <main className="main-content">
        <h1 className="main-title">Schedule a Consultation</h1>
        <p className="subtitle">Book a free consultation with our energy experts</p>

        {error && <div className="consultation-error">{error}</div>}
        {success && <div className="consultation-success">Consultation scheduled successfully!</div>}

        <section className="form-section">
          <h2 className="section-title">Personal Information</h2>
          
          <div className="two-column-row">
            <div className="form-group">
              <label>Full name:</label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleInputChange}
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="input-field"
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label>Phone number:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="input-field"
            />
          </div>
        </section>

        <section className="form-section">
          <h2 className="section-title">Service Type</h2>
          
          <div className="service-options">
            <div 
              className={`service-card ${formData.service_type === 'solar' ? 'selected' : ''}`}
              onClick={() => handleServiceSelect('solar')}
            >
              <p className="service-title">Solar panels</p>
              <p className="service-description">Installation & Maintenance</p>
            </div>
            <div 
              className={`service-card ${formData.service_type === 'ev' ? 'selected' : ''}`}
              onClick={() => handleServiceSelect('ev')}
            >
              <p className="service-title">EV Charging</p>
              <p className="service-description">Charging station setup</p>
            </div>
            <div 
              className={`service-card ${formData.service_type === 'smart' ? 'selected' : ''}`}
              onClick={() => handleServiceSelect('smart')}
            >
              <p className="service-title">Smart Home</p>
              <p className="service-description">Energy Management</p>
            </div>
          </div>
        </section>

        <section className="form-section">
          <h2 className="section-title">Preferred Date & Time</h2>
          
          <div className="two-column-row">
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                min={today}
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label>Time:</label>
              <select
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className="input-field"
              >
                <option value="">Select time</option>
                <option value="09:00">09:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="14:00">02:00 PM</option>
                <option value="15:00">03:00 PM</option>
                <option value="16:00">04:00 PM</option>
              </select>
            </div>
          </div>
        </section>

        <section className="form-section">
          <div className="form-group full-width">
            <label>Property Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="1 Sutherland St, Pimlico, London SW1V 4LD"
              className="input-field"
            />
          </div>
        </section>

        <section className="form-section">
          <div className="form-group full-width">
            <label>Additional Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Any specific requirements or questions?"
              className="input-field textarea"
            />
          </div>
        </section>

        <section className="submit-section">
          {!isAuthenticated && (
            <div className="cta-box">
              <p>
                <a href="#" className="cta-link">Create an account</a>
                {` to manage your consultations and track your energy savings.`}
              </p>
            </div>
          )}
          <button className="submit-button" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Scheduling...' : 'Schedule Consultation'}
          </button>
        </section>
      </main>
    </div>
  );
}
