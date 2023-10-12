import React, { useState } from 'react';
import RSVPForm from './RSVPForm';
import GuestList from './GuestList';
import NavigationBar from './NavigationBar';
import Login from './Login';

const Main = () => {
  const [isLoginSuccessful, setLoginStatus] = useState(false);

  const handleLogin = (isSuccessful) => {
    // This function is called from the Login component when login is successful
    setLoginStatus(isSuccessful);
  };

  return (
    <div>
      {isLoginSuccessful ? (
        <div>
          <NavigationBar />
          <RSVPForm />
          <GuestList />
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default Main;
