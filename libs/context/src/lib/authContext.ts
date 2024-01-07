import { User } from 'firebase/auth';
import { createContext } from 'react';

export const AuthContext = createContext<{
  user: User | null;
  setUser: (user: User | null) => void;
}>({ user: null, setUser: () => {} });

export const AuthProvider = AuthContext.Provider;

export default AuthContext;
