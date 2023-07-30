import { createContext, useContext, useState } from "react";
import { UserContextTypes } from "../../types";
import { User } from "@supabase/supabase-js";

const UserContext = createContext({} as UserContextTypes);

export const UserProvider = ({ children }: { children: JSX.Element }) => { 
   const [user, setUser] = useState<User | null>(null)
   
   console.log(user);
   
   return( 
      <UserContext.Provider value={{user, setUser}} >
         {children}
      </UserContext.Provider>
   )
}

export const useUserProvider = () => useContext(UserContext);
