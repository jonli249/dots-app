// components/UserProfile.tsx
import React from 'react';

interface UserProfileProps {
  user: {
    id: string;
  };
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const userId = user.id;

  return (
    <div>
      <h2>User Profile</h2>
      <p>ID: {userId}</p>
      {/* Add more user-related information as needed */}
    </div>
  );
};

export default UserProfile;
