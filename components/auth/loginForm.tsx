// LoginForm.js or LoginForm.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router'; // Import the useRouter hook
import useAuth from '../../utils/useAuth'; // Import the useAuth hook

function LoginForm() {
  const router = useRouter(); // Initialize the useRouter hook
  const { login } = useAuth(); // Use the hook

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await login(email, password); // Call the login function from useAuth

      // Redirect to the settings page upon successful login
      router.push('/settings');
    } catch (error) {
      console.error('Login error:', error);
      // Handle the login failure (e.g., display an error message)
    }
  };

  return (
    <div>
      <h2>Login</h2>
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
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
}

export default LoginForm;
