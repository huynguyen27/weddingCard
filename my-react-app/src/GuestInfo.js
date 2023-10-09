import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase/FirebaseConfig'; // Importing Firebase configuration
import GuestInvitation from './GuestInvitation.js'; // Importing a GuestInvitation component
import CountdownTimer from './CountdownTimer.js'; // Importing a CountdownTimer component
import WeddingMap from './WeddingMap.js'; // Importing a WeddingMap component

const GuestInfo = () => {
  // Retrieve the guestId from the URL parameters using react-router-dom
  const { guestId } = useParams();

  // State to hold the guest information
  const [guestInfo, setGuestInfo] = useState(null);

  useEffect(() => {
    // Function to fetch guest information from Firebase Firestore
    const fetchGuestInfo = async () => {
      // Create a reference to the guest document in Firestore
      const docRef = doc(db, 'guests', guestId);

      // Retrieve the document snapshot from Firestore
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // If the document exists, set the guestInfo state with its data
        setGuestInfo(docSnap.data());
      } else {
        console.log('No such document!');
      }
    };

    // Call the function to fetch guest information when the component mounts or when guestId changes
    fetchGuestInfo();
  }, [guestId]);

  useEffect(() => {
    // Set the document title to the guest's name when guestInfo is available
    document.title = guestInfo ? `Thân mời ${guestInfo.terms_of_address} ${guestInfo.name}` : 'Wedding Cherish';
  }, [guestInfo]);

  return (
    <div>
      {guestInfo ? (
        // Render GuestInvitation, CountdownTimer, and WeddingMap components when guestInfo is available
        <>
          <GuestInvitation />
          <CountdownTimer />
          <WeddingMap />
        </>
      ) : (
        // Display "Loading..." when guestInfo is still being fetched
        <p>Loading...</p>
      )}
    </div>
  );
};

export default GuestInfo;
