import { createContext, useContext, useEffect, useState } from 'react';
import { UserContextTypes } from '../../types';
import { User } from '@supabase/supabase-js';
import { UserData, getUserData } from '../../Api/get-user-data';
import { UsersDogs, getUsersDogs } from '../../Api/get-users-dogs';
import { supabase } from '../../supabase.config';
import { toast } from 'react-toastify';

const UserContext = createContext({} as UserContextTypes);

export const UserProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [usersDogs, setUsersDogs] = useState<UsersDogs[] | null>(null);
  const [auth, setAuth] = useState(false);

  const [admin, setAdmin] = useState(false);

  const isAdmin = () => {
    user?.email === 'nancylbay@hotmail.com' ? setAdmin(true) : setAdmin(false);
  };

  const signOut = () => {
    supabase.auth.signOut();
    setUser(null);
    toast.success('Logged Out ✅');
  };

  useEffect(() => {
    isAdmin();
  }, [user]);

  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.auth.getUser();
      const { user: currentUser } = data;
      setUser(currentUser ?? null);
      // setLoading(false);
    }

    getUser();
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setUser(session?.user ? session.user : null);
        setAuth(true);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setAuth(false);
      }
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    async function fetchUserData() {
      if (user) {
        const usersData = await getUserData(user.id);
        setUserData(usersData[0]);
        console.log(userData);
      }
    }
    fetchUserData();
  }, [user]);

  useEffect(() => {
    async function fetchUsersDogs() {
      if (userData) {
        const usersDogs = await getUsersDogs(userData.id);
        setUsersDogs(usersDogs);
        console.log(usersDogs);
      }
    }
    fetchUsersDogs();
  }, [user]);

  return (
    <UserContext.Provider
      value={{ admin, auth, user, setUser, userData, signOut, usersDogs }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserProvider = () => useContext(UserContext);
