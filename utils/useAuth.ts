import { useEffect, useState } from 'react';
import * as Realm from 'realm-web';
import { useRouter } from 'next/router';

// Define a user interface for Realm users
interface RealmUser {
  id: string;
  // Add other user properties as needed
}

const realmAppId = 'dotstester-bpjzg';

export default function useAuth() {
  const [app, setApp] = useState<Realm.App | null>(null);
  const [session, setSession] = useState<RealmUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const realmApp = Realm.getApp(realmAppId);
    setApp(realmApp);

    const currentUser = realmApp.currentUser;
    if (currentUser) {
      const userObject: RealmUser = {
        id: currentUser.id,
        // Add other user properties as needed
      };
      setSession(userObject);
    }

    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      if (!app) {
        throw new Error('Realm app is not initialized');
      }
  
      const credentials = Realm.Credentials.emailPassword(email, password);
      const user = await app.logIn(credentials);
  
      if (user) {
        const userObject: RealmUser = {
          id: user.id,
          // Add other user properties as needed
        };
        setSession(userObject);
        return user;
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      if (!app) {
        throw new Error('Realm app is not initialized');
      }
  
      // Register a new user with the provided email and password
      await app.emailPasswordAuth.registerUser({
        email,
        password,
      });
  
      // Optionally, you can log in the user after signup
      await login(email, password);
  
      return null; // Return null if signup is successful
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };
  

  const logout = async () => {
    try {
      if (app) {
        await app.currentUser?.logOut();
      }
      router.push('/');
      setSession(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };
  const isAuthenticated = () => {
    return !!session;
  };

  return { app, session, loading, login, logout, signup,  isAuthenticated };
}
