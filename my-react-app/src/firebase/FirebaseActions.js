// FirebaseActions.js

// Import necessary React hooks and Firebase Firestore functions
import { useState, useEffect } from 'react';
import { db } from './FirebaseConfig';
import { addDoc, collection, doc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';

// Custom React hook to fetch and manage guest data
export const useGuests = () => {
  // State variable to store the list of guests
  const [guests, setGuests] = useState([]);

  // Reference to the "guests" Firestore collection
  const guestsCollectionRef = collection(db, "guests");

  useEffect(() => {
    // Subscribe to real-time updates on the "guests" collection
    const unsubscribe = onSnapshot(guestsCollectionRef, (snapshot) => {
      // Map Firestore document data to an array of guests
      const updatedGuests = snapshot.docs.map((doc) => ({
        ...doc.data(), // Spread the document data into the guest object
        id: doc.id,     // Add the unique document ID to the guest object
      }));

      // Update the state with the new guest data
      setGuests(updatedGuests);
    });

    // Unsubscribe from the Firestore listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, [guestsCollectionRef]);

  // Return the list of guests to the component
  return guests;
};

// Function to create a new guest document in Firestore
export const createGuest = async (newGuest) => {
  // Reference to the "guests" Firestore collection
  const guestsCollectionRef = collection(db, "guests");

  // Add the new guest document to Firestore
  await addDoc(guestsCollectionRef, newGuest);
};

// Function to update an existing guest document in Firestore
export const updateGuest = async (guest) => {
  // Reference to the specific guest document in Firestore
  const guestDoc = doc(db, 'guests', guest.id);

  // Define the new fields to update (in this case, incrementing "age" by 1)
  const newFields = { age: Number(guest.age) + 1 };

  // Update the guest document in Firestore with the new fields
  await updateDoc(guestDoc, newFields);
};

// Function to delete a guest document from Firestore by its ID
export const deleteGuest = async (id) => {
  // Reference to the specific guest document in Firestore
  const guestDoc = doc(db, 'guests', id);

  // Delete the guest document from Firestore
  await deleteDoc(guestDoc);
};

export const usePassword = () => {
  const [passwordData, setPasswordData] = useState([]);
  const passwordsCollectionRef = collection(db, "passwords");

  useEffect(() => {
    const unsubscribe = onSnapshot(passwordsCollectionRef, (snapshot) => {
      if (!snapshot.empty) {
        const passwordDoc = snapshot.docs[0];
        setPasswordData({
          // id: passwordDoc.id,
          password: passwordDoc.data().password,
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, [passwordsCollectionRef]);

  return passwordData;
};

// Custom React hook to validate a password
export const usePasswordValidator = () => {
  const { password } = usePassword();

  const validatePassword = (enteredPassword) => enteredPassword === password;

  return validatePassword;
};