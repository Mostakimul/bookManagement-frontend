import { ToastContainer } from 'react-toastify';
import useAuthCheck from './hooks/useAuthCheck';
import MainLayout from './layout/MainLayout';

function App() {
  const authChecked = useAuthCheck();

  return !authChecked ? (
    <div>Cheking...</div>
  ) : (
    <div>
      <MainLayout />
      <ToastContainer />
    </div>
  );
}

export default App;
