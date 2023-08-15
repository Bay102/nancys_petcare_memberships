import { supabase } from '../supabase.config';

export type UserData = {
  user_id: string | undefined;
  firstName: string;
  lastName: string;
};

export const saveProfile = async ({
  user_id,
  firstName,
  lastName,
}: UserData): Promise<void> => {
  const { error } = await supabase
    .from('user_data')
    .insert({ user_id, first_name: firstName, last_name: lastName });

  if (error) {
    throw new Error(`${error}`);
  }
};
