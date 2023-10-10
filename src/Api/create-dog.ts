/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from '../supabase.config';

export type Dog = {
  userDataId?: string | undefined;
  name: any;
  breed: unknown;
  age: unknown;
};

export const createDog = async (
  name: any,
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
