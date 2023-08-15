import { supabase } from '../supabase.config';

export type Dog = {
  user_id: string | undefined;
  name: string;
  breed: string;
  age: number ;
};

export const createDog = async ({ user_id, name, breed, age }: Dog): Promise<void> => {
  const { error } = await supabase
    .from('dogs')
    .insert({ user_id, name, breed, age })


  if (error) {
    throw new Error(`${error}`);
  }
};
