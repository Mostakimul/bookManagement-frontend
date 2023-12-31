import { useJwt } from 'react-jwt';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Error from '../components/Error';
import Info from '../components/Info';
import Loader from '../components/Loader';
import Review from '../components/Review';
import ReviewForm from '../components/ReviewForm';
import {
  useDeleteBookMutation,
  useGetSingleBookQuery,
} from '../redux/features/book/bookApi';
import { useGetBookReviewsQuery } from '../redux/features/review/reviewApi';
import { useAppSelector } from '../redux/hooks';
import { ReviewType } from '../types/reviewType';

const BookDetails = () => {
  const { id } = useParams();

  const { data: book, isLoading, isError } = useGetSingleBookQuery(id);
  const {
    data: reviews,
    isLoading: reviewIsLoading,
    isError: reviewIsError,
  } = useGetBookReviewsQuery(id);

  const [
    deleteBook,
    {
      isError: deleteError,
      isLoading: deleteLoading,
      isSuccess: deleteSuccess,
      data,
    },
  ] = useDeleteBookMutation();

  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const { decodedToken } = useJwt(accessToken!) as {
    decodedToken: { id: string };
  };

  const navigate = useNavigate();

  const handleDelete = (id: string) => {
    const shouldDelete = window.confirm(
      'Are you sure you want to delete this item?',
    );

    if (shouldDelete) {
      deleteBook({ id, accessToken: decodedToken?.id });
      if (!deleteLoading && !deleteError && deleteSuccess) {
        toast.success(data?.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      navigate('/all-books');
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/edit-book/${id}`);
  };

  let content = null;
  let reviewContent = null;

  if (isLoading) {
    content = <Loader />;
  } else if (!isLoading && isError) {
    content = <Error errorMessage="Error fetching books." />;
  } else if (!isLoading && !isError && !book?.data) {
    content = <Info message="No book found!" />;
  } else if (!isLoading && !isError && book?.data) {
    content = (
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-center">
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Publication Date</th>
              {book?.data?.userId === decodedToken?.id && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr className="text-center">
              <td>{book?.data?.title}</td>
              <td>{book?.data?.author}</td>
              <td>{book?.data?.genre}</td>
              <td>{book?.data?.publicationDate}</td>
              {book?.data?.userId === decodedToken?.id && (
                <td className="flex gap-2 justify-center">
                  <button
                    onClick={() => handleEdit(book?.data?.id)}
                    className="btn btn-sm btn-info"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(book?.data?.id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  if (reviewIsLoading) {
    reviewContent = <Loader />;
  } else if (!reviewIsLoading && reviewIsError) {
    reviewContent = <Error errorMessage="Error fetching reviews." />;
  } else if (!reviewIsLoading && !reviewIsError && !reviews?.data?.length) {
    reviewContent = <Info message="No reviews posted!" />;
  } else if (!reviewIsLoading && !reviewIsError && reviews?.data?.length) {
    reviewContent = reviews?.data.map((review: ReviewType, index: number) => (
      <Review key={index} review={review} />
    ));
  }

  return (
    <div className="container relative min-h-screen">
      <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
        {content}

        <div className="mt-8">
          <h2 className="text-3xl font-bold">Reviews</h2>
          {reviewContent}
        </div>

        <ReviewForm />
      </main>
    </div>
  );
};

export default BookDetails;
