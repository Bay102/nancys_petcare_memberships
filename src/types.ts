/* eslint-disable @typescript-eslint/no-explicit-any */
import { Session } from '@supabase/supabase-js';
import { DogData } from './Api/get-users-dogs';

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
  avatar_url?: string | null;
};

export type UserContextTypes = {
  admin: boolean;
  user: Session | null;
  setUser: React.Dispatch<React.SetStateAction<Session | null>>;
  userData: UserDataType | null;
  signOut: () => Promise<void>;
  usersDogs: DogData[] | null;
  fetchDogs: () => Promise<void>;
  fetchUserData: () => Promise<void>;
  avatarUrl: string | null | undefined;
  uploadAvatar: (
    event: any,
    avatarUrl: string,
    SB_table: string
  ) => Promise<void>;
};
