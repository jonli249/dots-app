// utils/useAuth.ts
/*import { useEffect, useState } from 'react';
import * as Realm from 'realm-web';

const realmAppId = 'dotstester-bpjzg'; // Define your MongoDB Realm App ID

export default function useAuth() {
  const [app, setApp] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize the Realm app
    const realmApp = Realm.getApp(realmAppId);
    setApp(realmApp);

    // Check for an existing user session
    const currentUser = realmApp.currentUser;
    if (currentUser) {
      setSession(currentUser);
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Authenticate the user using email and password
      const credentials = Realm.Credentials.emailPassword(email, password);
      const user = await app.logIn(credentials);

      if (user) {
        setSession(user);
        return user;
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error; // Handle or re-throw the error as needed
    }
  };

  const logout = async () => {
    try {
      await app.currentUser?.logOut();
      setSession(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error; // Handle or re-throw the error as needed
    }
  };

  return { app, session, loading, login, logout };
}
*/