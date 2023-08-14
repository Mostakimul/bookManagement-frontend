import { useAppSelector } from '../redux/hooks';

function useAuth() {
  const auth = useAppSelector((state) => state.auth);

  if (auth?.accessToken && auth?.user?.email) {
    return true;
  }

  return false;
}

export default useAuth;
