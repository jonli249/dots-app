// components/AuthenticationButton.tsx

import React from 'react';
import useAuth from '../../utils/useAuth';

function AuthenticationButton() {
  const { isAuthenticated, signInUser, signOutUser } = useAuth();

  return (
    <div>
      {isAuthenticated ? (
        <button onClick={signOutUser}>Sign Out</button>
      ) : (
        <button onClick={signInUser}>Sign In</button>
      )}
    </div>
  );
}

export default AuthenticationButton;
