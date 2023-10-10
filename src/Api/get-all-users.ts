import { supabase } from '../supabase.config';

export const getAllUsers = async () => {
  const { data, error } = await supabase
    // .from('user_data')
    // .select('*')
    // .eq('role', 'client');

    .from('user_data')
    .select('*')
    .eq('role', 'client').select(`
    first_name,
    last_name,
    phone,
    member_status,
    dogs (
      name,
      breed,
      age
    )
  `);

  if (error) {
    console.error(error);
    return;
  }

  return data;
};
