import { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserProvider';
import { useNavigate } from 'react-router-dom';

export default function useIsLoggedIn(redirect = '/login') {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate(redirect);

    // eslint-disable-next-line
  }, [user]);

  return user;
}
