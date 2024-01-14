import { useEffect, useState } from 'react';
import * as Realm from 'realm-web';
import { useRouter } from 'next/router';


// Define a user interface for Realm users
interface RealmUser {
  id: string;
  name?: string; 
  email?: string;
  company?: string
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
        };
        setSession(userObject);
        return user;
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const signup = async (name: string, email: string, password: string, company: string) => {
    try {
      if (!app) {
        throw new Error('Realm app is not initialized');
      }
  
      await app.emailPasswordAuth.registerUser({ email, password });
  
      // Log in the user
      const user = await login(email, password);
  
      if (user) {
        const pushdata = await user.callFunction('inituserdata', user.id, name, email, company);
        
        return user;
      } else {
        console.error('User not logged in after registration');
        // Handle error
        return null; // or throw an error if needed
      }
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  }
  

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
