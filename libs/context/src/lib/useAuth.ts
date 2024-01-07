import { useContext } from 'react';

import AuthContext from './authContext';

export const useAuth = () => {
  const { setUser, user } = useContext(AuthContext);

  return { setUser, user };
};
