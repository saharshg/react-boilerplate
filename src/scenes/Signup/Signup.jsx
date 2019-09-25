import React from 'react';
import OwnerFormContainer from './OwnerForm/OwnerForm';

const Signup = () => {
  const { location } = window;
  if (location.pathname === '/signup/owner') {
    return (
      <OwnerFormContainer />
    );
  }
  return <>Buyer</>;
};

export default Signup;
