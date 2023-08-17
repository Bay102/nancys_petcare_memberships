/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '@supabase/supabase-js';
import { UserData } from './Api/get-user-data';
import { UsersDogs } from './Api/get-users-dogs';

export type AppContextTypes = {
  component: string;
  setComponent: React.Dispatch<React.SetStateAction<string>>;
};

export type UserContextTypes = {
  auth: boolean;
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  userData: UserData | null;
  signOut: any;
  usersDogs: UsersDogs[] | null;
  // setUserData: React.Dispatch<React.SetStateAction<UserData[] | null>>;
};

export type LoginTypes = {
  [key: string]: string;
};
