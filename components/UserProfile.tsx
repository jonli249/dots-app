// components/UserProfile.tsx
import React from 'react';

interface UserProfileProps {
  user: {
    _profile: {
      data: {
        email: string;
        // Add other user properties as needed
      }, 
    };
    id: string;
  };
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const userData = user._profile.data;
  const userId = user.id;

  return (
    <div>
      <h2>User Profile</h2>
      <p>Email: {userData.email}</p>
      <p>ID: userId</p>
      {/* Add more user-related information as needed */}
    </div>
  );
};

export default UserProfile;
