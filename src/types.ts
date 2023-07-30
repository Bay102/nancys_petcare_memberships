import { User } from "@supabase/supabase-js";

export type AppContextTypes = {
  component: string;
  setComponent: React.Dispatch<React.SetStateAction<string>>;
};

export type UserContextTypes = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>
} 

export type LoginTypes = {
  [key: string] : string
}