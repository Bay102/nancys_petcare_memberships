import { supabase } from '../supabase.config';

export type Dog = {
  userDataId?: string;
  name: unknown;
  breed: unknown;
  age: unknown;
};

export const createDog = async (
  name: unknown,
  breed: unknown,
  age: unknown,
  userDataId: string | undefined
) => {
  const { error } = await supabase
    .from('dogs')
    .insert({ name, breed, age, user_data_id: userDataId });

  if (error) {
    console.log(error);

    throw new Error(`${error}`);
  }
};
