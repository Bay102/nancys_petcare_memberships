import { supabase } from '../supabase.config';

export const saveProfile = async (
  user_id: string | undefined,
  firstName: string,
  lastName: string,
  phone: string,
) => {
  const { error } = await supabase
    .from('user_data')
    .insert({ user_id, first_name: firstName, last_name: lastName, phone });

  if (error) {
    console.log(error);
    throw new Error(`${error}`);


  }
};
