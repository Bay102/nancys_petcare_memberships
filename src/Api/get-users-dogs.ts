import { supabase } from '../supabase.config';

export type UsersDogs = {
  userId: string;
  id: number;
  name: string;
  breed: string;
  age: number;
};

export const getUsersDogs = async (userId: string) => {
  const { data, error } = await supabase
    .from('dogs')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    throw new Error(`${error}`);
  }

  return data;
};
