// pages/index.tsx

import React from 'react';
import Link from 'next/link';

const HomePage: React.FC = () => {
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="text-center">

      <h1 className="text-3xl font-semibold">Welcome to Dots!</h1>
      <p>This is the homepage of your application.</p>
      <p>
        <Link href="/login" className="text-blue-500">
          Login
        </Link>{' '}
        to access your account.
      </p>
      <p> 
        Or  {' ' }
        <Link href='/signup' className="text-blue-500">
            Signup
        </Link>
      </p>
    </div>
    </div>
  );
};

export default HomePage;
