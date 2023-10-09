import { supabase } from '../supabase.config';

export const getUserData = async (userId: string | undefined) => {
  const { data, error } = await supabase
    .from('user_data')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.log(error);
    throw new Error(`${error}`);
  }

  return data[0];
};
