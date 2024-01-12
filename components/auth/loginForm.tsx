// LoginForm.js or LoginForm.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import useAuth from '../../utils/useAuth';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from 'next/link';

function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null); // Initialize loginError as string | null


  const handleLogin = async () => {
    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setLoginError("Incorrect email or password. Please try again."); 
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        {loginError && ( // Display the alert if loginError is truthy
          <Alert  mb-4="true">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{loginError}</AlertDescription>
          </Alert>
        )}
        <div className="mb-4 mt-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-6">
          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Log In
          </button>
        </div>
        <p className="text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-blue-500">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
