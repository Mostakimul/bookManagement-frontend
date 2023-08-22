import { useState } from 'react';
import BookCard from '../components/BookCard';
import Error from '../components/Error';
import Info from '../components/Info';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';
import { useGetAllBooksQuery } from '../redux/features/book/bookApi';
import { BookTypeId } from '../types/bookType';
import filterBooks from '../utils/filterBooks';

const AllBooks = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const {
    data: books,
    isLoading,
    isError,
  } = useGetAllBooksQuery({
    page: currentPage,
    limit: 10,
    sortBy: 'createdAt',
  });

  const totalPages = Math.ceil(books?.meta?.total / books?.meta?.limit);
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  let content = null;

  if (isLoading) {
    content = <Loader />;
  } else if (!isLoading && isError) {
    content = <Error errorMessage="Error fetching books." />;
  } else if (!isLoading && !isError && !books?.data?.length) {
    content = <Info message="No books found!" />;
  } else if (!isLoading && !isError && books?.data?.length) {
    searchTerm !== ''
      ? (content = filterBooks(books?.data, searchTerm).map((book) => (
          <BookCard key={book.title} book={book} />
        )))
      : (content = books?.data?.map((book: BookTypeId) => (
          <BookCard key={book.title} book={book} />
        )));
  }

  return (
    <div className="container mx-auto">
      <div className="my-5">
        <div>
          <h3 className="text-3xl py-8 text-center">All Books</h3>
        </div>
        <div className="flex justify-end mb-5">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Search Books</span>
            </label>
            <input
              type="text"
              onChange={(data) => setSearchTerm(data.target.value)}
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
        </div>
        <div className="grid grid-cols-5 gap-5">{content}</div>

        <div className="text-center mt-10">
          <Pagination
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default AllBooks;
