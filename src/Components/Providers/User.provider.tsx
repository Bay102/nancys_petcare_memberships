/* eslint-disable react-hooks/exhaustive-deps */
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
    fetchUserData();
  }, [user, auth]);

  useEffect(() => {
    fetchDogs();
  }, [userData]);

  useEffect(() => {
    async function retrieveUser() {
      if (!user) {
        const { data } = await supabase.auth.getUser();
        const { user: currentUser } = data;
        setUser(currentUser ?? null);
        setAuth(true);
      }
    }
    retrieveUser();
  }, []);

  const fetchUserData = async () => {
    if (user && auth) {
      const usersData = await getUserData(user?.id);
      setUserData(usersData || null);
      if (usersData.role === 'admin') {
        setAdmin(true);
      }
    }
  };

  const fetchDogs = async () => {
    if (!admin) {
      const dogsData = await getUsersDogs(userData?.id);
      setUsersDogs(dogsData || null);
    }
  };

  const signOut = async () => {
    setUser(null);
    setAuth(false);
    setUserData(null);
    setUsersDogs(null);
    setAdmin(false);
    await supabase.auth.signOut();
    toast.success('Logged Out ✅');
    console.log(user);
  };

  return (
    <UserContext.Provider
      value={{
        admin,
        setAuth,
        user,
        setUser,
        userData,
        signOut,
        usersDogs,
        fetchUserData,
        fetchDogs,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserProvider = () => useContext(UserContext);
