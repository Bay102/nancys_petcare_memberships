import { supabase } from "../supabase.config"
import { LoginTypes } from "../types"

export const login = async ({email, password}: LoginTypes) => {

   const {data, error} = await supabase.auth.signInWithPassword({
      email: email,
      password: password
   })

   if (!data.user) {
      throw new Error(`${error?.message}`);
    }
    return data;
}