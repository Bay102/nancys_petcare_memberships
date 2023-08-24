import { supabase } from '../supabase.config';

export type UserData = {
  id: string;
  first_name: string;
  last_name: string;
  member_status: boolean;
  phone: string;
};

export const getUserData = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_data')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    throw new Error(`${error}`);
  }

  return data;
};
