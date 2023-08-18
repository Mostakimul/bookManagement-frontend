import { useForm } from 'react-hook-form';
import { useJwt } from 'react-jwt';
import { useParams } from 'react-router-dom';
import { useAddBookReviewMutation } from '../redux/features/review/reviewApi';
import { useAppSelector } from '../redux/hooks';

type FormData = {
  star: number;
  comment: string;
};

const ReviewForm = () => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const { decodedToken } = useJwt(accessToken!);
  const { id } = useParams();

  const [addBookReview, { data, isLoading }] = useAddBookReviewMutation();

  // hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = handleSubmit((data) => {
    let { star } = data;
    star = Number(star);
    const { comment } = data;
    if (accessToken) {
      addBookReview({
        star,
        comment,
        bookId: id as string,
        userId: decodedToken?.id,
        accessToken,
      });
    }
  });

  return (
    <div className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
      <h1 className="mt-4 mb-8 text-3xl font-bold  text-gray-200">
        Submit a review
      </h1>

      <div className="mb-10 space-y-2 md:flex md:space-y-0">
        <form className="space-y-6" onSubmit={onSubmit}>
          <div className="rating">
            {[1, 2, 3, 4, 5].map((value) => (
              <input
                key={value}
                type="radio"
                value={value}
                {...register('star', { required: true })}
                aria-invalid={errors.star ? 'true' : 'false'}
                className="mask mask-star-2 bg-orange-400"
              />
            ))}
          </div>

          {/* <div className="">
            <label>Star: </label>
            <input
              {...register('star', { required: true })}
              aria-invalid={errors.star ? 'true' : 'false'}
              type="text"
              placeholder="Enter your rating"
              className="input input-bordered input-md w-full max-w-xs"
            />
            {errors.star?.type === 'required' && (
              <p role="alert">Rating is required</p>
            )}
          </div> */}

          <div className="">
            <label>Feedback: </label>
            <input
              {...register('comment', { required: true })}
              aria-invalid={errors.comment ? 'true' : 'false'}
              type="text"
              placeholder="Enter your feedback"
              className="input input-bordered input-md w-full max-w-xs"
            />
            {errors.comment?.type === 'required' && (
              <p role="alert">Feedback is required</p>
            )}
          </div>

          <div className="text-right">
            <button
              disabled={isLoading}
              className="btn btn-primary"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
