import { ReviewType } from '../types/reviewType';
import ReviewStar from './ReviewStar';

const Review = ({ review }: { review: ReviewType }) => {
  return (
    <div className="border p-4 rounded shadow-md mb-4">
      <ReviewStar star={review.star} />
      <p className="text-sm mt-2">{review.comment}</p>
    </div>
  );
};

export default Review;
