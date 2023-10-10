import { supabase } from '../supabase.config';

export const getAllDogs = async () => {
  const { data, error } = await supabase.from('dogs').select('*');

  if (error) {
    throw new Error(`${error}`);
  }

  return data;
};
