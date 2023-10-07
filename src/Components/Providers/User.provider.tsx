import { createContext, useContext, useEffect, useState } from 'react';
import { UserContextTypes, UserDataType } from '../../types';
import { User } from '@supabase/supabase-js';
import { UsersDogs, getUsersDogs } from '../../Api/get-users-dogs';
import { supabase } from '../../supabase.config';
import { toast } from 'react-toastify';
import { getUserData } from '../../Api/get-user-data';

const UserContext = createContext({} as UserContextTypes);

export const UserProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserDataType | null>(null);
  const [usersDogs, setUsersDogs] = useState<UsersDogs[] | null>(null);
  const [admin, setAdmin] = useState(false);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    async function fetchUserData() {
      if (user && auth) {
        const usersData = await getUserData(user.id);
        setUserData(usersData[0]);

        if (usersData[0]?.role === 'admin') {
          setAdmin(true);
        }

        if (!admin) {
          const usersDogs = await getUsersDogs(usersData[0]?.id);
          setUsersDogs(usersDogs || null);
        }
      }
    }
    fetchUserData();
  }, [user, admin, auth]);

  // useEffect(() => {
  //   async function setSession() {
  //     const session = await supabase.auth.getSession();
  //     setUser(session.data.session?.user ?? null);
  //     setAuth(true);
  //   }
  //   setSession();
  // }, [auth]);

  const signOut = () => {
    setUser(null);
    setAuth(false);
    setUserData(null);
    setUsersDogs(null);
    setAdmin(false);
    supabase.auth.signOut();

    toast.success('Logged Out ✅');
  };

  return (
    <UserContext.Provider
      value={{ admin, setAuth, user, setUser, userData, signOut, usersDogs }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserProvider = () => useContext(UserContext);
