import React, { useState } from 'react';
import { useRouter } from 'next/router';
import useAuth from '../../utils/useAuth';
import { Alert, AlertIcon, AlertDescription, AlertTitle } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import Link from 'next/link';

function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('Incorrect email or password. Please try again.');
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        {loginError && (
          <Alert status="error" mb={4}>
            <AlertIcon />
            <AlertTitle mr={2}>Error</AlertTitle>
            <AlertDescription>{loginError}</AlertDescription>
          </Alert>
        )}
        <div className="mb-4 mt-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <Button
            onClick={handleLogin}
            colorScheme="blue"
            size="md"
            width="full"
            height="48px"
            borderRadius="md"
            _hover={{ bg: 'blue.600' }}
          >
            Log In
          </Button>
        </div>
        <p className="text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <Link href="/signup" passHref>
            <a className="text-blue-500">Sign Up</a>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
