import React, { useState } from 'react';
import './RSVPForm.css';

const RSVPForm = () => {
  const [formData, setFormData] = useState({
    family: '',
    numberOfGuests: 0,
    guestNames: '',
    transportation: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // You can send formData to your server here
  };

  return (
    <div className="form-container">
      <h2>RSVP</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>From the:</label>
          <select name="family" onChange={handleChange}>
            <option value="">Select</option>
            <option value="bride">Bride's Family</option>
            <option value="groom">Groom's Family</option>
          </select>
        </div>

        <div className="form-group">
          <label>Number of Guests:</label>
          <input
            type="number"
            name="numberOfGuests"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Name of Guests:</label>
          <textarea
            name="guestNames"
            rows="4"
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="form-group">
          <label>Means of Transportation:</label>
          <select name="transportation" onChange={handleChange}>
            <option value="">Select</option>
            <option value="car">Car</option>
            <option value="public">Public Transport</option>
            <option value="rideShare">Ride Share</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  );
};

export default RSVPForm;
