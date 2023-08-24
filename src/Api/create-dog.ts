import { supabase } from '../supabase.config';

export type Dog = {
  userDataId?: string | undefined;
  name: string;
  breed: string;
  age: number;
};

export const createDog = async ({ name, breed, age , userDataId}: Dog): Promise<void> => {
  const { error } = await supabase
    .from('dogs')
    .insert({ name, breed, age, user_data_id: userDataId })


  if (error) {
    console.log(error);
        
    throw new Error(`${error}`);
  }
};
