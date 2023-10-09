// FirebaseActions.js
import { useState, useEffect } from 'react';
import { db } from './FirebaseConfig';
import { addDoc, collection, doc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';

export const useGuests = () => {
  const [guests, setGuests] = useState([]);
  const guestsCollectionRef = collection(db, "guests");

  useEffect(() => {
    const unsubscribe = onSnapshot(guestsCollectionRef, (snapshot) => {
      const updatedGuests = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setGuests(updatedGuests);
    });

    return () => {
      unsubscribe();
    };
  }, [guestsCollectionRef]);

  return guests;
};

export const createGuest = async (newGuest) => {
  const guestsCollectionRef = collection(db, "guests");
  await addDoc(guestsCollectionRef, newGuest);
};

export const updateGuest = async (guest) => {
  const guestDoc = doc(db, 'guests', guest.id);
  const newFields = { age: Number(guest.age) + 1 };
  await updateDoc(guestDoc, newFields);
};

export const deleteGuest = async (id) => {
  const guestDoc = doc(db, 'guests', id);
  await deleteDoc(guestDoc);
};
