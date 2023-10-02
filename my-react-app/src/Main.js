import React from 'react';
import RSVPForm from './RSVPForm';
import GuestList from './GuestList';

import CountdownTimer from './CountdownTimer';
import WeddingMap from './WeddingMap';

const Main = () => {
  return (
    <div>
      <RSVPForm />
      <GuestList />
      {/* <CountdownTimer/>
      <WeddingMap/> */}
    </div>
  );
};

export default Main;
