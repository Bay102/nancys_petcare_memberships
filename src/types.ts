/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '@supabase/supabase-js';
import { UsersDogs } from './Api/get-users-dogs';

export type AppContextTypes = {
  component: string;
  setComponent: React.Dispatch<React.SetStateAction<string>>;
};

export type LoginTypes = {
  [key: string]: string;
};

export type UserDataType = {
  id: string;
  first_name: any;
  last_name: any;
  member_status?: boolean;
  phone?: string;
  role: 'client' | 'admin';
};

export type UserContextTypes = {
  admin: boolean;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  userData: UserDataType | null;
  signOut: any;
  usersDogs: UsersDogs[] | null;
};
