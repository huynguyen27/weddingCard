import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './FirebaseConfig';

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

  return (
    <div>
      {guestInfo ? (
        <>
          <h2>Guest Information</h2>
          <p>Name: {guestInfo.name}</p>
          <p>Email: {guestInfo.email}</p>
          <p>Phone: {guestInfo.phoneNumber}</p>
          <p>Transportation: {guestInfo.transportation}</p>
          <p>Age: {guestInfo.age}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default GuestInfo;
