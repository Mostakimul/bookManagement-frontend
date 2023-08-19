import { format } from 'date-fns';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useJwt } from 'react-jwt';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  useEditBookMutation,
  useGetSingleBookQuery,
} from '../redux/features/book/bookApi';
import { useAppSelector } from '../redux/hooks';
import { BookType } from '../types/bookType';

const EditBook = () => {
  const { id } = useParams();
  const [
    editBook,
    { data: responseData, isLoading, error: responseError, isError, isSuccess },
  ] = useEditBookMutation();

  const {
    data,
    isLoading: bookLoading,
    isSuccess: bookSuccess,
    isError: bookError,
  } = useGetSingleBookQuery(id);

  const navigate = useNavigate();

  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const { decodedToken } = useJwt(accessToken!);

  // hook form
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<BookType>();

  useEffect(() => {
    if (id && !bookLoading && !bookError && bookSuccess) {
      setValue('author', data?.data?.author);
      setValue('title', data?.data?.title);
      setValue('genre', data?.data?.genre);
      // Format publication date
      const publicationDate = new Date(data?.data?.publicationDate);
      const formattedPublicationDate = publicationDate
        .toISOString()
        .split('T')[0];
      setValue('publicationDate', formattedPublicationDate);
    }
  }, [
    bookError,
    bookLoading,
    bookSuccess,
    data?.data?.author,
    data?.data?.genre,
    data?.data?.publicationDate,
    data?.data?.title,
    id,
    setValue,
  ]);

  const onSubmit = handleSubmit((data) => {
    const { title, author, genre, publicationDate } = data;

    if (accessToken && id) {
      editBook({
        id,
        title,
        author,
        genre,
        publicationDate: format(new Date(publicationDate), 'MM/dd/yyyy'),
        userId: decodedToken?.id,
        accessToken,
      });
    }

    if (!isLoading && !isError) {
      toast.success(responseData?.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast.error(responseError?.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    reset();

    navigate(`/book-details/${id}`);
  });

  return (
    <div className="container relative min-h-screen">
      <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
        <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-200">
          Edit Book
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
                Edit Book
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditBook;
