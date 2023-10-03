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
          <h2>Thông Tin Khách Mời</h2>
          <p>Tên: {guestInfo.name}</p>
          <p>Xưng Hô: {guestInfo.terms_of_address}</p>
        </>
      ) : (
        <p>Đang tải...</p>
      )}
    </div>
  );
};

export default GuestInfo;
