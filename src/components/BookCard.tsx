import BookBg from '../assets/bookBg.jpeg';
import { BookType } from '../types/bookType';

const BookCard = ({ book }: { book: BookType }) => {
  const { title, author, genre, publicationDate } = book;

  return (
    <div className="card max-w-max bg-base-100 shadow-xl image-full">
      <figure>
        <img src={BookBg} alt="Book" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{author}</p>
        <p>{genre}</p>
        <p>{publicationDate}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Details</button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
