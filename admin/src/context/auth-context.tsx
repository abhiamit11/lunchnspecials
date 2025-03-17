import { createContext } from "react";

// Define the context data type
export interface AuthContextType {
  token: string | null;
  setToken: (newToken: string | null) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
