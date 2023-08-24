import { supabase } from '../supabase.config';

export const getAllUsers = async () => {
  const { data, error } = await supabase.from('user_data').select(`
      user_id,
      id,
      dogs (id, name, breed, age)
  `);

  //   const { data, error } = await supabase.from('teams').select(`
  //   id,
  //   team_name,
  //   users ( id, name )
  // `)

  if (error) {
    console.error(error);
    return;
  }

  console.log(data);
};
