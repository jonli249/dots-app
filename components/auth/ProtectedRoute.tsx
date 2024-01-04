// components/ProtectedRoute.tsx

import React from 'react';
import { useRouter } from 'next/router';
import useAuth from '../../utils/useAuth';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  if (!isAuthenticated) {
    // Redirect to the login page or any other appropriate action
    router.push('/login');
    return null;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
