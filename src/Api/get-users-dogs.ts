import { supabase } from '../supabase.config';

export type DogData = {
  id: string;
  user_data_id: string;
  name: string;
  breed: string;
  age: number;
  dog_pic_url?: string | undefined;
};

export const getUsersDogs = async (userDataId: string | undefined) => {
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
};
