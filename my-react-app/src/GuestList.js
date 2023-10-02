import React, { useState, useEffect } from 'react';
import { db } from './FirebaseConfig';
import { collection, doc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { Link } from 'react-router-dom';


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
      <h2>Tất Cả Các Khách</h2>
      <ul>
        {guests.map((guest, index) => (
          <li key={index}>
            <span>Tên Khách: {guest.name}, </span>
            <span>Xưng Hô: {guest.terms_of_address}, </span>
            {/* Updated Line: Wrap the guest id inside a Link component */}
            <Link to={`/${guest.id}`}>
              <span>Link</span>
            </Link>
            <span> {window.location.origin}/{guest.id}</span>
            <button onClick={() => copyToClipboard(`${window.location.origin}/${guest.id}`, guest.id)}>
              Copy
            </button>
            {copySuccess.status && copySuccess.id === guest.id && <span style={{ color: 'green' }}>{copySuccess.status}</span>}

            <button onClick={() => handleDelete(guest.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GuestList;
