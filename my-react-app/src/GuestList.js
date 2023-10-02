import React, { useEffect, useState } from 'react';
import { db } from './FirebaseConfig';
import { collection, getDocs, doc, deleteDoc, onSnapshot } from 'firebase/firestore';

const GuestList = () => {
  const [guests, setGuests] = useState([]);

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

  const handleDelete = async (id) => {
    const guestRef = doc(db, 'guests', id);
    await deleteDoc(guestRef);
    setGuests(guests.filter(guest => guest.id !== id));
  };

  return (
    <div>
      <h2>All Reserved Guests</h2>
      <ul>
        {guests.map((guest, index) => (
          <li key={index}>
            <span>Id: {guest.id}, </span>
            <span>Name: {guest.name}, </span>
            <span>Email: {guest.email}, </span>
            <span>Phone Number: {guest.phoneNumber}, </span>
            <span>Transportation: {guest.transportation}, </span>
            <span>Age: {guest.age} </span>
            <button onClick={() => handleDelete(guest.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GuestList;
