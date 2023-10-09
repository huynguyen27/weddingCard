import React from 'react';
import RSVPForm from './RSVPForm';
import GuestList from './GuestList';
import NavigationBar from './NavigationBar';

const Main = () => {
  return (
    <div>
      <NavigationBar />
      <RSVPForm />
      <GuestList />

    </div>
  );
};

export default Main;
