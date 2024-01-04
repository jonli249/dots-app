// pages/index.tsx

import React from 'react';
import Link from 'next/link';

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Welcome to Dots!</h1>
      <p>This is the homepage of your application.</p>
      <p>
        <Link href="/login">
          Login
        </Link>{' '}
        to access your account.
      </p>
      <p> 
        Or  {' ' }
        <Link href='/signup'>
            Signup
        </Link>
      </p>
    </div>
  );
};

export default HomePage;
