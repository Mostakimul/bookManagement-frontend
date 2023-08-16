import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import AllBooks from '../pages/AllBooks';
import BookDetails from '../pages/BookDetails';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Wishlist from '../pages/Wishlist';
import PrivateRoute from './PrivateRoute';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/all-books',
        element: <AllBooks />,
      },
      {
        path: '/book-details/:id',
        element: <BookDetails />,
      },
      {
        path: '/wishlist',
        element: (
          <PrivateRoute>
            <Wishlist />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default routes;
