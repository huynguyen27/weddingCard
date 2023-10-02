import React, { useState } from 'react';
import './css/RSVPForm.css';
import { db } from './FirebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";

const RSVPForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    transportation: '',
    age: 0,
  });

  const guestsCollectionRef = collection(db, 'guests');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // Sending formData to Firestore
    try {
      const docRef = await addDoc(guestsCollectionRef, {
        ...formData,
        age: Number(formData.age),
      });
      console.log('Document successfully written!');
      const guestId = docRef.id; // This is the newly generated ID
      console.log("Generated Guest ID:", guestId);  // Debugging line
      navigate(`/${guestId}`);
    } catch (error) {
      console.error('Error writing document: ', error);
    }
  };

  return (
    <div className="form-container">
      <h2>RSVP</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Age:</label>
          <input
            type="number"
            name="age"
            onChange={handleChange}
          />
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
