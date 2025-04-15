"use client";

import { createContext, useContext, ReactNode } from "react";
import { useCurrentUser } from "@/hooks/queries/useCurrentUser";
import { UserContextType } from "@/types/context/userContextType";

const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: false,
  error: null,
});

export function UserProvider({ children }: { children: ReactNode }) {
  const { data: user, isLoading, error } = useCurrentUser();

  return (
    <UserContext.Provider value={{ user, isLoading, error }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
