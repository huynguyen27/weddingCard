import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase/FirebaseConfig';
import GuestInvitation from './GuestInvitation.js';
import CountdownTimer from './CountdownTimer.js';
import WeddingMap from './WeddingMap.js';

const GuestInfo = () => {
  const { guestId } = useParams();
  const [guestInfo, setGuestInfo] = useState(null);

  useEffect(() => {
    const fetchGuestInfo = async () => {
      const docRef = doc(db, 'guests', guestId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setGuestInfo(docSnap.data());
      } else {
        console.log('No such document!');
      }
    };

    fetchGuestInfo();
  }, [guestId]);

  useEffect(() => {
    // Set the document title to the guest's name
    document.title = guestInfo ? `Thân mời ${guestInfo.terms_of_address} ${guestInfo.name}` : 'Wedding Cherish';
  }, [guestInfo]);

  return (
    <div>
      {guestInfo ? (
        <>
          <GuestInvitation />
          <CountdownTimer />
          <WeddingMap />

        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default GuestInfo;
