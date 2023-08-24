/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '@supabase/supabase-js';
import { UsersDogs } from './Api/get-users-dogs';

export type AppContextTypes = {
  component: string;
  setComponent: React.Dispatch<React.SetStateAction<string>>;
};

export type UserContextTypes = {
  admin: boolean;
  auth: boolean;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  userData: UserData | null;
  signOut: any;
  usersDogs: UsersDogs[] | null;
  // setUserData: React.Dispatch<React.SetStateAction<UserData[] | null>>;
};

export type LoginTypes = {
  [key: string]: string;
};

export type UserData = {
  id: string;
  first_name: any;
  last_name: any;
  member_status?: boolean;
  phone?: string;
};
