import React from "react";
import useAuth from "../utils/useAuth"; // Import the useAuth hook
import UserProfile from "../components/UserProfile"; // Import the UserProfile component
import Navbar from "../components/main/navbar";
import PageSEO from "../components/icons/PageSEO";

const SettingsPage: React.FC = () => {
  const { session, isAuthenticated, logout } = useAuth(); // Use the hook to get user session and isAuthenticated method
  return (
    <>
      <PageSEO title="Settings" />
      <Navbar />
      <h1>Settings</h1>
      {session !== null ? (
        <>
          <UserProfile user={session} />
          <button onClick={logout}>Logout</button> {/* Logout button */}
        </>
      ) : (
        <p>Please sign in to view your settings.</p>
      )}
    </>
  );
};

export default SettingsPage;
