// Importing essential libraries and modules
import React, { useState } from 'react';  // Importing React and the useState hook
import './css/RSVPForm.css';              // Importing custom CSS for styling the component
import { db } from './FirebaseConfig';    // Importing the Firestore database instance
import { addDoc, collection } from 'firebase/firestore';  // Firestore methods for collection and adding documents

// import { useNavigate } from "react-router-dom";

const RSVPForm = () => {
  // State Management
  const [formData, setFormData] = useState({ // State to store form data
    name: '',
    terms_of_address: '',
    custom_terms_of_address: '',
  });
  const [formErrors, setFormErrors] = useState({});  // State to store form errors
  const [showCustomField, setShowCustomField] = useState(false);  // State to toggle visibility of custom field

  // Firestore Collection Reference
  const guestsCollectionRef = collection(db, 'guests');  // Reference to 'guests' collection in Firestore

  // Event Handler for form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;  // Destructuring name and value from the event target
    if (name === "terms_of_address") {  // If the name of the input field is 'terms_of_address'
      setShowCustomField(value === "others");  // Show custom field if the value is "others"
    }
    setFormData({  // Update formData state
      ...formData,
      [name]: value,
    });
  };

  // Function to validate form data
  const validateForm = () => {
    let isValid = true;
    let errors = {};

    // Name validation
    if (formData.name.length < 2 || formData.name.length > 100) {
      isValid = false;
      errors.name = "Name must be between 2 and 100 characters";
    }

    // Terms of address validation
    if (formData.terms_of_address === "" || (formData.terms_of_address === "others" && formData.custom_terms_of_address.length < 2)) {
      isValid = false;
      errors.terms_of_address = "Please select a term of address";
    }

    // Custom terms of address validation
    if (formData.terms_of_address === "others" && (formData.custom_terms_of_address.length < 2 || formData.custom_terms_of_address.length > 100)) {
      isValid = false;
      errors.custom_terms_of_address = "Custom term of address must be between 2 and 100 characters";
    }

    // Update formErrors state
    setFormErrors(errors);

    // Return validation result
    return isValid;
  };

  // Event Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent default form submission action

    // If the form data is valid    
    if (validateForm()) {
      let finalFormData = { ...formData };

      // If 'others' is selected, use the custom term of address.
      if (formData.terms_of_address === 'others') {
        finalFormData.terms_of_address = formData.custom_terms_of_address;
      }

      console.log('Final Form data submitted:', finalFormData); // Debugging line

      // Sending finalFormData to Firestore
      try {
        // Adding new document to Firestore
        await addDoc(guestsCollectionRef, finalFormData);
        console.log('Document successfully written!'); // Debugging line
      } catch (error) {
        console.error('Error writing document: ', error); // Error logging
      }
    }
  };

  // JSX Rendering
  return (
    // JSX layout for the form

    <div className="form-container">
      <h2>Gửi Thiệp Mời Cho Khách</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Tên:</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
          />
        </div>
        {formErrors.name && <span className="error-text">{formErrors.name}</span>}


        <div className="form-group">
          <label>Tên Xưng Hô:</label>
          <select name="terms_of_address" onChange={handleChange}>
            <option value="">Chọn</option>
            <option value="anh">Anh</option>
            <option value="chị">Chị</option>
            <option value="cô">Cô</option>
            <option value="gì">Gì</option>
            <option value="chú">Chú</option>
            <option value="bác">Bác</option>
            <option value="bạn">Bạn</option>
            <option value="others">Khác</option>
          </select>
        </div>
        {formErrors.terms_of_address && <span className="error-text">{formErrors.terms_of_address}</span>}

        {showCustomField && (
          <div className="form-group">
            <label>Tùy Chọn:</label>
            <input
              type="text"
              name="custom_terms_of_address"
              onChange={handleChange}
            />
            {formErrors.custom_terms_of_address && <span className="error-text">{formErrors.custom_terms_of_address}</span>}
          </div>
        )}
        <div className="form-group">
          <button type="submit">Gửi</button>
        </div>
      </form>
    </div>
  );
};

// Exporting the component to be used in other parts of the application
export default RSVPForm;
