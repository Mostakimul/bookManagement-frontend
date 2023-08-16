import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { userLoggedIn } from '../redux/features/auth/authSlice';

const useAuthCheck = () => {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    // const localAuth = localStorage.getItem('auth');
    const localAuth = Cookies.get('auth');

    if (localAuth) {
      const auth = JSON.parse(localAuth);
      if (auth?.email && auth?.accessToken) {
        dispatch(
          userLoggedIn({
            email: auth.email,
            accessToken: auth?.accessToken,
          }),
        );
      }
    }

    setAuthChecked(true);
  }, [dispatch]);

  return authChecked;
};

export default useAuthCheck;
