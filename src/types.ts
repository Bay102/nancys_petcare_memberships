import { User } from '@supabase/supabase-js';
import { UserData } from './Api/get-user-data';
import { UsersDogs } from './Api/get-users-dogs';

export type AppContextTypes = {
  component: string;
  setComponent: React.Dispatch<React.SetStateAction<string>>;
};

export type UserContextTypes = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  userData: UserData | null;
  usersDogs: UsersDogs[] | null;
  // setUserData: React.Dispatch<React.SetStateAction<UserData[] | null>>;
};

export type LoginTypes = {
  [key: string]: string;
};
