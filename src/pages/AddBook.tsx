import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { useJwt } from 'react-jwt';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAddBookMutation } from '../redux/features/book/bookApi';
import { useAppSelector } from '../redux/hooks';
import { BookType } from '../types/bookType';

const AddBook = () => {
  const [
    addBook,
    { data: responseData, isLoading, error: responseError, isError, isSuccess },
  ] = useAddBookMutation();

  const navigate = useNavigate();

  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const { decodedToken } = useJwt(accessToken!);

  // hook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookType>();
  const onSubmit = handleSubmit((data) => {
    const { title, author, genre, publicationDate } = data;

    if (accessToken) {
      addBook({
        title,
        author,
        genre,
        publicationDate: format(new Date(publicationDate), 'MM/dd/yyyy'),
        userId: decodedToken?.id,
        accessToken,
      });
    }

    if (!isLoading && !isError && isSuccess) {
      toast.success(responseData?.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      reset();
      navigate('/all-books');
    } else {
      toast.error(responseError?.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  });

  return (
    <div className="container relative min-h-screen">
      <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
        <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-200">
          Add Book
        </h1>

        <div className="justify-center mb-10 space-y-2 md:flex md:space-y-0">
          <form className="space-y-6" onSubmit={onSubmit}>
            <div className="">
              <label>Title: </label>
              <input
                {...register('title', { required: true })}
                aria-invalid={errors.title ? 'true' : 'false'}
                type="text"
                placeholder="Enter book title"
                className="input input-bordered input-md w-full max-w-xs"
              />
              {errors.title?.type === 'required' && (
                <p role="alert">Title is required</p>
              )}
            </div>

            <div className="">
              <label>Author: </label>
              <input
                {...register('author', { required: true })}
                aria-invalid={errors.author ? 'true' : 'false'}
                type="text"
                placeholder="Enter book author"
                className="input input-bordered input-md w-full max-w-xs"
              />
              {errors.author?.type === 'required' && (
                <p role="alert">Author is required</p>
              )}
            </div>

            <div className="">
              <label>Genre: </label>
              <input
                {...register('genre', { required: true })}
                aria-invalid={errors.genre ? 'true' : 'false'}
                type="text"
                placeholder="Enter book genre"
                className="input input-bordered input-md w-full max-w-xs"
              />
              {errors.genre?.type === 'required' && (
                <p role="alert">Genre is required</p>
              )}
            </div>

            <div className="">
              <label>Publication Date: </label>
              <input
                {...register('publicationDate', { required: true })}
                aria-invalid={errors.publicationDate ? 'true' : 'false'}
                type="date"
                placeholder="Enter book publication date"
                className="input input-bordered input-md w-full max-w-xs"
              />
              {errors.publicationDate?.type === 'required' && (
                <p role="alert">Publication date is required</p>
              )}
            </div>

            <div className="text-right">
              <button
                disabled={isLoading}
                className="btn btn-primary"
                type="submit"
              >
                Add Book
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddBook;
