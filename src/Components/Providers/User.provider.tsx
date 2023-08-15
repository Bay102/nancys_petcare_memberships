import { createContext, useContext, useEffect, useState } from 'react';
import { UserContextTypes } from '../../types';
import { User } from '@supabase/supabase-js';
import { UserData, getUserData } from '../../Api/get-user-data';
import { UsersDogs, getUsersDogs } from '../../Api/get-users-dogs';

const UserContext = createContext({} as UserContextTypes);

export const UserProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [usersDogs, setUsersDogs] = useState<UsersDogs[] | null>(null);

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
    <UserContext.Provider value={{ user, setUser, userData, usersDogs }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserProvider = () => useContext(UserContext);
