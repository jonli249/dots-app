// components/auth/SignUpForm.tsx

import React, { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';

function SignUpForm() {
  const { data: session } = useSession();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      // Use the signIn function with the 'credentials' provider
      // to create a new user account
      const result = await signIn('credentials', {
        email,
        password,
        name, // Include the user's name
        redirect: false, // Prevent automatic redirection
      });

      // Check if the signup was successful
      if (result?.error) {
        console.error('Signup failed:', result.error);
        // Handle the error (e.g., display an error message)
      } else {
        // Signup was successful
        // You can choose to redirect to the dashboard or another page here
        // For example, redirect to the dashboard:
        window.location.href = '/settings';
      }
    } catch (error) {
      console.error('Signup error:', error);
      // Handle other errors (e.g., network errors)
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {session ? (
        <p>Welcome, {session.user.name}!</p>
      ) : (
        <>
          <p>Please sign up to create your account.</p>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSignUp}>Sign Up</button>
        </>
      )}
    </div>
  );
}

export default SignUpForm;
