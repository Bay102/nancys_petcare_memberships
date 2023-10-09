import { supabase } from '../supabase.config';

export type UsersDogs = {
  userDataId: string;
  id: number;
  name: string;
  breed: string;
  age: number;
};

export const getUsersDogs = async (userDataId: string | undefined) => {
  console.log(userDataId);

  if (userDataId) {
    const { data, error } = await supabase
      .from('dogs')
      .select('*')
      .eq('user_data_id', userDataId);

    if (error) {
      throw new Error(`${error}`);
    }

    return data;
  }

  console.log('no userDataId');
};
