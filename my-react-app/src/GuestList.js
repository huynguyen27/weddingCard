import React, { useState, useEffect } from 'react';
import { db } from './firebase/FirebaseConfig';
import { collection, doc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import './css/GuestList.css';


const GuestList = () => {
  const [guests, setGuests] = useState([]);
  const [copySuccess, setCopySuccess] = useState({ status: '', id: null });
  // State to handle copy status

  useEffect(() => {
    const fetchGuests = () => {
      const guestsCollection = collection(db, 'guests');
      const unsubscribe = onSnapshot(guestsCollection, snapshot => {
        const guestList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGuests(guestList);
      });

      // Cleanup function
      return () => unsubscribe();
    };

    fetchGuests();
  }, []);

  useEffect(() => {
    if (copySuccess) {
      setTimeout(() => setCopySuccess(''), 3000); // Reset after 3 seconds
    }
  }, [copySuccess]);

  const handleDelete = async (id) => {
    const guestRef = doc(db, 'guests', id);
    await deleteDoc(guestRef);
    setGuests(guests.filter(guest => guest.id !== id));
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess({ status: 'Copied!', id });
    }).catch((err) => {
      setCopySuccess({ status: 'Failed to copy text', id });
    });
  };
  return (
    <div>
     <div className="center-heading">         <h2>Guest List</h2>

 </div>

      
      <table className='custom-table'>
        <thead>
          <tr>
            <th>Tên Khách</th>
            <th>Link</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((guest, index) => (
            <tr key={index}>
              <td>{guest.terms_of_address} {guest.name}</td>
              <td>
                <Link to={`/guest/${guest.id}`}>
                  {window.location.origin}/guest/{guest.id}
                </Link>
              </td>
              <td>
                <button className='copy-button'onClick={() => copyToClipboard(`${window.location.origin}/guest/${guest.id}`, guest.id)}>
                  Copy
                </button>
                {copySuccess.status && copySuccess.id === guest.id && <span className="copy-status">{copySuccess.status}</span>}
                <button className='delete-button' onClick={() => handleDelete(guest.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GuestList;
