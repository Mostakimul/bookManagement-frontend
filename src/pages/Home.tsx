import BookCard from '../components/BookCard';
import Error from '../components/Error';
import Header from '../components/Header';
import Info from '../components/Info';
import Loader from '../components/Loader';
import { useGetRecentBooksQuery } from '../redux/features/book/bookApi';
import { BookType } from '../types/bookType';

const Home = () => {
  const { data: books, isLoading, isError } = useGetRecentBooksQuery(undefined);

  let content = null;

  if (isLoading) {
    content = <Loader />;
  } else if (!isLoading && isError) {
    content = <Error errorMessage="Error fetching books." />;
  } else if (!isLoading && !isError && !books?.data?.length) {
    content = <Info message="No books found!" />;
  } else if (!isLoading && !isError && books?.data?.length) {
    content = books?.data?.map((book: BookType) => (
      <BookCard key={book.title} book={book} />
    ));
  }

  return (
    <div className="container mx-auto">
      <Header />
      <div className="my-5">
        <div>
          <h3 className="text-3xl py-8 text-center">Recently Added Books</h3>
        </div>
        <div className="grid grid-cols-5 gap-5">{content}</div>
      </div>
    </div>
  );
};

export default Home;
