import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';
import { useLoginMutation } from '../redux/features/auth/authApi';

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const [
    login,
    { data: responseData, isLoading, error: responseError, isError, isSuccess },
  ] = useLoginMutation();

  const isLoggedIn = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (responseData?.data?.email || isLoggedIn) {
      navigate('/');
    }

    if (isError && responseError) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      toast.error((responseError as any).data?.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [isError, isLoggedIn, navigate, responseData?.data?.email, responseError]);

  useEffect(() => {
    if (isSuccess && !isError) {
      toast.success(responseData?.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [isError, isSuccess, responseData?.message]);

  // hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = handleSubmit((data) => {
    login(data);
  });

  return (
    <div className="container relative min-h-screen">
      <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
        <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-200">
          Login
        </h1>

        <div className="justify-center mb-10 space-y-2 md:flex md:space-y-0">
          <form className="space-y-6" onSubmit={onSubmit}>
            <div className="">
              <label>Email: </label>
              <input
                {...register('email', { required: true })}
                aria-invalid={errors.email ? 'true' : 'false'}
                type="text"
                placeholder="Enter your email"
                className="input input-bordered input-md w-full max-w-xs"
              />
              {errors.email?.type === 'required' && (
                <p role="alert">Email is required</p>
              )}
            </div>

            <div className="">
              <label>Password: </label>
              <input
                {...register('password', { required: true })}
                aria-invalid={errors.password ? 'true' : 'false'}
                type="password"
                placeholder="Enter your password"
                className="input input-bordered input-md w-full max-w-xs"
              />
              {errors.password?.type === 'required' && (
                <p role="alert">Password is required</p>
              )}
            </div>

            <div className="text-right">
              <button
                disabled={isLoading}
                className="btn btn-primary"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;
