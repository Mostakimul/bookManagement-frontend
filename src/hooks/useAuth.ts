import { useAppSelector } from '../redux/hooks';

function useAuth() {
  const auth = useAppSelector((state) => state.auth);

  if (auth?.user?.email && auth?.accessToken) {
    return true;
  }

  return false;
}

export default useAuth;
