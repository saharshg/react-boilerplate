import React from 'react';
import OwnerFormContainer from './OwnerForm/OwnerForm';
import BuyerFormContainer from './BuyerForm/BuyerForm';

const Signup = () => {
  const { location } = window;
  if (location.pathname === '/signup/owner') {
    return (
      <OwnerFormContainer />
    );
  }

  if (location.pathname === '/signup/buyer') {
    return (
      <BuyerFormContainer />
    );
  }
  return 'Login again';
};

export default Signup;
