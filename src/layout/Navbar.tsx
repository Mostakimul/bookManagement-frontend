import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { userLoggedOut } from '../redux/features/auth/authSlice';
import { useAppDispatch } from '../redux/hooks';

const Navbar = () => {
  const isLoggedIn = useAuth();
  const dispatch = useAppDispatch();

  const logout = () => {
    dispatch(userLoggedOut());
    localStorage.clear();
  };
  return (
    <div className="navbar bg-blue-700">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl text-gray-100">
          Book Reader
        </a>
      </div>
      <div className="flex-none gap-2">
        <ul className="menu menu-horizontal px-1 text-gray-200">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/wishlist">My Wishlist</Link>
          </li>

          {!isLoggedIn ? (
            <>
              <li>
                <Link to="/login">Login</Link>{' '}
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          ) : (
            <li>
              <button onClick={logout} className="btn-ghost">
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
