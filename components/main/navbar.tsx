import React from 'react';
import Link from 'next/link';
import useAuth from '../../utils/useAuth'; // Import the useAuth hook

function Navbar() {
  const { logout, isAuthenticated } = useAuth(); // Use the useAuth hook

  return (
    <nav className="bg-grey-500 p-20 flex justify-between items-center">
      <div>
        <Link href="/" className="text-black text-2xl font-bold">
          Dots
        </Link>
      </div>
      <div>
        {isAuthenticated() && ( // Show the logout button if the user is authenticated
          <button
            onClick={logout}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;