import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

const ReviewStar = ({ star }: { star: number }) => {
  const stars = [];
  const maxRating = 5;
  for (let i = 1; i <= maxRating; i++) {
    if (i <= star) {
      stars.push(<FaStar key={i} className="text-yellow-500" />);
    } else if (i - 0.5 <= star) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-gray-400" />);
    }
  }
  return <div className="flex items-center">{stars}</div>;
};

export default ReviewStar;
