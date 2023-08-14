const Pagination = ({
  totalPages,
  handlePageChange,
  currentPage,
}: {
  totalPages: number;
  handlePageChange: (pageNumber: number) => void;
  currentPage: number;
}) => {
  const pageNumbers: number[] = [];
  for (let index = 1; index <= totalPages; index++) {
    pageNumbers.push(index);
  }

  return (
    <div className="join">
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => handlePageChange(number)}
          className={`join-item btn ${currentPage === number && 'btn-active'} `}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
