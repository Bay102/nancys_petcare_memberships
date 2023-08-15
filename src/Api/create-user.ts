import { supabase } from '../supabase.config';
import { LoginTypes } from '../types';

export const createUser = async ({ email, password }: LoginTypes) => {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (!data.user) {
    throw new Error(`${error?.message}`);
  }

  if (error) {
    throw new Error(`${error?.message}`);
  }
};
