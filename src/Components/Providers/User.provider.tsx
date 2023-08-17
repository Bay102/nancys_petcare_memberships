import { createContext, useContext, useEffect, useState } from 'react';
import { UserContextTypes } from '../../types';
import { User } from '@supabase/supabase-js';
import { UserData, getUserData } from '../../Api/get-user-data';
import { UsersDogs, getUsersDogs } from '../../Api/get-users-dogs';
import { supabase } from '../../supabase.config';
import { toast } from 'react-toastify';

const UserContext = createContext({} as UserContextTypes);

export const UserProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [usersDogs, setUsersDogs] = useState<UsersDogs[] | null>(null);

  const [auth, setAuth] = useState(false);

  const signOut = () => {
    supabase.auth.signOut();
    toast.success('Logged Out ✅')
  }

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      const { user: currentUser } = data;
      setUser(currentUser ?? undefined);
      // setLoading(false);
    };
    getUser();

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setUser(session?.user);
        setAuth(true);
      } else if (event === 'SIGNED_OUT') {
        setUser(undefined);
        setAuth(false);
      }
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  console.log(user);

  useEffect(() => {
    async function fetchUserData() {
      if (user) {
        const usersData = await getUserData(user.id);
        setUserData(usersData[0]);
      }
    }
    fetchUserData();
  }, [user]);

  useEffect(() => {
    async function fetchUsersDogs() {
      if (user) {
        const usersDogs = await getUsersDogs(user.id);
        setUsersDogs(usersDogs);
      }
    }
    fetchUsersDogs();
  }, [user]);

  return (
    <UserContext.Provider value={{ auth, user, setUser, userData, signOut ,usersDogs }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserProvider = () => useContext(UserContext);
