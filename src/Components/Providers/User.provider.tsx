/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  ChangeEvent,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { UserContextTypes, UserDataType } from '../../types';
import { Session } from '@supabase/supabase-js';
import { DogData, getUsersDogs } from '../../Api/get-users-dogs';
import { supabase } from '../../supabase.config';
import { toast } from 'react-toastify';
import { getUserData } from '../../Api/get-user-data';

const UserContext = createContext({} as UserContextTypes);

export const UserProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<Session | null>(null);
  const [userData, setUserData] = useState<UserDataType | null>(null);
  const [usersDogs, setUsersDogs] = useState<DogData[] | null>(null);
  const [admin, setAdmin] = useState(false);

  const [, setLoading] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState(
    userData ? userData.avatar_url : null
  );

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session);
    });
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [user]);

  useEffect(() => {
    if (userData?.role === 'admin') {
      setAdmin(true);
    }
  }, [userData]);

  useEffect(() => {
    fetchDogs();
  }, [userData]);

  const fetchUserData = async () => {
    if (user) {
      await getUserData(user?.user.id).then((data) =>
        setUserData(data || null)
      );
    }
  };

  const fetchDogs = async () => {
    if (!admin) {
      try {
        const dogsData = await getUsersDogs(userData?.id);
        setUsersDogs(dogsData || null);
        console.log(usersDogs);
      } catch (e) {
        toast.error(`${e}`);
      }
    }
  };

  async function uploadAvatar(
    event: ChangeEvent<HTMLInputElement>,
    avatarUrl: string,
    SB_table: string
  ) {
    event.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from(SB_table)
      .update({ avatar_url: avatarUrl })
      .eq('user_id', user?.user.id);

    if (error) {
      alert(error.message);
    } else {
      setAvatarUrl(avatarUrl);
    }
    setLoading(false);
  }

  const signOut = async () => {
    setUser(null);
    setUserData(null);
    setUsersDogs(null);
    setAdmin(false);
    setAvatarUrl(null);
    await supabase.auth.signOut();
    toast.success('Logged Out ✅');
  };

  return (
    <UserContext.Provider
      value={{
        admin,
        user,
        setUser,
        userData,
        signOut,
        usersDogs,
        fetchUserData,
        fetchDogs,
        avatarUrl,
        uploadAvatar,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserProvider = () => useContext(UserContext);
